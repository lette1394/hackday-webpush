import { Server, Socket } from "socket.io";
import * as redis from "redis";
import {
  SocketInitialContext,
  UserGrade,
  SocketConnectionContext,
  NotificationInput
} from "./interface";

import {
  JOIN_ROOM,
  LEAVE_ROOM,
  DISCONNECT,
  EVENT_NOTIFICATION
} from "./constants";

const pub = redis.createClient({
  host: "localhost",
  port: 6379
});

const init = (context: SocketInitialContext) => {
  const { socket } = context;

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

  socket.on(EVENT_NOTIFICATION, (noti: NotificationInput) => {
    console.log("new notification - ", noti.createAt);

    namespace.in(noti.grade).emit(EVENT_NOTIFICATION, noti);
    pub.publish(EVENT_NOTIFICATION, JSON.stringify(noti));
  });
};

export const handler = {
  connectionHandler
};
