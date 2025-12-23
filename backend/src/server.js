const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://zoom-clo-ne.netlify.app"," http://localhost:5173"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("client connected", socket.id);

  socket.on("join-room", (meetingId) => {
    socket.join(meetingId);
    console.log(`User joined meeting: ${meetingId}`);
    socket.to(meetingId).emit("user-joined");
  });

  socket.on("offer", ({ offer, roomId }) => {
    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", ({ answer, roomId }) => {
    socket.to(roomId).emit("answer", answer);
  });

  socket.on("ice-candidate", ({ candidate, roomId }) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
server.listen(8001, () => {
  console.log("LISTENING ON SERVER PORT 8001");
});
