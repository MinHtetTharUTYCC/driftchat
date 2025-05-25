"use client";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import React from "react";

function MobileHeader() {
    const toggleMobile = () => {};
    return (
        <div className="md:hidden flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <Button variant={"ghost"} size={"icon"} onClick={toggleMobile}>
                <MenuIcon className="h-5 w-5" />
            </Button>
            <h1 className="ml-4 text-xl font-semibold">DriftChat</h1>
        </div>
    );
}

export default MobileHeader;
