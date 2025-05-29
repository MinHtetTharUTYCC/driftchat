"use client";
import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import { ExtendedChat } from "@/types";
import { redirect, useParams } from "next/navigation";

function ChatPage() {
    const params = useParams();
    const id = params.id as string;

    const [chats, setChats] = useState<ExtendedChat[]>([]);
    const [currentChat, setCurrentChat] = useState<ExtendedChat | null>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [showChatWindow, setShowChatWindow] = useState(false);

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
    }, [id]);

    //for not mobile
    const chatWindowSearchInputRef = useRef<{ focusInput: () => void }>(null);
    const handleChatWidowSearchFocus = () => {
        chatWindowSearchInputRef.current?.focusInput();
    };

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();

        window.addEventListener("resize", checkIsMobile);
        //clearn up listerner
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    const goToNewChat = () => {
        setShowChatWindow(true);
    };

    const backToSidebar = () => {
        setShowChatWindow(false);
    };

    const onChatClick = (chatId: string) => {
        setShowChatWindow(true);
        redirect(`/chats/c/${chatId}`);
    };

    // return (
    //     <div className="flex h-full">
    //         <Sidebar chats={chats} />
    //         <ChatWindow chat={currentChat} />
    //     </div>
    // );
    return (
        <div className="flex h-full">
            {/* Sidebar - hidden on mobile when chat window is shown */}
            {(!isMobile || !showChatWindow) && (
                <div className={isMobile ? "w-full" : "w-[300px]"}>
                    <Sidebar
                        onNewChat={goToNewChat}
                        onDesktopFocus={handleChatWidowSearchFocus}
                        isMobile={isMobile}
                        chats={chats}
                        onChatClick={onChatClick}
                    />
                </div>
            )}

            {/* Chat Window - hidden on mobile when sidebar is shown */}
            {(!isMobile || showChatWindow) && (
                <div className={isMobile ? "w-full" : "flex-1"}>
                    <ChatWindow
                        // ref={chatWindowSearchInputRef}
                        onBackToSidebar={backToSidebar}
                        isMobile={isMobile}
                        currentChat={currentChat}
                    />
                </div>
            )}
        </div>
    );
}

export default ChatPage;
