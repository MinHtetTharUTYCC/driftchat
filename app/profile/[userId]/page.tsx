import React from "react";
import { prisma } from "@/lib/db/prismaDB";
import { Ban, Pencil, User } from "lucide-react";
import { getServerSession } from "next-auth";
import ProfileAction from "../components/ProfileAction";
import ProfileActionMessage from "../components/ProfileActionMessage";
import ImageToModal from "./edit/components/ImageToModal";
import { authOptions } from "@/lib/authOptions";

async function ProfilePage({ params }: { params: { userId: string } }) {
    const { userId } = params;
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user)
        return (
            <div className="text-center h-full flex flex-col items-center justify-center gap-2">
                <Ban className="h-10 w-10" />
                <h1 className="font-semibold text-xl">User Not Found</h1>
            </div>
        );

    const isOwnPrifile = session?.user?.id === userId;

    return (
        <div className="max-w-3xl mx-auto p-4  dark:bg-zinc-800 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center border-b border-gray-200 dark:border-gray-500 pb-2">
                <div className="flex-1 flex items-center gap-4">
                    <div className="w-16 h-16 mx-auto relative flex items-center justify-center">
                        {!user.image ? (
                            <div
                                className="w-full h-full flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-700 
                                        border-2 border-teal-500"
                            >
                                <User className="h-full w-full text-gray-600 dark:text-gray-300" />
                            </div>
                        ) : (
                            <ImageToModal imgUrl={user.image} />
                        )}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold">{user.name ?? "Unknown User"}</h1>
                        <p className="text-md text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                </div>

                {isOwnPrifile ? (
                    <ProfileAction
                        href={`/profile/${userId}/edit`}
                        text="Edit Profile"
                        icon={Pencil}
                    />
                ) : (
                    <ProfileActionMessage userId={userId} />
                )}
            </div>

            <h1 className="font-bold text-lg ml-4 mt-4 ">Intro</h1>
            <div className="mx-4 mt-1 mb-4 p-4 border-2 border-gray-200 dark:border-gray-500 rounded-xl">
                <p className="text-center italic">{user.shortIntro || "Not set yet"} </p>
            </div>
        </div>
    );
}

export default ProfilePage;
