import { EllipsisVertical, Info } from "lucide-react";
import React from "react";

function ChatHeader() {
    return (
        <div className="rounded-t-lg bg-gray-200 p-2 flex items-center justify-between">
            <h1 className="font-semibold">Chat with User01</h1>
            <EllipsisVertical className="h-5 w-5" />
        </div>
    );
}

export default ChatHeader;
