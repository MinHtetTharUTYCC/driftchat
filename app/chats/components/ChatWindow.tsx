import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { ExtendedChat } from "@/types";
import { useAuthStore } from "@/lib/store/useAuthStore";
import EachMessage from "./EachMessage";
import { Message } from "@prisma/client";
import { getSocket, initSocket } from "@/lib/socket-io/socket";

interface ChatWindowProps {
    onBackToSidebar: () => void;
    isMobile: boolean;
    currentChat?: ExtendedChat | null;
}

function ChatWindow({ onBackToSidebar, isMobile, currentChat }: ChatWindowProps) {
    const currentUserId = useAuthStore((state) => state.userId);
    const otherParticipantUser = currentChat?.participants.find(
        (p) => p.userId !== currentUserId
    )?.user;

    const [messages, setMessages] = useState<Message[]>(currentChat?.messages || []);

    useEffect(() => {
        const socket = initSocket();

        socket.emit("join-room", currentChat?.id);

        socket.on("receive-message", (newMessage: Message) => {
            if (newMessage.chatId === currentChat?.id) {
                setMessages((prev) => [...prev, newMessage]);
            }
        });

        return () => {
            socket.emit("leave-room", currentChat?.id);
            socket.off("receive-message");
        };
    }, [currentChat?.id]);

    useEffect(() => {
        if (currentChat?.messages) {
            setMessages(currentChat.messages);
        }
    }, [currentChat?.messages]);

    const onMsgSend = async (msg: string) => {
        if (!currentChat || !currentUserId) return;

        try {
            const res = await fetch(`/api/chats/${currentChat.id}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: msg }),
            });

            if (!res.ok) throw new Error("Failed to send message!");

            const data = await res.json();

            setMessages((prev) => [...prev, data.newMessage]);

            // emit to socket server
            const socket = getSocket();
            socket.emit("send-message", data.newMessage);
        } catch (error) {
            console.error("Error sending message: ", error);
            // TODO: maybe show a toast
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="rounded-lg overflow-hidden h-full flex flex-col md:m-3">
                <ChatHeader
                    onBackToSidebar={onBackToSidebar}
                    isMobile={isMobile}
                    participantName={otherParticipantUser?.name}
                    participantUserId={otherParticipantUser?.id}
                />

                {/* <MessageList /> */}
                <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4">
                    {messages.map((message) => (
                        <EachMessage
                            key={message.id}
                            message={message}
                            currentUserId={currentUserId}
                        />
                    ))}
                </div>
                <MessageInput onMsgSend={onMsgSend} />
            </div>
        </div>
    );
}

export default ChatWindow;
