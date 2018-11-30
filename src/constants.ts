export const PORT_FROM_COMMAND: number = Number(process.argv[2]);

export const SERVER_PORT: number = PORT_FROM_COMMAND || 9000;
export const REDIS_PORT: number = 6379;
export const REDIS_HOST: string = "localhost";

export const CONNECTION = "connection";
export const DISCONNECT = "disconnect";
export const JOIN_ROOM = "join room";
export const LEAVE_ROOM = "leave room";

export const NAMESPACE = "notification";

export const EVENT_NOTIFICATION = `event-${NAMESPACE}`;
