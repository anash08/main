const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");
const cors = require("cors");

// Configuration
const PORT = process.env.PORT || 8080;
const INDEX = path.join(__dirname, 'index.html');

// Start server
const app = express();
const server = http.createServer(app);
server.listen(PORT, () => console.log("Listening on localhost:" + PORT));

// Initialize SocketIO
const io = socketIO(server);
app.use(cors());

// Register "connection" events to the WebSocket
io.on("connection", function(socket) {
  // Register "join" events, requested by a connected client
  socket.on("join", function (room) {
    // join channel provided by client
    socket.join(room);
    // Register "image" events, sent by the client
    socket.on("image", function(msg) {
      // Broadcast the "image" event to all other clients in the room
      socket.broadcast.to(room).emit("image", msg);
    });
  });

  // Register "data" events, requested by a connected client
  socket.on("data", function (value) {
    // Process the received data
    // Perform any necessary operations on the data
    // Emit a "dataResponse" event back to the client with the response
    socket.emit("dataResponse", response);
  });
});
