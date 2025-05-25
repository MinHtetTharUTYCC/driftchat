import React from "react";
import NewChatButton from "../chats/components/NewChatButton";
import ConversationList from "../chats/components/ConversationList";

function Sidebar({ className }: { className?: string }) {
    return (
        <div
            className={`hidden md:flex w-64 border-r border-gray-200 dark:border-gray-700 flex-col overflow-y-auto`}
        >
            <div className="p-4">
                <NewChatButton />
            </div>
            <div className="flex-1 overflow-y-auto">
                <ConversationList />
            </div>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
        </div>
    );
}

export default Sidebar;
