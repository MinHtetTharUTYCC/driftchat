"use client";
import { ExtendedChat } from "@/types";
import { MoreHorizontal, User } from "lucide-react";
import React, { useState } from "react";

type ConversationProps = {
    conversation: ExtendedChat;
    currentUserId?: string | null;
    onChatClick: (chatId: string) => void;
};

function Conversation({ conversation, currentUserId, onChatClick }: ConversationProps) {
    const [isChildHovered, setIsChildHovered] = useState(false);

    const otherParticipantUser = conversation.participants.find(
        (p) => p.userId !== currentUserId
    )?.user;

    return (
        <div
            className={`group/parent flex items-center gap-2 p-2 rounded-l-lg cursor-pointer ${
                isChildHovered ? "bg-transparent" : "hover:bg-gray-200 dark:hover:bg-zinc-700"
            }`}
            onClick={() => onChatClick(conversation.id)}
        >
            <div className="flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-600">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </div>

            {conversation.messages.length > 0 ? (
                <div className="flex-1 overflow-hidden">
                    <p className="font-semibold">{otherParticipantUser?.name || "Unknown User"}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {conversation.messages &&
                            conversation.messages.length > 0 &&
                            conversation.messages[0].content}
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
