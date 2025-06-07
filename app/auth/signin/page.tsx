"use client";
import { CircleCheck, MailOpen } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

function MySignInPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await signIn("email", {
                email,
                callbackUrl: "/",
                redirect: false,
            });

            if (response?.error) {
                throw new Error(response.error);
            }

            setIsSubmitted(true);
        } catch (err) {
            console.error("Sign in error:", err);
            setError(err instanceof Error ? err.message : "Failed to send magic link");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex items-center justify-center p-4 md:p-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 space-y-8 border border-gray-100 dark:border-gray-700 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
                {!isSubmitted ? (
                    <>
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 mb-4">
                                <MailOpen className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                                DriftChat
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Sign in with your email.
                            </p>
                        </div>
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="email"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg transition duration-300 ease-in-out"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Sending..." : "Get Sign-in Link"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center space-y-5">
                        <CircleCheck className="mx-auto h-16 w-16 text-green-500" />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Email Sent!
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            We've sent a verification link to{" "}
                            <span className="font-extrabold text-teal-600 dark:text-teal-400">
                                {email}
                            </span>
                            .
                            <br />
                            Please check your inbox and click the link to complete your sign-in.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
                            (Don't forget to check your spam folder!)
                        </p>
                        <button
                            onClick={() => {
                                setEmail("");
                                setIsSubmitted(false);
                            }}
                            className="mt-4 text-teal-600 dark:text-teal-400 hover:underline"
                        >
                            Send another link
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MySignInPage;
