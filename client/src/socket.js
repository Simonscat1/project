import socketIO from "socket.io-client";

const socket = new socketIO({   reconnection: false, withCredentials: true });

export default socket;