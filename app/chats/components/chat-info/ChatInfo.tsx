import React from "react";
import {
    ArrowLeft,
    Ban,
    Bell,
    BellOff,
    CaseSensitive,
    CircleDot,
    ClockFading,
    Eye,
    FileText,
    Images,
    Lock,
    MessageSquareOff,
    Pin,
    Search,
    ThumbsUp,
    TriangleAlert,
    User,
} from "lucide-react";
import ChatInfoAction from "./ChatInfoAction";
import MoreChatInfo from "./MoreChatInfo";
import { User as PrismaUser } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

function ChatInfo({
    chatParticipant,
    isMobile,
    onBack,
}: {
    chatParticipant?: PrismaUser | null;
    isMobile: boolean;
    onBack: () => void;
}) {
    return (
        <div className="flex h-full">
            <div className="relative">
                {isMobile && (
                    <div className="absolute top-4 left-4 p-2" onClick={onBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </div>
                )}
            </div>

            <div className="w-full rounded-lg  overflow-y-auto md:m-3 md:ml-0 p-4 bg-light-background dark:bg-dark-background flex flex-col items-center gap-4">
                <div className="flex flex-col gap-1 items-center">
                    {!chatParticipant?.image ? (
                        <div className="w-20 h-20 flex items-center justify-center rounded-full p-2 bg-gray-300 dark:bg-gray-700">
                            <User className="h-full w-full text-gray-600 dark:text-gray-300" />
                        </div>
                    ) : (
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                            <Image
                                src={chatParticipant.image}
                                height={80}
                                width={80}
                                alt="User Image"
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>
                    )}
                    <Link href={`/profile/${chatParticipant ? chatParticipant.id : "undefined"}`}>
                        <h1 className="text-lg font-semibold line-clamp-1 hover:underline cursor-pointer">
                            {chatParticipant
                                ? chatParticipant.name ?? "Unknown User"
                                : "Unknown User"}
                        </h1>
                    </Link>
                </div>

                <a
                    href={"https://en.wikipedia.org/wiki/End-to-end_encryption"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 rounded-full py-1 px-2 cursor-pointer bg-gray-200 dark:bg-zinc-600 hover:bg-gray-300 dark:hover:bg-zinc-700"
                >
                    <Lock className="h-3 w-3" />
                    <p className="text-xs font-semibold">End-to-end encrypted</p>
                </a>

                <div className="flex items-center justify-center gap-8">
                    <ChatInfoAction
                        icon={User}
                        title="Profile"
                        link={`/profile/${chatParticipant ? chatParticipant.id : "undefined"}`}
                    />
                    <ChatInfoAction
                        icon={Bell}
                        title="Mute"
                        link={`/profile/${chatParticipant ? chatParticipant.id : "undefined"}`}
                    />
                    <ChatInfoAction
                        icon={Search}
                        title="Search"
                        link={`/profile/${chatParticipant ? chatParticipant.id : "undefined"}`}
                    />
                </div>

                <div className="w-full">
                    <MoreChatInfo
                        title="Chat info"
                        childs={[{ icon: Pin, subTitle: "View pinned messages" }]}
                    />
                    <MoreChatInfo
                        title="Customise chat"
                        childs={[
                            { icon: CircleDot, subTitle: "Change theme" },
                            { icon: ThumbsUp, subTitle: "Change emoji" },
                            { icon: CaseSensitive, subTitle: "Change nickname" },
                        ]}
                        isColored={true}
                    />
                    <MoreChatInfo
                        title="Media & files"
                        childs={[
                            { icon: Images, subTitle: "Media" },
                            { icon: FileText, subTitle: "Files" },
                        ]}
                    />
                    <MoreChatInfo
                        title="Privacy & support"
                        childs={[
                            { icon: BellOff, subTitle: "Mute notifications" },
                            { icon: ClockFading, subTitle: "Disappearing messages" },
                            { icon: Eye, subTitle: "Read receipts" },
                            { icon: MessageSquareOff, subTitle: "Restrict" },
                            { icon: Ban, subTitle: "Block" },
                            { icon: TriangleAlert, subTitle: "Report" },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatInfo;
