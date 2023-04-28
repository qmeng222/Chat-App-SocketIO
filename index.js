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

// listen for and handle connection events on the Socket.IO server (a server-side library):
io.on("connection", (socket) => {
  console.log("New user connected.");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, () => {
  console.log("Server started on port 3000.");
});
