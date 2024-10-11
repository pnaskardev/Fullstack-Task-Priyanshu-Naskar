import socketIOClient from "socket.io-client";

// NOTE: Due to a health issue wasn't able to port this through ENV variables 
// but this should be failrly easy task

const PORT = 3000;
const socket = socketIOClient(`http://65.0.199.40:${PORT}`);
// const socket = socketIOClient(`${baseURL}`);
export default socket;
