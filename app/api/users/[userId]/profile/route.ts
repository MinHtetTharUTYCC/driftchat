import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prismaDB";
import { getNextAuthSession } from "@/lib/nextauthSession/session";
import { getServerSession } from "next-auth";
import { Autour_One } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getNextAuthSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(session.user.id);

    try {
        const userProfile = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { name: true, shortIntro: true, image: true },
        });

        return NextResponse.json(userProfile);
    } catch (error) {
        console.error("Error fetching user profile", error);
        NextResponse.json({ error: "Error fetching user profile" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getNextAuthSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, shortIntro, image } = await req.json();

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { name, shortIntro, image },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating user profile", error);
        NextResponse.json({ error: "Error updating user profile" }, { status: 500 });
    }
}
