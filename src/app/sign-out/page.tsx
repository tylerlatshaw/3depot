"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignOutPage() {
    const router = useRouter();

    useEffect(() => {
        async function logout() {
            try {
                // 1. Sign out from Firebase (client)
                await signOut(auth);

                // 2. Clear session cookie (server)
                await fetch("/api/auth/logout", {
                    method: "POST",
                });
            } catch (err) {
                console.error("Logout error:", err);
            } finally {
                // 3. Redirect
                router.replace("/sign-in");
            }
        }

        logout();
    }, [router]);

    return (
        <main style={{ padding: 24 }}>
            <h1>Logging you out...</h1>
            <p>If this takes longer than expected, something is cursed.</p>
        </main>
    );
}