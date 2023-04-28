// server side:
// matching "main": "index.js" in `package.json`

const express = require("express");
// create an instance of the Express application:
const app = express();

const http = require("http");
// create an HTTP server that listens for requests on the "app":
const expressServer = http.createServer(app);

// import the Server class from socket.io module:
const { Server } = require("socket.io");
// create a new instance of the Server class (on backend), and initialize it with the expressServer instance:
const io = new Server(expressServer);

// // listen for and handle events on the Socket.IO server (a server-side library):
// io.on("connection", (socket) => {
//   // console.log("New user connected.");
//   socket.on("chat", (msg) => {
//     // console.log(msg);
//     io.emit("chat_send", msg);
//   });
// });

io.on("connection", (socket) => {
  socket.join("kitchen");
  let kitchenSize = io.sockets.adapter.rooms.get("kitchen").size;
  io.sockets
    .in("kitchen")
    .emit("cooking", "I am cooking. Headcount = " + kitchenSize);
  io.sockets.in("kitchen").emit("boiling", "I am boiling water.");

  socket.join("bedroom");
  io.sockets.in("bedroom").emit("sleeping", "I am sleeping.");
  io.sockets.in("bedroom").emit("napping", "I am napping.");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, () => {
  console.log("Server started on port 3000.");
});
