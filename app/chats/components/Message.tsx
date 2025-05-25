import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import React from "react";

function Message({ message }: { message: any }) {
    return (
        <div
            className={`flex gap-3 ${message.role === "sender" ? "justify-end" : "justify-start"}`}
        >
            {message.role === "viewer" && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={"/avatar/user-avatar.png"} />
                    <AvatarFallback>Sender Avatar</AvatarFallback>
                </Avatar>
            )}

            <div className={`max-w-[80%]`}>
                <p
                    className={`rounded-full px-4 py-2 ${
                        message.role === "sender"
                            ? "bg-teal-400 text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                    }`}
                >
                    {message.content}
                </p>
                <p className="text-xs w-full text-end mt-1 pr-1 text-muted-foreground">
                    {format(message.timeStamp, "hh:mm a")}
                </p>
            </div>
        </div>
    );
}

export default Message;
