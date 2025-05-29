import { Chat, ChatParticipant, Message, User } from "@prisma/client";

declare type ExtendedChatParticipant = ChatParticipant & {
    user: User;
};

declare type ExtendedChat = Chat & {
    participants: ExtendedChatParticipant[];
    messages: Message[];
};
declare type ConversationListProps = {
    chats: ExtendedChat[];
    onChatClick: (chatId: string) => void;
};
