import * as express from "express";
import * as http from "http";
import * as io from "socket.io";
import * as redisAdapter from "socket.io-redis";
import { Server, Socket } from "socket.io";

const SERVER_PORT: number = 9000;
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

ioServer.on(
  "connection",
  (socket: Socket): void => {
    socket.on("message", (msg) => {
      socket.emit("reply", msg + "from server");
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  }
);

server.listen(
  SERVER_PORT,
  (): void => {
    console.log("Server listening at port %d", SERVER_PORT);
  }
);