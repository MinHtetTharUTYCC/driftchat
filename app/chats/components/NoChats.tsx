import { Button } from "@/components/ui/button";
import { MessageSquareOff } from "lucide-react";
import React from "react";

function NoChats() {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <MessageSquareOff size={40} className="text-gray-400" />
            <div className="text-center space-y-2">
                <h2 className="text-lg font-semibold">No chats yet.</h2>
                <Button className="rounded-full text-light-background bg-light-primary hover:bg-light-morePrimary">
                    Start Chatting
                </Button>
            </div>
        </div>
    );
}

export default NoChats;
