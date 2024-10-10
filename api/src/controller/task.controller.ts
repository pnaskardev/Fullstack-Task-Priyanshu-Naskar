import { Request, Response, NextFunction } from "express";
import RedisService from "../service/cacheService";
import { TodoItem } from "../models/noteModel";
import { logger } from "../config/observability";

export async function fetchAllTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const redisClient = RedisService.getClient;
    const defaultKey = "FULLSTACK_TASK_PRIYANSHU_NASKAR";

    const cacheData = await redisClient.lRange(defaultKey, 0, -1);
    console.log(cacheData);
    let tasks: TodoItem[] = cacheData
      ? cacheData.map((item) => JSON.parse(item))
      : [];

    // const dbData = await TodoItemModel.find().lean().exec();

    // tasks = [...tasks, ...dbData];
    tasks = [...tasks];

    res.status(200).send(tasks);
  } catch (error) {
    logger.error(`Error fetching tasks`, error);
    next(error);
  }
}
