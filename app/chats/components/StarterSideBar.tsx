import React from "react";
import NewChatButton from "./NewChatButton";

function StarterSideBar({
    onNewChat,
    onDesktopFocus,
    isMobile,
}: {
    onNewChat: () => void;
    onDesktopFocus: () => void;
    isMobile: boolean;
}) {
    return (
        <div className={`h-full flex flex-col border-r border-gray-200 dark:border-gray-600`}>
            <NewChatButton
                onNewChat={onNewChat}
                onDesktopFocus={onDesktopFocus}
                isMobile={isMobile}
            />

            <div className="flex-1 flex flex-col items-center justify-center gap-2">
                <p className="text-center text-lg font-semibold">No Chats History.</p>

                <div
                    className="rounded-full text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 cursor-pointer"
                    onClick={isMobile ? onNewChat : onDesktopFocus}
                >
                    Start Chatting
                </div>
            </div>
        </div>
    );
}

export default StarterSideBar;
