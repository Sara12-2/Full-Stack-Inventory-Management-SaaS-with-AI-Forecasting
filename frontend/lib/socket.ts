import { io, Socket } from "socket.io-client";
import { getToken } from "@/lib/auth";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
      autoConnect: false,
      auth: (cb) => cb({ token: getToken() }),
    });
  }
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
