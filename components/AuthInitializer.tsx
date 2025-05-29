"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/lib/store/useAuthStore";

function AuthInitializer() {
    const { data: session, status } = useSession();
    const setUserId = useAuthStore((state) => state.setUserId);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.id) {
            setUserId(session.user.id);
        }
    }, [status, session, setUserId]);

    return null; //no UI
}

export default AuthInitializer;
