import { Request, Response, NextFunction } from "express";
import RedisService from "../service/cacheService";
import { TodoItem, TodoItemModel } from "../models/noteModel";
import { logger } from "../config/observability";
import { getConfig } from "../config";

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
