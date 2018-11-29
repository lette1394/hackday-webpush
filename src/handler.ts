import { Server, Socket } from "socket.io";
import { NotificationTarget, SocketInitialContext } from "./interface";

const init = (context: SocketInitialContext) => {
  const { ioServer, target, socket } = context;

  socket.join(target);

  socket.
};

const connectionHandler = (notiServer: Server) => (socket: Socket): void => {
  socket.join(NotificationTarget.BRONZE);

  socket.on("NOTIFICATION", (notification) => {
    console.log("noti", notification);
    notiServer.emit("NOTIFICATION", notification);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};

export const handler = {
  connectionHandler
};

// 우선. 디비 처리는 생각하지 말고. 걍 소켓서버에서 바로 로그인/아웃 제공.
// 로그인을 했을 때의 정보를 가지고 회원 등급에 따라 room에 들어감.
// 회원 등급이 달라질 때 마다 room에서 나오기도하고 다른곳에 들어가기도 함.
// 로그아웃이나 연결이 끊어졌을 때도 room에서 나와야함. namespace는 notification
// 로그인 했을 때 기존의 안 읽은 알람들이 주르륵 나와야함. 그냥 리스트로 보여주자.

// 노티를 생성했을 때 서버에서 받음. 그리고 등급에 따라 해당하는 room에 가서 emit 호출.
// 이거할때는 맵 쓰면 될듯.
// 과 동시에 db worker에 해당 아이디에 노티 저장.하는 event 발생시키기 (redis)

// 등급별로 호출하는 버튼 코드를 만들어서 테스트를 용이하게 하자.

// 디비 api 조회는 서버에서 할건지? db worker가 하게 하면 안되나?
// 그것도 redis를 이용해서. 말이지...안되나? -> 안될 것 같다.
