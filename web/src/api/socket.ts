import socketIOClient from "socket.io-client";
const PORT = 3100;
const socket = socketIOClient(`http://localhost:${PORT}`);
export default socket;
