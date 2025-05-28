"use client";
import React, { useEffect, useState } from "react";
import NewChatButton from "../chats/components/NewChatButton";
import ConversationList from "../chats/components/ConversationList";
import SearchList from "../chats/components/SearchList";
import SearchBox from "../chats/components/SearchBox";
import { Chat } from "@prisma/client";

function Sidebar({ chats }: { chats: Chat[] }) {
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

    useEffect(() => {
        if (query === "") {
            console.log("RESETED.");
        }
    }, [query]);

    return (
        <div
            className={`w-[300px] hidden md:flex flex-col border-r border-gray-200 dark:border-gray-600`}
        >
            <NewChatButton />
            <SearchBox
                onActive={onSearchActive}
                onCancel={onSearchCancel}
                onQueryChange={onQueryChange}
            />
            {isSearching ? <SearchList query={query} /> : <ConversationList />}
        </div>
    );
}

export default Sidebar;
