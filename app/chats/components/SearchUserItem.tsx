import React from "react";
import { User as PrismaUser } from "@prisma/client";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

function SearchUserItem({ user, onShowChat }: { user: PrismaUser; onShowChat: () => void }) {
    const router = useRouter();

    const handleCheck = async () => {
        try {
            const checkResponse = await fetch(
                `/api/chats/check?userId=${encodeURIComponent(user.id)}`
            );
            if (!checkResponse.ok) throw new Error("Failed to check chat!");

            const { chatId, exists } = await checkResponse.json();

            if (!exists) {
                //create new chat
                const createResponse = await fetch("/api/chats", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        participantId: user.id,
                    }),
                });

                const newChat = await createResponse.json();
                router.push(`/chats?chatId=${newChat.id}`);
                onShowChat();
            } else {
                //Navigate to existing chat
                router.push(`/chats?chatId=${chatId}`);
                onShowChat();
            }
        } catch (error) {
            console.error("Error checking chat", error);
            // Fallback if API calls fail
            //TODO: may be remove window reloading_under_this_line
            window.location.reload();
        }
    };

    return (
        <div
            onClick={handleCheck}
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
