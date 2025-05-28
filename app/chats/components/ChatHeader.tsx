import { EllipsisVertical, Phone, User, Video } from "lucide-react";

import React from "react";

function ChatHeader() {
    return (
        <div className="rounded-t-lg bg-gray-200 dark:bg-zinc-900 p-2 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700 cursor-pointer">
                <div className="h-fit flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-600">
                    <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <h1 className="font-semibold">Ei Ei Chaw Ou</h1>
            </div>
            <div className="flex items-center justify-center  gap-2 mr-2">
                <div className="flex items-center p-2 justify-center rounded-full hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer">
                    <Phone className="h-5 w-5 text-teal-500" />
                </div>
                <div className="flex items-center p-2 justify-center rounded-full hover:bg-gray-50 dark:hover:bg-zinc-700  cursor-pointer">
                    <Video className="h-5 w-5 text-teal-500" />
                </div>
                <div className="flex items-center p-2 justify-center rounded-full hover:bg-gray-50 dark:hover:bg-zinc-700  cursor-pointer">
                    <EllipsisVertical className="h-5 w-5 text-teal-500" />
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;
