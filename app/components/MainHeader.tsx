import React from "react";
import { ChevronDown, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import ProfilePopover from "../chats/components/ProfilePopover";
import Image from "next/image";
import UserImage from "./UserImage";

function MainHeader({
    userId,
    name,
    image,
}: {
    userId: string;
    name?: string | null;
    image?: string | null;
}) {
    return (
        <div className="h-30 flex items-center justify-between px-4 py-2 shadow-lg bg-light-background dark:bg-dark-background z-50">
            <h1 className="text-2xl font-bold">DriftChat</h1>
            <TooltipProvider>
                <Popover>
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                <div className="relative cursor-pointer">
                                    <UserImage image={image} />
                                    <div className="absolute right-0 bottom-0 flex items-center justify-center p-[3px] bg-gray-400 rounded-full">
                                        <ChevronDown className="h-3 w-3" />
                                    </div>
                                </div>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="px-4 py-2 bg-gray-800 dark:bg-zinc-600 font-semibold text-white rounded-xl">
                                Account
                            </p>
                        </TooltipContent>
                    </Tooltip>
                    <PopoverContent className=" mr-5 bg-white dark:bg-zinc-800 p-4 focus:outline-none rounded-xl shadow-md">
                        <ProfilePopover userId={userId} name={name} image={image} />
                    </PopoverContent>
                </Popover>
            </TooltipProvider>
        </div>
    );
}

export default MainHeader;
