import React from "react";
import { redirect } from "next/navigation";
import { getNextAuthSession } from "@/lib/nextauthSession/session";
import { prisma } from "@/lib/db/prismaDB";
import Sidebar from "../components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { RefreshCw } from "lucide-react";

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
        // include: {
        //     participants: {
        //         include: {
        //             user: true,
        //         },
        //     },
        //     messages: {
        //         orderBy: {
        //             createdAt: "desc",
        //         },
        //         take: 1,
        //     },
        // },
        orderBy: { createdAt: "desc" },
        take: 1,
    });

    if (chats && chats.length > 0) {
        redirect(`/chats/c/${chats[0].id}`);
    } else {
        redirect("/chats/fresh-new");
    }
    // return (
    //     <div className="flex h-full items-center justify-center">
    //         <RefreshCw className="animate-spin h-10 w-10" />

    //         {/* <Sidebar />
    //         <ChatWindow /> */}
    //     </div>
    // );
}

export default ChatPage;
