import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db/prismaDB";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/auth/signin",
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password)
                    throw new Error("Email and password are required!");

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user || !user.hashedPassword)
                    throw new Error("No account found with this email!");

                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!isValid) throw new Error("Incorrect Password!");

                return user;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
};
