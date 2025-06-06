"use client";
import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import { ChatWithLatestMessage, ExtendedChat } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { initSocket } from "@/lib/socket-io/socket";
import { Message } from "@prisma/client";
import { Socket } from "socket.io-client";
import ChatWindow from "./components/ChatWindow";
import StarterChatWindow from "./components/StarterChatWindow";
import ChatInfo from "./components/chat-info/ChatInfo";
import { useUiStore } from "@/lib/store/useUiStore";

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

    const { showChatWindow, setShowChatWindow } = useUiStore();
    const { showChatInfo, setShowChatInfo } = useUiStore();

    const loggedInUserId = useAuthStore((state) => state.userId);

    const otherParticipantUser = currentChat?.participants.find(
        (p) => p.userId !== loggedInUserId
    )?.user;

    const setHideHeader = useUiStore((state) => state.setHideHeader);

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
        setHideHeader(isMobile && (showChatWindow || showChatInfo));
    }, [isMobile, showChatWindow, showChatInfo]);

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

    const onChatInfoBack = () => {
        setShowChatInfo(false);
        setShowChatWindow(true);
    };

    useEffect(() => {
        if (!loggedInUserId) return;

        const socket = initSocket(loggedInUserId);
        socketRef.current = socket;

        const handleReceiveMessage = (newMessage: Message) => {
            console.log("✅ Received Msg:", newMessage);

            setChatsWithLatestMessage((prevChats) => {
                const chatIndex = prevChats.findIndex((c) => c.id === newMessage.chatId);
                if (chatIndex === -1) return prevChats;

                const updatedChat = { ...prevChats[chatIndex], latestMessage: newMessage };
                const updatedChats = [updatedChat, ...prevChats.filter((_, i) => i !== chatIndex)];
                return updatedChats;
            });

            if (newMessage.chatId === currentChat?.id) {
                setCurrentChatMessages((prev) => [...prev, newMessage]);
            }
        };

        socket.on("receive-message", handleReceiveMessage);

        // 🔥 Join rooms as soon as socket connects and chats load
        const joinRooms = () => {
            chatsWithLatestMessage.forEach((chat) => {
                socket.emit("join-room", chat.id);
                console.log("📡 Joined room:", chat.id);
            });
        };

        // 👂 Wait until socket is connected and chats are ready
        if (socket.connected) {
            joinRooms();
        } else {
            socket.on("connect", joinRooms);
        }

        return () => {
            socket.off("receive-message", handleReceiveMessage);
            socket.off("connect", joinRooms);
            chatsWithLatestMessage.forEach((chat) => {
                socket.emit("leave-room", chat.id);
            });
        };
    }, [loggedInUserId, currentChat?.id, JSON.stringify(chatsWithLatestMessage.map((c) => c.id))]);

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
        <div className="flex h-full bg-gray-100 dark:bg-black">
            {/* Sidebar - hidden on mobile when chat window  or chat info is shown */}
            {(!isMobile || (!showChatWindow && !showChatInfo)) && (
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

            {/* Chat Window - shown on mobile only if showChatWindow is true and chat info is not shown */}
            {(!isMobile || (showChatWindow && !showChatInfo)) && (
                <div className={`${isMobile ? "w-full" : "flex-1"}`}>
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
                            onToggleChatInfo={() => {
                                if (isMobile) {
                                    setShowChatWindow(false);
                                }
                                setShowChatInfo(!showChatInfo);
                            }}
                        />
                    )}
                </div>
            )}

            {showChatInfo && (
                <div className={`${isMobile ? "w-full" : "w-[400px] "}`}>
                    <ChatInfo
                        isMobile={isMobile}
                        onBack={onChatInfoBack}
                        chatParticipant={otherParticipantUser}
                    />
                </div>
            )}
        </div>
    );
}

export default ChatPage;
