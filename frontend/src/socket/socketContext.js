import React from "react";
import socketIOClient from "socket.io-client";
const SERVER_URL = "http://localhost:3999";

export const socket = socketIOClient(SERVER_URL, {
  transports: ["websocket"],
  forceNew: true,
});

// socket context
export const SocketContext = React.createContext();
