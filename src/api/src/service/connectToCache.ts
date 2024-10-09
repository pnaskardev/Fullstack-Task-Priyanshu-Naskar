import { createClient } from "redis";

import { logger } from "../config/observability";
import { RedisConfig } from "../config/appConfig";

let redisClient: ReturnType<typeof createClient>;

export const configureRedis = async (config: RedisConfig) => {
  //if the client already exists return the existing client
  if (redisClient) {
    return redisClient;
  }

  try {
    const redisClient = createClient({
      url: `redis://${config.username}:${config.password}@${config.connectionString}:${config.connectionPort}`,
    });
    redisClient.on("connecting", () => logger.info("Redis connecting..."));
    redisClient.on("ready", () => logger.info("Redis connected successfully!"));
    redisClient.on("close", () => logger.info("Redis disconnecting..."));
    redisClient.on("end", () =>
      logger.info("Redis disconnected successfully!")
    );
    redisClient.on("error", (err: Error) =>
      logger.error("Redis database error:", err)
    );

    await redisClient.connect();

    const defaultKey = "FULLSTACK_TASK_PRIYANSHU_NASKAR";
    const keyExists = await redisClient.exists(defaultKey);
    if (!keyExists) {
      await redisClient.set(defaultKey, JSON.stringify([]));
      logger.info(`Redis key ${defaultKey} set with empty array`);
    }
  } catch (err) {
    logger.error('Redis database error: ${err}');
    throw err;
  }
  return redisClient;
};