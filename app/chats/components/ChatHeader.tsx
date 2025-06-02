import { formatDistanceToNow, isToday } from "date-fns";
import { ArrowLeft, Info, Phone, User, Video } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

function ChatHeader({
    onBackToSidebar,
    onToggleChatInfo,
    isMobile,
    participantName,
    participantUserId,
    isOnline,
    lastSeen,
}: {
    onBackToSidebar: () => void;
    onToggleChatInfo: () => void;
    isMobile: boolean;
    participantName?: string | null;
    participantUserId?: string | null;
    isOnline: boolean;
    lastSeen?: Date | null;
}) {
    const router = useRouter();

    return (
        <div className="rounded-t-lg bg-gray-200 dark:bg-zinc-900 p-2 flex items-center justify-between shadow-md">
            <div className="flex items-center justify-center gap-1">
                {isMobile && (
                    <div className="flex items-center justify-center p-2" onClick={onBackToSidebar}>
                        <ArrowLeft className="h-6 w-6" />
                    </div>
                )}
                <div
                    className="relative flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                    onClick={() => router.push(`/profile/${participantUserId}`)}
                >
                    <div className="relative h-fit flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-600">
                        <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        {isOnline && (
                            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-zinc-800" />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-semibold">{participantName ?? "Unknown User"}</h1>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {isOnline
                                ? "Active Now"
                                : lastSeen
                                ? `Active ${formatDistanceToNow(lastSeen, { addSuffix: true })}`
                                : ""}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center  gap-2 mr-2">
                <div className="flex items-center p-2 justify-center rounded-full hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer">
                    <Phone className="h-5 w-5 text-teal-500" />
                </div>
                <div className="flex items-center p-2 justify-center rounded-full hover:bg-gray-50 dark:hover:bg-zinc-700  cursor-pointer">
                    <Video className="h-5 w-5 text-teal-500" />
                </div>
                <div
                    className="flex items-center p-2 justify-center rounded-full hover:bg-gray-50 dark:hover:bg-zinc-700  cursor-pointer"
                    onClick={onToggleChatInfo}
                >
                    <Info className="h-5 w-5 text-teal-500" />
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;
