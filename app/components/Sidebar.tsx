"use client";
import React, { useState } from "react";
import NewChatButton from "../chats/components/NewChatButton";
import SearchList from "../chats/components/SearchList";
import SearchBox from "../chats/components/SearchBox";

import { ChatWithLatestMessage, ExtendedChat } from "@/types";
import Conversation from "../chats/components/Conversation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Skeleton } from "@/components/ui/skeleton";

function Sidebar({
    onNewChat,
    onDesktopFocus,
    isMobile,
    chatsWithLatestMessage,
    onChatClick,
    currentChatId,
    isLoading,
    onShowChat,
}: {
    onNewChat: () => void;
    onDesktopFocus: () => void;
    isMobile: boolean;
    chatsWithLatestMessage: ChatWithLatestMessage[];
    onChatClick: (chatId: string) => void;
    currentChatId?: string | null;
    isLoading: boolean;
    onShowChat: () => void;
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
        <div
            className={`h-full flex flex-col border-r border-gray-200 dark:border-gray-600 bg-light-background dark:bg-dark-background pl-2`}
        >
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
                <SearchList query={query} onShowChat={onShowChat} />
            ) : (
                <div className="mt-2 flex-1 overflow-y-auto">
                    {isLoading ? (
                        <div className="w-full flex flex-col gap-2">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="h-14 bg-gray-200 dark:bg-gray-700 rounded-lg"
                                />
                            ))}
                        </div>
                    ) : (
                        chatsWithLatestMessage.map((conversation) => (
                            <Conversation
                                key={conversation.id}
                                conversation={conversation}
                                currentUserId={currentUserId}
                                onChatClick={onChatClick}
                                isActive={
                                    !isMobile && currentChatId
                                        ? currentChatId === conversation.id
                                        : false
                                }
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Sidebar;
