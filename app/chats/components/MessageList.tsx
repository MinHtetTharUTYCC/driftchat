import React from "react";
import Message from "./Message";

const mockMessages = [
    {
        id: "1",
        content: "Hello,How can i help you today?",
        role: "sender",
        timeStamp: new Date(Date.now() - 3600000),
    },
    {
        id: "2",
        content: "Hi, nice to meet you.",
        role: "viewer",
        timeStamp: new Date(Date.now() - 1800000),
    },
];

function MessageList() {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
            {mockMessages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
            {mockMessages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
            {mockMessages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
            {mockMessages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
}

export default MessageList;
