const { ChatModel } = require("../db/models");

module.exports = function (server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
    transports: [
      'websocket'
    ]
  });

  // 監測 client 與 server 連接
  io.on("connection", function (socket) {
    console.log("client connect server!");

    socket.on("sendMsg", function ({ from, to, content }) {
      const chat_id = [from, to].sort().join("_"); // from_to or to_from
      const create_time = Date.now();

      new ChatModel({ from, to, content, chat_id, create_time }).save(function (
        err,
        chatMsg
      ) {
        io.emit("receiveMsg", chatMsg);
      });
    });
  });
};
