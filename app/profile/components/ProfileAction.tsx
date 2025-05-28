import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function ProfileAction({
    href,
    text,
    icon: Icon,
}: {
    href: string;
    text: string;
    icon: LucideIcon;
}) {
    return (
        <Link
            href={href}
            className="mt-2 md:mt-0 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full px-4 py-2"
        >
            <Icon className="h-5 w-5" />
            {text}
        </Link>
    );
}

export default ProfileAction;
