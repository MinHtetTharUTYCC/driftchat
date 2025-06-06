import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";

type ImageModelProps = {
    imageUrl: string;
    altText: string;
    onClose: () => void;
};
function ImageModal({ imageUrl, altText, onClose }: ImageModelProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    const hanldeBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={hanldeBackdropClick}
        >
            <div className="relative max-w-full max-h-full">
                <div className="absolute -top-10 right-0 p-2 cursor-pointer" onClick={onClose}>
                    <X className="h-8 w-8 text-white" />
                </div>
                <div className="max-h-[100vh] max-w-[100vw] overflow-hidden rounded-2xl">
                    <Image
                        src={imageUrl}
                        alt={altText}
                        width={1200}
                        height={800}
                        className="object-contain max-h-[80vh]"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

export default ImageModal;
