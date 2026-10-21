import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("User Connected!");
  console.log("ID: ", socket.id);
  // socket.emit("welcome", `Welcome to the server"${socket.id}`);
  // socket.broadcast("welcome", `${socket.id} joined the server`);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.io);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
