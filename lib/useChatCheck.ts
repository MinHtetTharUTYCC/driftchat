"use client";

import { useRouter } from "next/navigation";

export function useChatCheck() {
    const router = useRouter();

    const checkChat = async (userId: string, onShowChat?: () => void) => {
        try {
            const checkResponse = await fetch(
                `/api/chats/check?userId=${encodeURIComponent(userId)}`
            );
            if (!checkResponse.ok) throw new Error("Failed to check chat!");

            const { chatId, exists } = await checkResponse.json();

            if (!exists) {
                const createResponse = await fetch("/api/chats", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ participantId: userId }),
                });

                const newChat = await createResponse.json();
                router.push(`/chats?chatId=${newChat.id}`);
            } else {
                router.push(`/chats?chatId=${chatId}`);
            }

            if (onShowChat) onShowChat();
        } catch (error) {
            console.error("Error checking chat", error);
            window.location.reload();
        }
    };

    return { checkChat };
}
