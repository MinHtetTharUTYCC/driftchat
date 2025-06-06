"use client";
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";

function MessageInput({ onMsgSend }: { onMsgSend: (msg: string) => void }) {
    const [msg, setMsg] = useState("");

    const onSend = () => {
        if (msg.trim()) {
            onMsgSend(msg.trim());
            setMsg("");
        }
    };

    return (
        <form
            className="border-t rounded-b-lg pt-2 m-2  flex items-center gap-2"
            onSubmit={(e) => {
                e.preventDefault();
                onSend();
            }}
        >
            <input
                value={msg}
                onChange={(e) => setMsg(e.currentTarget.value)}
                type="text"
                className="flex-1 rounded-full px-4 py-2 bg-gray-200 dark:bg-zinc-700 focus:outline-none focus:ring-0 focus:border-transparent"
                placeholder="Type here..."
            />
            <button type="submit" className="mr-2 p-2 rounded-full bg-teal-500 hover:bg-teal-600">
                <SendHorizonal className="h-6 w-6" />
            </button>
        </form>
    );
}

export default MessageInput;
