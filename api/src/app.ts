import express, { Express, Response } from "express";
import cors from "cors";
import { fetchAllTasks } from "./controller/task.controller";

// Allow all origins
const allowAllOrigins = "*";

export const createApp = async (): Promise<Express> => {
  const app = express();

  // Middleware
  app.use(express.json());

  app.use(
    cors({
      origin: allowAllOrigins, // Allow requests from any origin
    })
  );

  // API Routes
  app.get("/fetchAllTasks", fetchAllTasks);
  app.get("/healthcheck", (_, res: Response) => {
    res.sendStatus(200);
  });

  // Swagger UI (commented out for now)
  // const swaggerDocument = yaml.load("./openapi.yaml");
  // app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  return app;
};
