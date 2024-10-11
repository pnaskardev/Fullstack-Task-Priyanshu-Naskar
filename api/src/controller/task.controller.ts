import { Request, Response, NextFunction } from "express";
import RedisService from "../service/cacheService";
import { TodoItem, TodoItemModel } from "../models/noteModel";
import { logger } from "../config/observability";
import { getConfig } from "../config";
import { Server } from "socket.io";
import { RedisClientType } from "redis";

export async function fetchAllTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const redisClient = RedisService.getClient;
    const config = await getConfig();
    const defaultKey = config.defaultKey;

    const cacheData = await redisClient.lRange(defaultKey, 0, -1);
    let tasks: TodoItem[] = cacheData
      ? cacheData.map((item:string) => JSON.parse(item))
      : [];

    const dbData = await TodoItemModel.find().lean().exec();
    tasks = [...tasks, ...dbData];
    logger.info(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    logger.error(`Error fetching tasks`, error);
    next(error);
  }
}

export async function handleAddTask(message: TodoItem, io: Server) {
  logger.info("New Task Added", message);
  const redisClient = RedisService.getClient;
  const keyConfig = await getConfig();
  const defaultKey = keyConfig.defaultKey;

  if (message.task) {
    const todoItem = new TodoItemModel({ task: message.task });

    await redisClient.rPush(defaultKey, JSON.stringify(todoItem));
    logger.info("Task added to cache");

    const cacheData = await redisClient.lRange(defaultKey, 0, -1);
    const items: TodoItem[] = cacheData ? cacheData.map((item: string) => JSON.parse(item)) : [];

    if (items.length > 50) {
      await saveTasksToMongo(items, redisClient, defaultKey);
    }
  }
}

async function saveTasksToMongo(items: TodoItem[], redisClient: RedisClientType, defaultKey: string) {
  try {
    const todoDocuments = items.map(item => new TodoItemModel({ _id: item.id, task: item.task }));
    await TodoItemModel.insertMany(todoDocuments);
    logger.info("Data saved to MongoDB");
    await redisClient.del(defaultKey);
    logger.info("Cache cleared");
  } catch (error) {
    logger.error("Error saving data to MongoDB", error);
  }
}
