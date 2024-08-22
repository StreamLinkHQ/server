import { Server } from "socket.io";

const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["https://thestreamlink.com"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // Handle custom events
    socket.on("startAddon", (data) => {
      console.log("Received custom event:", data);
      // Emit an event back to the client
      io.emit("responseEvent", data);
    });
    socket.on("message", ({ text, sender }) => {
      console.log("Received custom event: 1", sender);
      console.log("Received custom event: 2", text);
      io.emit("message", { text, sender })
    });
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default createSocketServer;
