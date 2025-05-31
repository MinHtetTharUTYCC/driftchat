"use client";
import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import { ChatWithLatestMessage, ExtendedChat } from "@/types";
import { redirect, useParams, useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { initSocket } from "@/lib/socket-io/socket";
import { Message } from "@prisma/client";
import { Socket } from "socket.io-client";

function ChatPage() {
    const socketRef = useRef<Socket | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const chatId = searchParams.get("chatId");

    const [chatsWithLatestMessage, setChatsWithLatestMessage] = useState<ChatWithLatestMessage[]>(
        []
    );
    const [currentChat, setCurrentChat] = useState<ExtendedChat | null>(null);

    const [currentChatMessages, setCurrentChatMessages] = useState<Message[]>([]);

    const [isMobile, setIsMobile] = useState(false);
    const [showChatWindow, setShowChatWindow] = useState(false);

    const setHideHeader = useAuthStore((state) => state.setHideHeader);

    useEffect(() => {
        const fetchChats = async () => {
            const res = await fetch("/api/chats");
            if (!res.ok) {
                throw new Error("Error getting chats");
            }

            const data = await res.json();
            setChatsWithLatestMessage(data.chatsWithLatestMessage);
        };

        fetchChats();
    }, []);
    useEffect(() => {
        if (!chatId) {
            setCurrentChat(null);
            setCurrentChatMessages([]);
            return;
        }

        const fetchChat = async () => {
            const res = await fetch(`/api/chats/${chatId}`);
            if (!res.ok) {
                throw new Error("Error getting single chat");
            }

            const data = await res.json();
            setCurrentChat(data.chat);
        };

        fetchChat();
    }, [chatId]);

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

    useEffect(() => {
        setHideHeader(isMobile && showChatWindow);
    }, [isMobile, showChatWindow]);

    const goToNewChat = () => {
        // TODO: new Chat query
        setShowChatWindow(true);
    };
    const backToSidebar = () => {
        setShowChatWindow(false);
    };
    const onChatClick = (selectedChatId: string) => {
        router.push(`/chats?chatId=${selectedChatId}`, { scroll: false });
        setShowChatWindow(true);
    };

    // Socket set up and message listening
    useEffect(() => {
        const socket = initSocket();
        socketRef.current = socket;

        const handleReceiveMessage = (newMessage: Message) => {
            console.log("Received Msg:", newMessage);

            setChatsWithLatestMessage((prevChats) => {
                //1: find chat that matchs newMessage.chatId
                const chatIndex = prevChats.findIndex((c) => c.id === newMessage.chatId);
                if (chatIndex === -1) return prevChats; //not found, ignore

                //2: update latest message for that chat
                const updatedChat = { ...prevChats[chatIndex], latestMessage: newMessage };

                //3: reorder: move updated chat to top(active chat)
                const updatedChats = [updatedChat, ...prevChats.filter((_, i) => i !== chatIndex)];

                console.log("Chat count: ", updatedChats.length);
                return updatedChats;
            });

            //Update current chat messages if message belongs to current chat
            if (newMessage.chatId === currentChat?.id) {
                setCurrentChatMessages((prev) => [...prev, newMessage]);
            }
        };
        socket.on("receive-message", handleReceiveMessage);

        return () => {
            socket.off("receive-message", handleReceiveMessage);
        };
    }, [currentChat?.id]);

    // Room management
    useEffect(() => {
        if (!socketRef.current) return;
        const socket = socketRef.current;

        const currentChatIds = chatsWithLatestMessage.map((c) => c.id);
        console.log("[Socket] Managing rooms:", currentChatIds);

        //join all current rooms
        currentChatIds.forEach((chatId) => {
            socket.emit("join-room", chatId);
            console.log("JOIINED>>>");
        });

        return () => {
            //leave rooms on cleanup
            currentChatIds.forEach((chatId) => {
                socket.emit("leave-room", chatId);
            });
        };
    }, [chatsWithLatestMessage.map((c) => c.id).join(",")]); //only when chat IDs change

    // Reset messages when switching chats
    useEffect(() => {
        if (currentChat?.messages) {
            setCurrentChatMessages(currentChat.messages);
        }
    }, [currentChat]);

    // Show chat window automatically if chatId is present
    useEffect(() => {
        if (chatId && isMobile) {
            setShowChatWindow(true);
        }
    }, [chatId, isMobile]);

    return (
        <div className="flex h-full">
            {/* Sidebar - hidden on mobile when chat window is shown */}
            {(!isMobile || !showChatWindow) && (
                <div className={isMobile ? "w-full" : "w-[300px]"}>
                    <Sidebar
                        onNewChat={goToNewChat}
                        onDesktopFocus={handleChatWidowSearchFocus}
                        isMobile={isMobile}
                        chatsWithLatestMessage={chatsWithLatestMessage}
                        onChatClick={onChatClick}
                        currentChatId={chatId}
                        isLoading={false}
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
                        messages={currentChatMessages}
                        isLoading={false}
                    />
                </div>
            )}
        </div>
    );
}

export default ChatPage;
