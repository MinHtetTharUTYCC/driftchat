import { prisma } from "@/lib/db/prismaDB";
import { getNextAuthSession } from "@/lib/nextauthSession/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await getNextAuthSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const chats = await prisma.chat.findMany({
            where: {
                participants: {
                    some: {
                        userId: session.user.id,
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

        const chatsWithLatestMessage = chats.map((chat) => ({
            ...chat,
            latestMessage: chat.messages[0],
        }));

        return NextResponse.json({ chatsWithLatestMessage });
    } catch (error) {
        console.error("Error fetching chats: ", error);
        return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
    }
}

// Create new Chat
export async function POST(req: NextRequest) {
    const session = await getNextAuthSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { participantId } = await req.json();

    try {
        const newChat = await prisma.chat.create({
            data: {
                participants: {
                    create: [{ userId: session.user.id }, { userId: participantId }],
                },
            },
            include: {
                participants: true,
            },
        });

        return NextResponse.json(newChat);
    } catch (error) {
        console.error("Error creating chat:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
