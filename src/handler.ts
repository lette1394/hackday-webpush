import { Socket } from "socket.io";
import * as redis from "redis";
import {
  UserGrade,
  SocketConnectionContext,
  NotificationInput
} from "./interface";
import {
  JOIN_ROOM,
  LEAVE_ROOM,
  DISCONNECT,
  EVENT_NOTIFICATION,
  REDIS_HOST,
  REDIS_PORT
} from "./constants";

const pub = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT
});

const connectionHandler = ({ namespace }: SocketConnectionContext) => (
  socket: Socket
): void => {
  addGradeNotificationHandler({ namespace, socket });
  addNewNotificationHandler({ namespace, socket });
};

const addGradeNotificationHandler = ({ socket }: SocketConnectionContext) => {
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

const addNewNotificationHandler = ({
  namespace,
  socket
}: SocketConnectionContext) => {
  socket.on(EVENT_NOTIFICATION, (noti: NotificationInput) => {
    console.log("new notification - ", noti.createAt);

    namespace.in(noti.grade).emit(EVENT_NOTIFICATION, noti);
    pub.publish(EVENT_NOTIFICATION, JSON.stringify(noti));
  });
};

export const handler = {
  connectionHandler
};
