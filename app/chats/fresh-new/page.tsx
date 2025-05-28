"use client";
import React, { useEffect, useRef, useState } from "react";
import StarterSideBar from "../components/StarterSideBar";
import StarterChatWindow from "../components/StarterChatWindow";

function RreshNewChatPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [showChatWindow, setShowChatWindow] = useState(false);

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

    return (
        <div className="flex h-full">
            {/* Sidebar - hidden on mobile when chat window is shown */}
            {(!isMobile || !showChatWindow) && (
                <div className={isMobile ? "w-full" : "w-[300px]"}>
                    <StarterSideBar
                        onNewChat={goToNewChat}
                        onDesktopFocus={handleChatWidowSearchFocus}
                        isMobile={isMobile}
                    />
                </div>
            )}

            {/* Chat Window - hidden on mobile when sidebar is shown */}
            {(!isMobile || showChatWindow) && (
                <div className={isMobile ? "w-full" : "flex-1"}>
                    <StarterChatWindow
                        ref={chatWindowSearchInputRef}
                        onBackToSidebar={backToSidebar}
                        isMobile={isMobile}
                    />
                </div>
            )}
        </div>
    );
}

export default RreshNewChatPage;
