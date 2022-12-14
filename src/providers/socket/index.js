import socket_io from "socket.io-client";
import { createContext } from "react";

export const socket = socket_io.connect(process.env.REACT_APP_BE_URL);
export const SocketContext = createContext({});
