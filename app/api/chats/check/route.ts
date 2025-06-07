import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prismaDB";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    try {
        const chat = await prisma.chat.findFirst({
            where: {
                participants: {
                    every: {
                        userId: {
                            in: [session.user.id, userId],
                        },
                    },
                },
            },
        });

        return NextResponse.json({ exists: !!chat, chatId: chat?.id || null });
    } catch (error) {
        console.error("Error checking chat:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
