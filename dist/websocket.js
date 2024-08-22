"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const createSocketServer = (server) => {
    const io = new socket_io_1.Server(server, {
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
        socket.on("message", (data) => {
            io.emit("message", data);
        });
        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};
exports.default = createSocketServer;
//# sourceMappingURL=websocket.js.map