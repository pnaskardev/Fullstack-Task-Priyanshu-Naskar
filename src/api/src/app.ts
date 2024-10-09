import express, { Express, Request, Response } from "express";
import { configureMongoose } from "./service/connectToDb";
import cors from "cors";
import { getConfig } from "./config";
import { configureRedis } from "./service/connectToCache";

// Use API_ALLOW_ORIGINS env var with comma separated urls like
// `http://localhost:300, http://otherurl:100`
// Requests coming to the api server from other urls will be rejected as per
// CORS.
const allowOrigins = process.env.API_ALLOW_ORIGINS;

// Use NODE_ENV to change webConfiguration based on this value.
// For example, setting NODE_ENV=development disables CORS checking,
// allowing all origins.
const environment = process.env.NODE_ENV;

const originList = (): string[] | string => {
  if (environment && environment === "development") {
    console.log(`Allowing requests from any origins. NODE_ENV=${environment}`);
    return "*";
  }

  const origins = ["https://portal.azure.com", "https://ms.portal.azure.com"];

  if (allowOrigins && allowOrigins !== "") {
    allowOrigins.split(",").forEach((origin) => {
      origins.push(origin);
    });
  }

  return origins;
};

export const createApp = async (): Promise<Express> => {
  const config = await getConfig();

  // const config = await getConfig();
  const app = express();

  //   Configuration
  // await configureMongoose(config.database);
  await configureRedis(config.cache);
  // Middleware
  app.use(express.json());

  app.use(
    cors({
      origin: originList(),
    })
  );

  // API Routes
  app.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ message: "Test route working!" });
  });

  // Swagger UI
  // const swaggerDocument = yaml.load("./openapi.yaml");
  // app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  return app;
};
