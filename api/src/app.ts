import express, { Express, Response } from "express";
import cors from "cors";
import { fetchAllTasks } from "./controller/task.controller";
import { logger } from "./config/observability";

// Allow all origins
const allowAllOrigins = "*";

export const createApp = async (): Promise<Express> => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.options("*", cors()); // Handle all OPTIONS requests globally

  app.use(
    cors({
      origin: "*", // Allow all origins
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
  );

  // API Routes
  app.get("/", (_, res: Response) => {
    logger.info("Health check passed");
    console.log("Health check passed");
    res.sendStatus(200);
  });
  app.get("/fetchAllTasks", fetchAllTasks);

  // Swagger UI (commented out for now)
  // const swaggerDocument = yaml.load("./openapi.yaml");
  // app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  return app;
};
