import * as express from "express";
import * as http from "http";
import * as io from "socket.io";
import * as redisAdapter from "socket.io-redis";
import { Server } from "socket.io";
import { handler } from "./handler";
import {
  NAMESPACE,
  CONNECTION,
  REDIS_HOST,
  REDIS_PORT,
  SERVER_PORT
} from "./constants";

const app: express.Express = express();
const server: http.Server = http.createServer(app);
const ioServer: Server = io(server);
ioServer.adapter(redisAdapter({ host: REDIS_HOST, port: REDIS_PORT }));

const notiServer = ioServer.of(`/${NAMESPACE}`);
notiServer.on(
  CONNECTION,
  handler.connectionHandler({
    namespace: notiServer
  })
);

server.listen(
  SERVER_PORT,
  (): void => {
    console.log("Server listening at port %d", SERVER_PORT);
  }
);
