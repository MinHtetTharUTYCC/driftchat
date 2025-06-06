import React from "react";
import { User as PrismaUser } from "@prisma/client";
import { User } from "lucide-react";
import { useChatCheck } from "@/lib/useChatCheck";

function SearchUserItem({ user, onShowChat }: { user: PrismaUser; onShowChat: () => void }) {
    const { checkChat } = useChatCheck();

    const handleCheck = () => {
        checkChat(user.id, onShowChat);
    };

    return (
        <div
            onMouseDown={handleCheck}
            className="flex items-center justify-start gap-2 p-2 bg-transparent hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-l-lg cursor-pointer"
        >
            <div className="flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-600">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </div>
            <h1 className="flex-1 text-lg line-clamp-1">{`${user.name ?? "Unknown User"}`}</h1>
        </div>
    );
}

export default SearchUserItem;
