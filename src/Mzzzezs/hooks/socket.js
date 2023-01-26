import io from "socket.io-client";
const connection_url = 'http://localhost:3030'; 

export const socket = io(connection_url);