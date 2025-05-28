// GET: list chats
// POST: create chat

import { prisma } from "@/lib/db/prismaDB";
import { getNextAuthSession } from "@/lib/nextauthSession/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getNextAuthSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id: userId } = session.user;

    try {
        const chats = await prisma.chat.findMany({
            where: {
                participants: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                participants: {
                    include: {
                        user: true,
                    },
                },
                messages: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ chats });
    } catch (error) {
        console.error("Error fetching chats: ", error);
        return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
    }
}
