import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prismaDB";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);

    const allUsers = await prisma.user.findMany({
        where: { NOT: { id: session?.user?.id } },
    });

    return NextResponse.json({ allUsers });
}
