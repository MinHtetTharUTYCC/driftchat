import { prisma } from "@/lib/db/prismaDB";
import { getNextAuthSession } from "@/lib/nextauthSession/session";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
//     const session = await getNextAuthSession();
//     if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { chatId } = await params;

//     const messages = await prisma.message.findMany({
//         where: { chatId: chatId },
//         orderBy: { createdAt: "asc" },
//         include: { sender: true },
//     });

//     return NextResponse.json({ messages });
// }

export async function POST(req: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
    const session = await getNextAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { chatId } = await params;
    const { content } = await req.json();

    if (!content || typeof content !== "string")
        return NextResponse.json({ error: "Message content required" }, { status: 400 });

    // Ensure user is participant of the chata
    const isParticipant = await prisma.chatParticipant.findFirst({
        where: {
            chatId,
            userId: session.user.id,
        },
    });

    if (!isParticipant) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const newMessage = await prisma.message.create({
        data: {
            chatId,
            senderId: session?.user.id,
            content,
        },
    });

    return NextResponse.json({ newMessage });
}
