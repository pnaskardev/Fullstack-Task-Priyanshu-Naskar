import { createClient, RedisClientType } from "redis";
import { logger } from "../config/observability";
import { RedisConfig } from "../config/appConfig";
import { getConfig } from "../config";

class RedisService {
  private static _instance: RedisService;
  private static client: RedisClientType; // Make client static

  constructor() {
    if (RedisService._instance) {
      return RedisService._instance;
    }
    RedisService._instance = this;
  }

  public static async connect(config: RedisConfig) {
    if (this.client) {
      logger.info("Redis client already exists. Returning existing client...");
      return this.client;
    }
    logger.info("Creating new Redis client...");
    try {
      this.client = createClient({
        url: `redis://${config.username}:${config.password}@${config.connectionString}:${config.connectionPort}`,
      });
      this.client.on("connecting", () => logger.info("Redis connecting..."));
      this.client.on("ready", () => logger.info("Redis ready!"));
      this.client.on("close", () => logger.info("Redis disconnecting..."));
      this.client.on("end", () =>
        logger.info("Redis disconnected successfully!")
      );
      this.client.on("error", (err: Error) =>
        logger.error("Redis database error:", err)
      );

      await this.client.connect();

      const key_config = await getConfig();
      const defaultKey = key_config.defaultKey;
      const keyExists = await this.client.exists(defaultKey);
    //   if (keyExists) {
    //     await this.client.del(defaultKey);
    //   }
    } catch (err) {
      logger.error(`Redis database error: ${err}`);
      throw err;
    }
    return this.client;
  }

  static get getClient() {
    return this.client;
  }

  static get getInstance() {
    return this._instance;
  }
}

export default RedisService;
