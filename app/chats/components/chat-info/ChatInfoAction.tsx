import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function ChatInfoAction({
    icon: Icon,
    title,
    link,
}: {
    icon: LucideIcon;
    title: string;
    link: string;
}) {
    const router = useRouter();
    return (
        <div
            className="group flex flex-col items-center justify-center cursor-pointer"
            onClick={() => router.push(link)}
        >
            <div
                className="flex items-center justify-center p-2 rounded-full
                                 bg-gray-200 dark:bg-gray-600 group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
            >
                <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <p className="text-xs">{title}</p>
        </div>
    );
}

export default ChatInfoAction;
