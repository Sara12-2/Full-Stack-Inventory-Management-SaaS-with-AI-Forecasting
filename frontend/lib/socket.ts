// Stub — wire up real Socket.io client once backend Socket.IO server exists.
// import { io, Socket } from "socket.io-client";
//
// let socket: Socket | null = null;
//
// export function getSocket(): Socket {
//   if (!socket) {
//     socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000");
//   }
//   return socket;
// }

export function getSocket() {
  return null;
}
