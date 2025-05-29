"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowLeft, ChevronRight, LogOut, Moon, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ProfilePopover({ userId, name }: { userId: string; name?: string | null }) {
    const [isGoingDark, setIsGoingDark] = useState(false);
    const { theme, setTheme } = useTheme();

    const navigateDarkMode = () => {
        setIsGoingDark(true);
    };
    const navigateBack = () => {
        setIsGoingDark(false);
    };

    return (
        <div className="w-[400px] flex flex-col ">
            {isGoingDark ? (
                <>
                    <div className="flex items-center p-2 gap-2 rounded-lg w-full">
                        <div
                            className="flex items-center p-2 justify-center rounded-full hover:bg-gray-200 hover:dark:bg-zinc-500 cursor-pointer"
                            onClick={navigateBack}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </div>
                        <h1 className="text-lg font-bold">Display</h1>
                    </div>

                    <div className="flex p-2 gap-2 w-full cursor-pointer">
                        <div className="h-fit flex items-center justify-center rounded-full  p-2 bg-gray-200  dark:bg-zinc-500 cursor-pointer">
                            <Moon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold">Dark Mode</p>
                            <p className="text-gray-500  dark:text-gray-400 mb-4">
                                Adjust the appearance of DriftChat to reduce glare and give your
                                eyes a break.
                            </p>

                            <RadioGroup defaultValue={theme} onValueChange={setTheme}>
                                <div
                                    className="flex items-center justify-between gap-2 py-3 px-2 hover:bg-stone-100 dark:hover:bg-zinc-600 rounded-lg"
                                    onClick={() => document.getElementById("r1")?.click()}
                                >
                                    <label htmlFor="r1" className="font-semibold">
                                        Off
                                    </label>
                                    <RadioGroupItem value="light" id="r1" className="mr-2" />
                                </div>
                                <div
                                    className="flex items-center justify-between gap-2 py-3 px-2 hover:bg-stone-100 dark:hover:bg-zinc-600 rounded-lg"
                                    onClick={() => document.getElementById("r2")?.click()}
                                >
                                    <label htmlFor="r2" className="font-semibold">
                                        On
                                    </label>
                                    <RadioGroupItem value="dark" id="r2" className="mr-2" />
                                </div>
                                <div
                                    className="flex items-center justify-between gap-2 py-3 px-2 hover:bg-stone-100 dark:hover:bg-zinc-600 rounded-lg"
                                    onClick={() => document.getElementById("r3")?.click()}
                                >
                                    <label htmlFor="r3" className="flex flex-col">
                                        <p className="font-semibold">Automatic</p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Automatically adjust the display based on your device's
                                            system settings.
                                        </p>
                                    </label>
                                    <RadioGroupItem value="system" id="r3" className="mr-2" />
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Link
                        href={`/profile/${userId}`}
                        className="flex items-center p-2 gap-2 hover:bg-stone-100 dark:hover:bg-zinc-700 rounded-lg w-full cursor-pointer"
                    >
                        <div className="flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-600">
                            <User className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                        </div>
                        <h1 className="text-lg font-bold">{name ?? "Unknown User"}</h1>
                    </Link>
                    <div
                        className="flex items-center justify-between px-2 py-1 gap-2 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-700 w-full cursor-pointer"
                        onClick={navigateDarkMode}
                    >
                        <div className="flex items-center p-2 gap-2">
                            <div className="flex items-center p-2 justify-center rounded-full bg-gray-200 dark:bg-zinc-500">
                                <Moon className="h-5 w-5" />
                            </div>
                            <p className="font-semibold">Display</p>
                        </div>
                        <ChevronRight className="h-6 w-6" />
                    </div>
                    <div className="flex items-center px-2 py-1 gap-2 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-700 w-full cursor-pointer">
                        <div className="flex items-center p-2 gap-2">
                            <div className="flex items-center p-2 justify-center rounded-full bg-gray-200 dark:bg-zinc-500">
                                <LogOut className="h-5 w-5" />
                            </div>
                            <p className="font-semibold">Log out</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
