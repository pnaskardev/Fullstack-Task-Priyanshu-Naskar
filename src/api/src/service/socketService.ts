import { Server } from "socket.io";
import { logger } from "../config/observability";
import RedisService from "./cacheService";
import { TodoItem, TodoItemModel } from "../models/noteModel";

class SocketService {
  private _io: Server;

  constructor() {
    logger.info("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this.io;
    logger.info("Init Socket Listeners...");

    io.on("connect", (socket) => {
      logger.info(`New Socket Connected`, socket.id);

      socket.on("add", async (message: TodoItem) => {
        logger.info(`New Task Added`, message);
        const redisClient = RedisService.getClient;
        const defaultKey = "FULLSTACK_TASK_PRIYANSHU_NASKAR";

        if (message.task) {
          const todoItem = new TodoItemModel({
            task: message.task,
          });

          await redisClient.rPush(defaultKey, JSON.stringify(todoItem));
          logger.info(`Task added to cache`);
          // Retrieve and parse the list of items
          const cacheData = await redisClient.lRange(defaultKey, 0, -1); // Get all items in the list
          const items: TodoItem[] = cacheData
            ? cacheData.map((item) => JSON.parse(item))
            : [];
          console.log(items);

          if (items.length > 50) {
            try {
              const todoDocuments = items.map(
                (item) =>
                  new TodoItemModel({
                    _id: item.id,
                    task: item.task,
                  })
              );
              await TodoItemModel.insertMany(todoDocuments);
              logger.info(`Data saved to MongoDB`);
              await redisClient.del(defaultKey);
              logger.info(`Cache cleared`);
            } catch (error) {
              logger.error(`Error saving data to MongoDB`, error);
            }
          }
        }
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
