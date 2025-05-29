import React from "react";
import Conversation from "./Conversation";
import { ConversationListProps } from "@/types";
import { useAuthStore } from "@/lib/store/useAuthStore";

// TODO: remove this
// const conversations = [
//     { id: "1", name: "Min Htet Thar", msg: "Yes, i got it" },
//     { id: "2", name: "Ei Ei Chaw Ou", msg: "Thank you" },
// ];

function ConversationList({ chats, onChatClick }: ConversationListProps) {
    const currentUserId = useAuthStore((state) => state.userId);
    return (
        <div className="mt-2 flex-1 overflow-y-auto">
            {chats.map((conversation) => (
                <Conversation
                    key={conversation.id}
                    conversation={conversation}
                    currentUserId={currentUserId}
                    onChatClick={onChatClick}
                />
            ))}
        </div>
    );
}

export default ConversationList;
