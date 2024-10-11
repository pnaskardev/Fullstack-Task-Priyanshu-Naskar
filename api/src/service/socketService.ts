import { Server } from "socket.io";
import { logger } from "../config/observability";
import { TodoItem } from "../models/noteModel";
import { handleAddTask } from "../controller/task.controller";

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
      socket.on("add", (message: TodoItem) => handleAddTask(message, this._io));

    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
