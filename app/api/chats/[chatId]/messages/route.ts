// GET: all messages in the chat
// POST: a new  message to the chat

import { prisma } from "@/lib/db/prismaDB";
import { getNextAuthSession } from "@/lib/nextauthSession/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { chatId: string } }) {
    const session = await getNextAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { chatId } = params;

    const messages = await prisma.message.findMany({
        where: { chatId: chatId },
        orderBy: { createdAt: "asc" },
        include: { sender: true },
    });

    return NextResponse.json({ messages });
}

export async function POST(req: NextRequest, { params }: { params: { chatId: string } }) {
    const session = await getNextAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { chatId } = params;
    const { content } = await req.json();

    if (!content) return NextResponse.json({ error: "Message content required" }, { status: 400 });

    const message = await prisma.message.create({
        data: {
            content,
            chatId,
            senderId: session.user.id,
        },
    });

    return NextResponse.json({ message });
}
