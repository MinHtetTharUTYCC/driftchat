"use client";
import { RefreshCw, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileImage from "./components/ProfileImage";

interface ProfileData {
    name: string;
    shortIntro: string;
    image?: string | null;
}

function page() {
    const router = useRouter();

    const { userId } = useParams();

    const [profile, setProfile] = useState<ProfileData>({ name: "", shortIntro: "", image: null });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const reponse = await fetch(`/api/users/${userId}/profile`);
                if (!reponse.ok) {
                    throw new Error("Faile to fetch profile");
                }

                const data = await reponse.json();

                setProfile({
                    name: data.name,
                    shortIntro: data.shortIntro || "",
                    image: data.image,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load profile");
                setIsSubmitting(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };
    const handleImage = (url: string) => {
        setProfile((prev) => ({ ...prev, image: url }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError("");

        try {
            const reponse = await fetch(`/api/users/${userId}/profile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });
            if (!reponse.ok) {
                throw new Error("Faile to update profile");
            }
            router.back();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-8">
                <h1 className="text-lg">Loading Profile...</h1>
                <RefreshCw className="animate-spin h-8 w-8" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

            <form onSubmit={handleSubmit}>
                <ProfileImage url={profile.image} onUrlChange={handleImage} />

                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={profile.name}
                        onChange={handleChange}
                        required
                        minLength={3}
                        maxLength={30}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="shortIntro"
                        className="block text-sm font-medium text-gray-600 dark:text-gray-400  mb-1"
                    >
                        Short Introduction
                    </label>
                    <textarea
                        id="shortIntro"
                        name="shortIntro"
                        value={profile.shortIntro}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {profile.shortIntro.length}/160 characters
                    </p>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mr-3 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default page;
