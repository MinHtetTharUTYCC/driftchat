import { format } from "date-fns";
import { User } from "lucide-react";
import React from "react";

function Message({ message }: { message: any }) {
    return (
        <div
            className={`flex gap-3 ${message.role === "sender" ? "justify-end" : "justify-start"}`}
        >
            {message.role === "viewer" && (
                <div className="h-fit flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-600">
                    <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </div>
            )}

            <div className={`max-w-[80%]`}>
                <p
                    className={`rounded-full px-4 py-2 ${
                        message.role === "sender"
                            ? "bg-teal-400 dark:bg-teal-500 text-white"
                            : "bg-gray-200 dark:bg-zinc-600"
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
