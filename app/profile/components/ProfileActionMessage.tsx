"use client";

import React from "react";
import { useChatCheck } from "@/lib/useChatCheck";
import { MessageCircleMore } from "lucide-react";

function ProfileActionMessage({ userId }: { userId: string }) {
    const { checkChat } = useChatCheck();
    const handleCheck = () => {
        checkChat(userId);
    };

    return (
        <div
            onClick={handleCheck}
            className="mt-2 md:mt-0 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white cursor-pointer rounded-full px-4 py-2"
        >
            <MessageCircleMore className="h-5 w-5" />
            Message
        </div>
    );
}

export default ProfileActionMessage;
