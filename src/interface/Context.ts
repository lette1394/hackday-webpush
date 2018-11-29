import { Server, Socket } from "socket.io";
import { UserGrade } from ".";

export interface SocketConnectionContext {
  ioServer: Server;
}

export interface SocketInitialContext extends SocketConnectionContext {
  socket: Socket;
}
