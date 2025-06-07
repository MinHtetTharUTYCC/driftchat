"use client";

import { Camera, Loader2, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ProfileImage({
    url,
    onUrlChange,
    onUploading,
}: {
    url?: string | null;
    onUrlChange: (url: string) => void;
    onUploading: (isUploading: boolean) => void;
}) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async (file: File) => {
        console.log(file.type);
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file");
            return;
        }
        const MAX_SIZE = 5 * 1024 * 1024; //5MB
        if (file.size > MAX_SIZE) {
            setError("File size must be less than 5 MB");
            return;
        }
        try {
            setIsUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/cloudinary/profile-images", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || `Upload failed: ${res.statusText}`);
            }

            const data = await res.json();
            onUrlChange(data.url);
        } catch (err) {
            console.error("Upload process failed:", err);
            setError(err instanceof Error ? err.message : "Upload failed.Please try again later.");
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        onUploading(isUploading);
    }, [isUploading, onUploading]);

    return (
        <div className="w-fit mx-auto mb-4">
            <div className="w-32 h-32 mx-auto relative flex items-center justify-center">
                {!url ? (
                    <div
                        className="w-32 h-32 flex items-center justify-center p-2 rounded-full bg-gray-300 dark:bg-gray-700 
                    border-2 border-teal-500"
                    >
                        <User className="h-full w-full text-gray-600 dark:text-gray-300" />
                    </div>
                ) : (
                    <Image
                        src={url}
                        height={128}
                        width={128}
                        alt="User Profile"
                        className="rounded-full object-cover w-full h-full border-2 border-teal-500"
                    />
                )}

                <label className="absolute -bottom-1 -right-1 p-2 bg-stone-300 dark:bg-stone-400 hover:bg-stone-400 dark:hover:bg-stone-500 rounded-full cursor-pointer ">
                    <input
                        type="file"
                        accept="image/png, image/jpeg,image/jpg, image/webp"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                handleUpload(e.target.files?.[0]);
                                e.target.value = ""; //reset in case if reupload
                            }
                        }}
                        className="hidden"
                        disabled={isUploading}
                    />
                    {isUploading ? (
                        <Loader2 className="animate-spin w-8 h-8" />
                    ) : (
                        <Camera className="h-8 w-8" />
                    )}
                </label>
            </div>

            {error && (
                <p className="mt-4 text-sm text-center text-red-500 dark:text-red-400">{error}</p>
            )}
        </div>
    );
}

export default ProfileImage;
