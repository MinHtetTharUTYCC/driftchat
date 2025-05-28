import { SendHorizonal } from "lucide-react";
import React from "react";

function MessageInput() {
    return (
        <form className="border-t rounded-b-lg pt-2 m-2  flex items-center justify-center gap-2">
            <input
                type="text"
                className="flex-1 rounded-full px-4 py-2 bg-gray-200 dark:bg-zinc-700 focus:outline-none focus:ring-0 focus:border-transparent"
                placeholder="Type here..."
            />
            <button type="submit" className="mr-2">
                <SendHorizonal className="h-6 w-6 text-teal-500" />
            </button>
        </form>
    );
}

export default MessageInput;
