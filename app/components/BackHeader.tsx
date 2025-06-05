"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackHeader() {
    const router = useRouter();
    return (
        <div
            className="h-14 flex items-center px-4 py-2 shadow-lg bg-light-background dark:bg-dark-background z-50"
            onClick={() => router.back()}
        >
            <ArrowLeft className="h-6 w-6" />
        </div>
    );
}

export default BackHeader;
