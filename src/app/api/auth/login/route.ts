import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
    const { idToken } = await req.json();

    if (!idToken) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    try {
        // Verify token with Firebase Admin
        const decoded = await adminAuth.verifyIdToken(idToken);

        // Create session cookie (more secure than storing raw token)
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn,
        });

        const cookieStore = await cookies();

        cookieStore.set("session", sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: expiresIn / 1000,
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}