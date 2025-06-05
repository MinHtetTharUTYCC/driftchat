import { uploadImage } from "@/lib/cloudinary/cloud";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const data = await uploadImage(file);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Upload to cloudinary failed: ", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
