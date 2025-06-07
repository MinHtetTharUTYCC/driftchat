import { SquarePen } from "lucide-react";
import React from "react";

function NewChatButton({
    onNewChat,
}: {
    onNewChat: () => void;
    onDesktopFocus: () => void;
    isMobile?: boolean;
}) {
    return (
        <div className="flex items-center justify-between py-4 px-1">
            <h1 className="font-bold text-xl ml-2">Chats</h1>
            <div
                onClick={onNewChat}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 p-2 rounded-full mr-2"
            >
                <SquarePen className="h-5 w-5" />
            </div>
        </div>
    );
}

export default NewChatButton;
