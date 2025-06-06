"use client";
import ImageModal from "@/app/components/ImageModal";
import Image from "next/image";
import React, { useState } from "react";

function ImageToModal({ imgUrl }: { imgUrl: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Image
                src={imgUrl}
                height={128}
                width={128}
                alt="User Profile Image"
                className="rounded-full object-cover w-full h-full border-2 border-teal-500 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            />
            {isModalOpen && (
                <ImageModal imageUrl={imgUrl} altText="Enlarged View" onClose={closeModel} />
            )}
        </>
    );
}

export default ImageToModal;
