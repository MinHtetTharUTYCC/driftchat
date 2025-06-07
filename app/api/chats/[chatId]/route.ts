// chat info + participants

import { prisma } from "@/lib/db/prismaDB";
import { getNextAuthSession } from "@/lib/nextauthSession/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
    const session = await getNextAuthSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { chatId } = await params;

        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
            },
            include: {
                participants: {
                    include: {
                        user: true,
                    },
                },
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });

        return NextResponse.json({ chat });
    } catch (error) {
        console.error("Error fetching single chat: ", error);
        return NextResponse.json({ error: "Failed to fetch single chat" }, { status: 500 });
    }
}
