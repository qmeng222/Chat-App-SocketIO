// server side:
// matching "main": "index.js" in `package.json`
const http = require("http");
const express = require("express");

// create an instance of the Express application:
const app = express();

// create an HTTP server that listens for requests on the "app":
const expressServer = http.createServer(app);

// import the Server class from socket.io module:
const { Server } = require("socket.io");
// create a new instance of the Server class (on backend), and initialize it with the expressServer instance:
const io = new Server(expressServer);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, () => {
  console.log("Server started on port 3000.");
});
