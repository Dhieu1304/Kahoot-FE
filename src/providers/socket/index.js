import socket_io from "socket.io-client";
import { createContext } from "react";
import { getItem, LOCAL_STORAGE } from "../../utils/localStorage";

const token = getItem(LOCAL_STORAGE.ACCESS_TOKEN);

export const socket = socket_io.connect(process.env.REACT_APP_BE_URL, { query: { token } });

export const SocketContext = createContext({});
