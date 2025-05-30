import { Chat, ChatParticipant, Message, User } from "@prisma/client";

declare type ExtendedChatParticipant = ChatParticipant & {
    user: User;
};

declare type ExtendedChat = Chat & {
    participants: ExtendedChatParticipant[];
    messages: Message[];
};
declare type ConversationListProps = {
    chatsWithLatestMessage: ChatWithLatestMessage[];
    onChatClick: (chatId: string) => void;
};

// for sidebar
declare type ChatWithLatestMessage = Chat & {
    participants: ExtendedChatParticipant[];
    messages: Message[];
    latestMessage?: Message | null;
};
