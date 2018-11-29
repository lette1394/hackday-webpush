import * as express from "express";
import * as http from "http";
import * as io from "socket.io";
import * as redisAdapter from "socket.io-redis";
import { Server, Socket } from "socket.io";
import { handler } from "./handler";
import { UserGrade } from "./interface";

const PORT_FROM_COMMAND: number = Number(process.argv[2]);

const SERVER_PORT: number = PORT_FROM_COMMAND || 9000;
const REDIS_PORT: number = 6379;
const REDIS_HOST: string = "localhost";

const app: express.Express = express();
const server: http.Server = http.createServer(app);
const ioServer: Server = io(server);
ioServer.adapter(redisAdapter({ host: REDIS_HOST, port: REDIS_PORT }));

app.get("/login", (req, res) => {
  console.log("login");
  res.send("");
});

const CONNECTION = "connection";
const NAMESPACE_NOTIFICATION = "notification";

const notiServer = ioServer.of(`/${NAMESPACE_NOTIFICATION}`);
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
