import React from "react";
import { redirect } from "next/navigation";
import { getNextAuthSession } from "@/lib/nextauthSession/session";
import { prisma } from "@/lib/db/prismaDB";
import { MessageSquare, MessageSquareOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoChats from "./components/NoChats";
import MobileHeader from "../components/MobileHeader";
import Sidebar from "../components/Sidebar";
import ChatWindow from "./components/ChatWindow";

async function ChatPage() {
    const session = await getNextAuthSession();
    if (!session) {
        redirect("/api/auth/signin");
    }
    const { id: userId } = session.user;

    const chats = await prisma.chat.findMany({
        where: {
            participants: {
                some: {
                    userId: userId,
                },
            },
        },
        include: {
            participants: {
                include: {
                    user: true,
                },
            },
            messages: {
                orderBy: {
                    createdAt: "desc",
                },
                take: 1,
            },
        },
    });

    return (
        <div className="flex h-full">
            <Sidebar />
            <ChatWindow />
        </div>
    );
}

export default ChatPage;
