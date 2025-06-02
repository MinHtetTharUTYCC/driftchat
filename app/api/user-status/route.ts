import { prisma } from "@/lib/db/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, isOnline, lastSeen } = body;

        if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

        await prisma.user.update({
            where: { id: userId },
            data: {
                isOnline,
                lastSeen: lastSeen ? new Date(lastSeen) : undefined,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updaing user status: ", error);
        return NextResponse.json({ error: "Failed to update user status" }, { status: 500 });
    }
}
