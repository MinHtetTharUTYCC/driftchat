import NextAuth, { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db/prismaDB";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/auth/signin",
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            from: process.env.EMAIL_FROM || "onboarding@resend.dev",
            sendVerificationRequest: async ({ identifier, url }) => {
                const { error } = await resend.emails.send({
                    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
                    to: identifier,
                    subject: "Sign in to DriftChat",
                    html: `<p>Click <a href="${url}">here</a> to sign in.</p>
                 <p>This link will expire in 10 minutes.</p>`,
                });
                if (error) {
                    console.error("Resend error: ", error.message);
                    throw new Error(error.message);
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Handle relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allow same origin URLs
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
