import React from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { ExtendedChat } from "@/types";
import { useAuthStore } from "@/lib/store/useAuthStore";
import EachMessage from "./EachMessage";

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

    const onMsgSend = (msg: string) => {
        if (!currentChat) return;
        const payload = {
            chatId: currentChat.id,
            senderId: currentUserId,
            content: msg,
        };

        try {
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
                    {currentChat?.messages.map((message) => (
                        <EachMessage message={message} currentUserId={currentUserId} />
                    ))}
                </div>
                <MessageInput onMsgSend={onMsgSend} />
            </div>
        </div>
    );
}

export default ChatWindow;
