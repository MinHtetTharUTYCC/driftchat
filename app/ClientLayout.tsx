"use client";
import React from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import MainHeader from "./components/MainHeader";

export default function ClientLayout({
    children,
    userId,
    name,
}: {
    children: React.ReactNode;
    userId: string;
    name?: string | null;
}) {
    const hideHeader = useAuthStore((state) => state.hideHeader);

    return (
        <div className="flex flex-col h-full">
            {!hideHeader && <MainHeader userId={userId} name={name} />}
            <div className="flex-1 min-h-0">{children}</div>
        </div>
    );
}
