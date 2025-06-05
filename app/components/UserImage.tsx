import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

function UserImage({ image }: { image?: string | null }) {
    return (
        <div className="w-10 h-10 mx-auto relative flex items-center justify-center">
            {!image ? (
                <div
                    className="w-10 h-10 flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-700 
                                                            border-2 border-teal-500"
                >
                    <User className="h-full w-full text-gray-600 dark:text-gray-300" />
                </div>
            ) : (
                <Image
                    src={image}
                    height={40}
                    width={40}
                    alt="My Profile"
                    className="rounded-full object-cover w-full h-full border-2 border-teal-500"
                />
            )}
        </div>
    );
}

export default UserImage;
