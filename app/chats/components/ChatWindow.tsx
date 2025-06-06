import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { ExtendedChat } from "@/types";
import { useAuthStore } from "@/lib/store/useAuthStore";
import EachMessage from "./EachMessage";
import { Message } from "@prisma/client";
import { getSocket } from "@/lib/socket-io/socket";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatWindowProps {
    onBackToSidebar: () => void;
    isMobile: boolean;
    currentChat?: ExtendedChat | null;
    messages: Message[];
    isLoading: boolean;
    onToggleChatInfo: () => void;
}

function ChatWindow({
    onBackToSidebar,
    isMobile,
    currentChat,
    messages,
    isLoading,
    onToggleChatInfo,
}: ChatWindowProps) {
    const currentUserId = useAuthStore((state) => state.userId);
    const otherParticipantUser = currentChat?.participants.find(
        (p) => p.userId !== currentUserId
    )?.user;

    const [justOpenedChat, setJustOpenedChat] = useState(false);
    const prevChatIdRef = useRef<string | null>(null);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (currentChat?.id !== prevChatIdRef.current) {
            setJustOpenedChat(true);
            prevChatIdRef.current = currentChat?.id ?? null;
        }
    }, [currentChat?.id]);

    // Auto scroll when messages change
    useEffect(() => {
        if (messages.length === 0) return;
        if (justOpenedChat) {
            // instant scorll for chat opening
            bottomRef.current?.scrollIntoView({ behavior: "instant" });
            setJustOpenedChat(false);
        } else {
            // smoother scroll for new messages
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, justOpenedChat]);

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

            // Emit to socket server - parent will handle the response
            const socket = getSocket();
            socket.emit("send-message", data.newMessage);
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="rounded-lg overflow-hidden h-full flex flex-col md:m-3 bg-light-background dark:bg-dark-background">
                <ChatHeader
                    onBackToSidebar={onBackToSidebar}
                    onToggleChatInfo={onToggleChatInfo}
                    isMobile={isMobile}
                    participantUserId={otherParticipantUser?.id}
                    participantName={otherParticipantUser?.name}
                    participantUserImage={otherParticipantUser?.image}
                    isOnline={otherParticipantUser?.isOnline ?? false}
                    lastSeen={otherParticipantUser?.lastSeen}
                />

                <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4">
                    {isLoading ? (
                        <div className="w-full flex flex-col gap-4">
                            {[...Array(10)].map((_, i) => {
                                // 0,1  4,5  8,9
                                const isLeft = Math.floor(i / 2) % 2 === 0;
                                const widths = [
                                    "w-[45%]",
                                    "w-[60%]",
                                    "w-[35%]",
                                    "w-[55%]",
                                    "w-[40%]",
                                    "w-[65%]",
                                    "w-[50%]",
                                    "w-[42%]",
                                    "w-[45%]",
                                    "w-[60%]",
                                ];

                                return (
                                    <div
                                        key={i}
                                        className={`flex ${
                                            isLeft ? "justify-start" : "justify-end"
                                        }`}
                                    >
                                        <Skeleton
                                            className={`h-10  bg-gray-200 dark:bg-gray-700 rounded-full ${
                                                widths[i % widths.length]
                                            } `}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        messages.map((message) => (
                            <EachMessage
                                key={message.id}
                                message={message}
                                currentUserId={currentUserId}
                                participantUserId={otherParticipantUser?.id}
                                participantUserImage={otherParticipantUser?.image}
                            />
                        ))
                    )}

                    <div ref={bottomRef} />
                </div>
                <MessageInput onMsgSend={onMsgSend} />
            </div>
        </div>
    );
}

export default ChatWindow;
