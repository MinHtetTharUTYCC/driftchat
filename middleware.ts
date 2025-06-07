import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = [
    "/",
    "/auth/signin",
    "/auth/error",
    "/api/auth", // Essential for NextAuth callbacks
    "/favicon.ico",
    "/_next",
    "/public",
];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Skip middleware for public paths and static files
    if (PUBLIC_PATHS.some((path) => pathname.startsWith(path)) || pathname.includes(".")) {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Special handling for the callback route
    if (pathname.startsWith("/api/auth/callback/email")) {
        if (token) {
            // If already logged in, redirect home
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }

    // Redirect unauthenticated users to signin
    if (!token) {
        const signInUrl = new URL("/auth/signin", req.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
    }

    // Only redirect from signin page if authenticated
    if (pathname === "/auth/signin") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}
