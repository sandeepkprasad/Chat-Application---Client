import { io } from "socket.io-client";
import { baseUrl } from "./utils/otherUtils";

const SOCKET_URL = `${baseUrl}`;

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
