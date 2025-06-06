"use client";

import { Message as PrismaMessage } from "@prisma/client";
import { format, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function EachMessage({
    message,
    currentUserId,
    participantUserId,
    participantUserImage,
}: {
    message: PrismaMessage;
    currentUserId?: string | null;
    participantUserId?: string | null;
    participantUserImage?: string | null;
}) {
    const isMessageMine = currentUserId === message.senderId;

    const [showDate, setShowDate] = useState(false);

    return (
        <div className={`flex gap-3 ${isMessageMine ? "justify-end" : "justify-start"}`}>
            {!isMessageMine && (
                <Link
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    href={`/profile/${participantUserId}`}
                >
                    {!participantUserImage ? (
                        <div className="w-6 h-6 flex items-center p-1 justify-center rounded-full bg-gray-300 dark:bg-gray-700">
                            <User className="h-full w-full text-gray-600 dark:text-gray-300" />
                        </div>
                    ) : (
                        <Image
                            src={participantUserImage}
                            height={24}
                            width={24}
                            alt={`chat user profile`}
                            className="rounded-full object-cover w-full h-full"
                        />
                    )}
                </Link>
            )}

            <div
                className={`max-w-[80%] flex flex-col cursor-pointer ${
                    isMessageMine ? "items-end" : "items-start"
                }`}
                onClick={() => setShowDate((prev) => !prev)}
            >
                <p
                    className={`w-fit rounded-full px-4 py-2 ${
                        isMessageMine
                            ? "bg-teal-400 dark:bg-teal-500 text-white"
                            : "bg-gray-200 dark:bg-zinc-600"
                    }`}
                >
                    {message.content}
                </p>
                {showDate && (
                    <p className="text-xs w-fit  mt-1 pr-1 text-gray-500">
                        {FormatMessageDate(message.createdAt)}
                    </p>
                )}
            </div>
        </div>
    );
}

export default EachMessage;

function FormatMessageDate(date: Date) {
    if (isToday(date)) {
        return format(date, "hh:mm a");
    } else if (isYesterday(date)) {
        return `Yesterday at ${format(date, "hh:mm a")}`;
    } else if (isThisWeek(date)) {
        return format(date, `EEE \'at'\ hh:mm a`);
    } else if (isThisYear(date)) {
        return format(date, `MMM d \'at'\ hh:mm a`);
    } else {
        //other years
        return format(date, "MMM d, yyyy");
    }
}
