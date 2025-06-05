import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = (userId: string) => {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
            transports: ["websocket"],
            auth: {
                userId,
            },
        });
    }

    return socket;
};

export const getSocket = () => {
    if (!socket) {
        throw new Error("Socket not initialized");
    }
    return socket;
};
