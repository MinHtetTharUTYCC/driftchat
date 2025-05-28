import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Chat } from "@prisma/client";

function ChatWindow({ chat }: { chat: Chat | null }) {
    return (
        <div className="flex-1 flex flex-col m-3">
            <div className="rounded-lg overflow-hidden h-full flex flex-col">
                <ChatHeader />
                <MessageList />
                <MessageInput />
            </div>
        </div>
    );
}

export default ChatWindow;
