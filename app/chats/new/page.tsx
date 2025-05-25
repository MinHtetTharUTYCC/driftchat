import React from "react";

function NewChatPage() {
    return (
        <div className="grid gap-4 p-4">
            <div className="bg-red-200 p-2 rounded-none">none</div>
            <div className="bg-red-200 p-2 rounded-sm">sm</div>
            <div className="bg-red-200 p-2 rounded">default</div>
            <div className="bg-red-200 p-2 rounded-md">md</div>
            <div className="bg-red-200 p-2 rounded-lg">lg</div>
            <div className="bg-red-200 p-2 rounded-xl">xl</div>
            <div className="bg-red-200 p-2 rounded-full">full</div>
        </div>
    );
}

export default NewChatPage;
