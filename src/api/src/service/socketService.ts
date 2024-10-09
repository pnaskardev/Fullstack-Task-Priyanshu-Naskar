import { Server } from "socket.io";
import { logger } from "../config/observability";

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
        socket.on("event:message", async ({ message }: { message: string }) => {
          logger.info("New Note Rec.", message);
          // publish this message to redis
        //   await pub.publish("MESSAGES", JSON.stringify({ message }));
        });
      });
    }
  
    get io() {
      return this._io;
    }
  }
  
  export default SocketService;