import { Socket, Namespace } from "socket.io";

export interface SocketConnectionContext {
  namespace: Namespace;
  socket: Socket;
}
