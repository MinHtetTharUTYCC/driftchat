import { prisma } from "@/lib/db/prismaDB";
import { getNextAuthSession } from "@/lib/nextauthSession/session";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getNextAuthSession();
    if (!session) {
        redirect("/auth/signin");
    }
    const { id: userId } = session.user;

    const lastMessage = await prisma.message.findFirst({
        where: {
            chat: {
                participants: {
                    some: {
                        userId: userId,
                    },
                },
            },
        },

        orderBy: { createdAt: "desc" },
        select: {
            chatId: true,
        },
    });

    if (lastMessage) {
        redirect(`/chats?chatId=${lastMessage.chatId}`);
    } else {
        redirect("/chats/fresh-new");
    }
}
