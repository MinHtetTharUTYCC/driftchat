import { User } from "lucide-react";
import React from "react";

function MainHeader() {
    return (
        <div className="h-30 flex items-center justify-between px-4 py-2 shadow-lg bg-gray-200 z-50">
            <h1 className="text-2xl font-bold">DriftChat</h1>
            <User className="h-6 w-6" />
        </div>
    );
}

export default MainHeader;
