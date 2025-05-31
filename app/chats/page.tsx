"use client";
import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import { ChatWithLatestMessage, ExtendedChat } from "@/types";
import { redirect, useParams, useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { initSocket } from "@/lib/socket-io/socket";
import { Message } from "@prisma/client";
import { Socket } from "socket.io-client";
import ChatWindow from "./components/ChatWindow";
import StarterChatWindow from "./components/StarterChatWindow";

function ChatPage() {
    const socketRef = useRef<Socket | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const chatId = searchParams.get("chatId");
    const isNewChat = chatId === "newChat";

    const [chatsWithLatestMessage, setChatsWithLatestMessage] = useState<ChatWithLatestMessage[]>(
        []
    );
    const [currentChat, setCurrentChat] = useState<ExtendedChat | null>(null);

    const [currentChatMessages, setCurrentChatMessages] = useState<Message[]>([]);

    const [isLoadingChats, setIsLoadingChats] = useState(false);
    const [isLoadingCurrentChat, setIsLoadingCurrentChat] = useState(false);

    const [isMobile, setIsMobile] = useState(false);
    const [showChatWindow, setShowChatWindow] = useState(false);

    const setHideHeader = useAuthStore((state) => state.setHideHeader);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                setIsLoadingChats(true);
                const res = await fetch("/api/chats");
                if (!res.ok) {
                    throw new Error("Error getting chats");
                }

                const data = await res.json();
                setChatsWithLatestMessage(data.chatsWithLatestMessage);
            } catch (error) {
                console.error("Error fetching chats:", error);
            } finally {
                setIsLoadingChats(false);
            }
        };

        fetchChats();
    }, []);
    useEffect(() => {
        if (!chatId || isNewChat) {
            setCurrentChat(null);
            setCurrentChatMessages([]);
            setIsLoadingCurrentChat(false);
            return;
        }

        const fetchChat = async () => {
            try {
                setIsLoadingCurrentChat(true);
                const res = await fetch(`/api/chats/${chatId}`);
                if (!res.ok) {
                    throw new Error("Error getting single chat");
                }

                const data = await res.json();
                setCurrentChat(data.chat);
            } catch (error) {
                console.error("Error fetching current Chat:", error);
            } finally {
                setIsLoadingCurrentChat(false);
            }
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
        router.push("/chats?chatId=newChat");
        setShowChatWindow(true);
    };
    const backToSidebar = () => {
        setShowChatWindow(false);
    };
    const onChatClick = (selectedChatId: string) => {
        if (selectedChatId !== chatId) {
            setCurrentChat(null);
            setCurrentChatMessages([]);
        }
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
    // useEffect(() => {
    //     if (chatId && isMobile) {
    //         setShowChatWindow(true);
    //     }
    // }, [chatId, isMobile]);

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
                        isLoading={isLoadingChats}
                        onShowChat={() => setShowChatWindow(true)}
                    />
                </div>
            )}

            {/* Chat Window - hidden on mobile when sidebar is shown */}
            {(!isMobile || showChatWindow) && (
                <div className={isMobile ? "w-full" : "flex-1"}>
                    {isNewChat ? (
                        <StarterChatWindow
                            ref={chatWindowSearchInputRef}
                            onBackToSidebar={() => {
                                setShowChatWindow(false);
                                router.back();
                            }}
                            isMobile={isMobile}
                            onShowChat={() => setShowChatWindow(true)}
                        />
                    ) : (
                        <ChatWindow
                            // ref={chatWindowSearchInputRef}
                            onBackToSidebar={backToSidebar}
                            isMobile={isMobile}
                            currentChat={currentChat}
                            messages={currentChatMessages}
                            isLoading={isLoadingCurrentChat}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default ChatPage;
