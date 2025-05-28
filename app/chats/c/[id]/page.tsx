import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import { Chat } from "@prisma/client";

function ChatPage({ params }: { params: { id: string } }) {
    const { id } = params;

    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);

    useEffect(() => {
        const fetchChats = async () => {
            const res = await fetch("/api/chats");
            if (!res.ok) {
                throw new Error("Error getting chats");
            }

            const data = await res.json();
            setChats(data.chats);
        };

        const fetchChat = async () => {
            const res = await fetch(`/api/chats/${id}`);
            if (!res.ok) {
                throw new Error("Error getting single chat");
            }

            const data = await res.json();
            setCurrentChat(data.chat);
        };

        fetchChats();
        fetchChat();
    }, []);

    <div className="flex h-full">
        <Sidebar chats={chats} />
        <ChatWindow chat={currentChat} />
    </div>;
}

export default ChatPage;
