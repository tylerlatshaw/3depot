import { adminAuth } from "@/lib/firebase-admin";
import { NextRequest } from "next/server";

export async function requireUser(request: NextRequest) {
    const authHeader = request.headers.get("authorization");

    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
        throw new Error("Unauthorized");
    }

    const decodedToken = await adminAuth.verifyIdToken(token);

    if (decodedToken.uid !== process.env.ALLOWED_FIREBASE_UID) {
        throw new Error("Forbidden");
    }

    return decodedToken;
}