import socketIOClient from "socket.io-client";

// NOTE: Due to a health issue wasn't able to port this through ENV variables 
// but this should be failrly easy task

const PORT = 3000;
const socket = socketIOClient(`http://localhost:${PORT}`);
export default socket;
