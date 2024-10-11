import socketIOClient from "socket.io-client";


const PORT = 3000;
const baseURL = import.meta.env.VITE_BASE_URL;
console.log("BASE URL", baseURL);
console.log("PORT", PORT);
// const socket = socketIOClient(`http://13.233.128.81:3100`);
const socket = socketIOClient(baseURL);
export default socket;
