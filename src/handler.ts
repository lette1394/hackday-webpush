import { Server, Socket } from "socket.io";
import * as redis from "redis";
import {
  SocketInitialContext,
  UserGrade,
  SocketConnectionContext,
  Notification,
  NotificationInput
} from "./interface";

const DISCONNECT = "disconnect";
const JOIN_ROOM = "join room";
const LEAVE_ROOM = "leave room";
const NOTIFICATION = "notification";

const pub = redis.createClient({
  host: "localhost",
  port: 6379
});

const init = (context: SocketInitialContext) => {
  const { namespace, socket } = context;

  socket.on(JOIN_ROOM, (grade: UserGrade) => {
    socket.join(grade);
    console.log("user joined", grade);
  });

  socket.on(LEAVE_ROOM, (grade: UserGrade) => {
    socket.leave(grade);
    console.log("user leaved", grade);
  });

  socket.on(DISCONNECT, () => {
    console.log("Client disconnected");
  });
};

const connectionHandler = ({ namespace }: SocketConnectionContext) => (
  socket: Socket
): void => {
  init({
    namespace,
    socket
  });

  socket.on(NOTIFICATION, (noti: NotificationInput) => {
    console.log("on noti", noti.createAt);

    namespace.in(noti.grade).emit(NOTIFICATION, noti);
    pub.publish(NOTIFICATION, JSON.stringify(noti));
  });
};

export const handler = {
  connectionHandler
};
