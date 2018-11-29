import { Server, Socket } from "socket.io";
import { NotificationTarget } from ".";

export interface SocketInitialContext {
  ioServer: Server;
  socket: Socket;
  target: NotificationTarget;
}
