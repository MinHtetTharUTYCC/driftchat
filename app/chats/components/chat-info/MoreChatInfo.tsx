"use client";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import React, { useState } from "react";

function MoreChatInfo({
    title,
    childs,
    isColored,
}: {
    title: string;
    childs: { icon: LucideIcon; subTitle: string }[];
    isColored?: boolean;
}) {
    const [active, setActive] = useState(false);
    return (
        <div className="w-full text-sm font-semibold">
            <div
                className="w-full flex items-center justify-between p-2 rounded bg-transparent hover:bg-gray-200 dark:hover:bg-zinc-700"
                onClick={() => setActive((prev) => !prev)}
            >
                <p>{title}</p>
                {active ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>

            {active &&
                childs.map((c) => (
                    <div
                        key={c.subTitle}
                        className="w-full ml-4 flex items-center gap-2 p-2 rounded bg-transparent hover:bg-gray-200 dark:hover:bg-zinc-700"
                    >
                        <c.icon className={`h-5 w-5 ${isColored ? `text-teal-500` : ``}`} />
                        <p>{c.subTitle}</p>
                    </div>
                ))}
        </div>
    );
}

export default MoreChatInfo;
