import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatWindow() {
    return (
        <div className="flex-1 flex flex-col m-2">
            <div className="rounded-lg border-2 overflow-hidden h-full flex flex-col min-h-0">
                <ChatHeader />
                <MessageList />
                <MessageInput />
            </div>
        </div>
    );
}

export default ChatWindow;
