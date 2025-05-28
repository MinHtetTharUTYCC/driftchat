import React from "react";
import Conversation from "./Conversation";

const conversations = [
    { id: "1", name: "Min Htet Thar", msg: "Yes, i got it" },
    { id: "2", name: "Ei Ei Chaw Ou", msg: "Thank you" },
];

function ConversationList() {
    return (
        <div className="mt-2 flex-1 overflow-y-auto">
            {conversations.map((conver) => (
                <Conversation key={conver.id} conver={conver} />
            ))}
            {conversations.map((conver) => (
                <Conversation key={conver.id} conver={conver} />
            ))}
            {conversations.map((conver) => (
                <Conversation key={conver.id} conver={conver} />
            ))}
            {conversations.map((conver) => (
                <Conversation key={conver.id} conver={conver} />
            ))}
            {conversations.map((conver) => (
                <Conversation key={conver.id} conver={conver} />
            ))}
            {conversations.map((conver) => (
                <Conversation key={conver.id} conver={conver} />
            ))}
            {conversations.map((conver) => (
                <Conversation key={conver.id} conver={conver} />
            ))}
        </div>
    );
}

export default ConversationList;
