"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
    const router = useRouter();

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

    return (
        <Button
            variant="outline"
            size="icon"
            className="hover:bg-foreground/20"
            onClick={() => logout()}
        >
            <LogOutIcon />
        </Button>
    );
}