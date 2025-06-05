import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

interface UploadResult {
    url: string;
    public_id: string;
}

export async function uploadImage(imageFile: File): Promise<UploadResult> {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder: "/driftchat/profile",
                    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
                    allowed_formats: ["jpg", "jpeg", "png", "webp"],
                    transformation: [{ quality: "auto", fetch_format: "auto" }],
                },
                (error, result) => {
                    if (error) {
                        console.error("Upload error:", error);
                        reject(new Error("Image upload failed"));
                        return;
                    }
                    if (!result) {
                        reject(new Error("No result from Cloudinary"));
                        return;
                    }
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id,
                    });
                }
            )
            .end(buffer);
    });
}

export async function deleteImage(public_id: string) {
    return cloudinary.uploader.destroy(public_id);
}
