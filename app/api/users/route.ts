import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prismaDB";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    const allUsers = await prisma.user.findMany({
        where: { NOT: { id: session?.user?.id } },
    });

    return NextResponse.json({ allUsers });
}
