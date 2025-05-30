"use client";
import React, { useState } from "react";
import NewChatButton from "../chats/components/NewChatButton";
import SearchList from "../chats/components/SearchList";
import SearchBox from "../chats/components/SearchBox";

import { ChatWithLatestMessage, ExtendedChat } from "@/types";
import Conversation from "../chats/components/Conversation";
import { useAuthStore } from "@/lib/store/useAuthStore";

function Sidebar({
    onNewChat,
    onDesktopFocus,
    isMobile,
    chatsWithLatestMessage,
    onChatClick,
}: {
    onNewChat: () => void;
    onDesktopFocus: () => void;
    isMobile: boolean;
    chatsWithLatestMessage: ChatWithLatestMessage[];
    onChatClick: (chatId: string) => void;
}) {
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState("");

    const onQueryChange = (q: string) => {
        setQuery(q);
    };
    const onSearchActive = () => {
        setIsSearching(true);
    };
    const onSearchCancel = () => {
        setIsSearching(false);
        setQuery("");
    };

    const currentUserId = useAuthStore((state) => state.userId);

    return (
        <div className={`h-full flex flex-col border-r border-gray-200 dark:border-gray-600`}>
            <NewChatButton
                onNewChat={onNewChat}
                onDesktopFocus={onDesktopFocus}
                isMobile={isMobile}
            />
            <SearchBox
                onActive={onSearchActive}
                onCancel={onSearchCancel}
                onQueryChange={onQueryChange}
            />
            {isSearching ? (
                <SearchList query={query} />
            ) : (
                <div className="mt-2 flex-1 overflow-y-auto">
                    {chatsWithLatestMessage.map((conversation) => (
                        <Conversation
                            key={conversation.id}
                            conversation={conversation}
                            currentUserId={currentUserId}
                            onChatClick={onChatClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Sidebar;
