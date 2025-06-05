"use client";
import React, { useMemo } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import MainHeader from "./components/MainHeader";
import { usePathname } from "next/navigation";
import BackHeader from "./components/BackHeader";

export default function ClientLayout({
    children,
    userId,
    name,
    image,
}: {
    children: React.ReactNode;
    userId: string;
    name?: string | null;
    image?: string | null;
}) {
    const pathname = usePathname();

    const hideHeader = useAuthStore((state) => state.hideHeader);

    const showMainNav = useMemo(() => {
        return !pathname.startsWith("/profile");
    }, [pathname]);

    const showBackNav = useMemo(() => {
        return pathname.startsWith("/profile");
    }, [pathname]);

    return (
        <div className="flex flex-col h-full">
            <div className="hidden md:block">
                <MainHeader userId={userId} name={name} image={image} />
            </div>

            {/* MainHeader on mobile only if NOT hideHeader and showMainNav */}
            {!hideHeader && showMainNav && (
                <div className="md:hidden">
                    <MainHeader userId={userId} name={name} image={image} />
                </div>
            )}

            {/* BackHeader on mobile only if showBackNav */}
            {showBackNav && (
                <div className="md:hidden">
                    <BackHeader />
                </div>
            )}
            <div className="flex-1 min-h-0">{children}</div>
        </div>
    );
}
