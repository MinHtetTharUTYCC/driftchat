"use client";
import { MoreHorizontal, User } from "lucide-react";
import React, { useState } from "react";

function Conversation({ conver }: { conver: any }) {
    const [isChildHovered, setIsChildHovered] = useState(false);
    return (
        <div
            className={`group/parent flex items-center gap-2 p-2 rounded-l-lg cursor-pointer ${
                isChildHovered ? "bg-transparent" : "hover:bg-gray-200 dark:hover:bg-zinc-700"
            }`}
        >
            <div className="flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-600">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </div>

            <div className="flex-1 overflow-hidden">
                <p className="font-semibold">{conver.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{conver.msg}</p>
            </div>

            <div
                className="invisible group-hover/parent:visible p-2 rounded-full mr-2 shadow-sm
                  bg-gray-50 hover:bg-gray-200 dark:bg-zinc-500 dark:hover:bg-zinc-700"
                onMouseEnter={() => setIsChildHovered(true)}
                onMouseLeave={() => setIsChildHovered(false)}
            >
                <MoreHorizontal className="h-6 w-6" />
            </div>
        </div>
    );
}

export default Conversation;
