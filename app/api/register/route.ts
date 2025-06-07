import { prisma } from "@/lib/db/prismaDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const { email, password, name } = await req.json();

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) return NextResponse.json({ error: "User already exists!" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
        },
    });

    return NextResponse.json({ success: true, user });
}
