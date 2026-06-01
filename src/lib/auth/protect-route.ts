import { adminAuth } from "@/lib/firebase-admin";
import { NextRequest } from "next/server";

export async function protectRoute(
    request: NextRequest
): Promise<boolean> {
    const authHeader = request.headers.get("authorization");

    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
        return false;
    }

    try {
        const decodedToken =
            await adminAuth.verifyIdToken(token);

        return (
            decodedToken.uid ===
            process.env.ALLOWED_FIREBASE_UID
        );
    } catch {
        return false;
    }
}