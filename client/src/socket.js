import socketIO from "socket.io-client";

const socket = new socketIO({ reconnection: true, withCredentials: true });

export default socket;