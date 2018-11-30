import { Server, Socket, Namespace } from "socket.io";
import { UserGrade } from ".";

export interface SocketConnectionContext {
  namespace: Namespace;
}
