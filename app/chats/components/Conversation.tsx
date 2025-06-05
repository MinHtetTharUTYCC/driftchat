"use client";
import { ChatWithLatestMessage } from "@/types";
import { MoreHorizontal, User } from "lucide-react";
import React, { useState } from "react";

type ConversationProps = {
    conversation: ChatWithLatestMessage;
    currentUserId?: string | null;
    onChatClick: (chatId: string) => void;
    isChatActive: boolean;
    isOnline: boolean;
};

function Conversation({
    conversation,
    currentUserId,
    onChatClick,
    isChatActive,
    isOnline,
}: ConversationProps) {
    const [isChildHovered, setIsChildHovered] = useState(false);

    const otherParticipantUser = conversation.participants.find(
        (p) => p.userId !== currentUserId
    )?.user;

    return (
        <div
            className={`group/parent flex items-center gap-2 p-2 rounded-l-lg cursor-pointer ${
                isChatActive && "bg-slate-100 dark:bg-slate-700"
            }  ${isChildHovered ? "bg-transparent" : "hover:bg-gray-200 dark:hover:bg-zinc-700"}`}
            onClick={() => onChatClick(conversation.id)}
        >
            <div className="relative flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-600">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {isOnline && (
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-zinc-800" />
                )}
            </div>

            {conversation.messages.length > 0 ? (
                <div className="flex-1 overflow-hidden">
                    <p className="font-semibold">{otherParticipantUser?.name || "Unknown User"}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {currentUserId === conversation.latestMessage?.senderId && "You: "}
                        {conversation.latestMessage && conversation.latestMessage.content}
                    </p>
                </div>
            ) : (
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-semibold line-clamp-1">
                        Message to {otherParticipantUser?.name}
                    </p>
                </div>
            )}

            <div
                className="invisible group-hover/parent:visible p-2 rounded-full mr-2 shadow-sm
                  bg-gray-50 hover:bg-gray-200 dark:bg-zinc-500 dark:hover:bg-zinc-700"
                onMouseEnter={() => setIsChildHovered(true)}
                onMouseLeave={() => setIsChildHovered(false)}
            >
                <MoreHorizontal className="h-6 w-6" />
            </div>
        </div>
    );
}

export default Conversation;
