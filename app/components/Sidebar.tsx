"use client";
import React, { useState } from "react";
import NewChatButton from "../chats/components/NewChatButton";
import ConversationList from "../chats/components/ConversationList";
import SearchList from "../chats/components/SearchList";
import SearchBox from "../chats/components/SearchBox";

import { ExtendedChat } from "@/types";

function Sidebar({
    onNewChat,
    onDesktopFocus,
    isMobile,
    chats,
    onChatClick,
}: {
    onNewChat: () => void;
    onDesktopFocus: () => void;
    isMobile: boolean;
    chats: ExtendedChat[];
    onChatClick: (chatId: string) => void;
}) {
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState("");
    const onQueryChange = (q: string) => {
        setQuery(q);
        console.log("....", q);
    };
    const onSearchActive = () => {
        setIsSearching(true);
    };
    const onSearchCancel = () => {
        setIsSearching(false);
        setQuery("");
    };

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
                <ConversationList chats={chats} onChatClick={onChatClick} />
            )}
        </div>
    );
}

export default Sidebar;
