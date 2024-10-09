import { logger } from "./config/observability";
import { createApp } from "./app";
import SocketService from "./service/socketService";
import { createServer } from "http";

const main = async () => {
  const port = process.env.PORT || 3100;
  
  const socketService = new SocketService();
  const app = await createApp();
  const server = createServer(app);
  socketService.io.attach(server);
  server.listen(port, () => {
    logger.info(`Started listening on port ${port}`);
  });
};

main();
