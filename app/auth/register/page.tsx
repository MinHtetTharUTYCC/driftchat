"use client";
import { MailOpen } from "lucide-react";
import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(30, { message: "Name must be less then 30 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(30, { message: "Password must be less then 30 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

function RegisterPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", password: "" },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log(data);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errData = await res.json();
                toast.error(errData.error || "Failed to register");
                return;
            }

            // auto-signin
            const signInRes = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (signInRes?.error) {
                toast.error(signInRes.error);
            } else {
                toast.success("Signed in successfully");
                router.push("/");
            }
        } catch (error) {
            console.error("Error register: ", error);
            toast.error("Something went wrong.");
        }
    };
    return (
        <div className="h-full flex items-center justify-center p-4 md:p-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 space-y-8 border border-gray-100 dark:border-gray-700 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 mb-4">
                        <MailOpen className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                        DriftChat
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Sign up with your email
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name")}
                            className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg transition duration-300 ease-in-out"
                        />
                        {errors.name && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 px-4 py-1 rounded-lg">
                                {errors.name.message}
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <input
                            type="email"
                            placeholder="hello@example.com"
                            {...register("email")}
                            className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg transition duration-300 ease-in-out"
                        />
                        {errors.email && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 px-4 py-1 rounded-lg">
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                            className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg transition duration-300 ease-in-out"
                        />
                        {errors.password && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 px-4 py-1 rounded-lg">
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "..." : "Register"}
                    </button>
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                        Already have an account?{" "}
                        <a
                            href="/auth/signin"
                            className="text-teal-600 dark:text-teal-400 font-medium hover:underline hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200"
                        >
                            Sign In
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;

{
    /* <div className="text-center space-y-5">
    <CircleCheck className="mx-auto h-16 w-16 text-green-500" />
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Email Sent!</h2>
    <p className="text-lg text-gray-700 dark:text-gray-300">
        We've sent a verification link to{" "}
        <span className="font-extrabold text-teal-600 dark:text-teal-400">{email}</span>
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
</div>; */
}
