"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleGoogleLogin() {
        setLoading(true);
        setError("");

        try {
            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                await signOut(auth);
                setError("That Google account is not allowed.");
                return;
            }

            window.location.href = "/dashboard";
        } catch (err: unknown) {
            console.error("Google login error:", err);

            const firebaseError = err as { code?: string; message?: string };

            switch (firebaseError.code) {
                case "auth/admin-restricted-operation":
                    setError(
                        "This account can’t sign in because new Firebase users are currently disabled. If this app is locked to you only, make sure your account already exists in Firebase Auth."
                    );
                    break;

                case "auth/popup-closed-by-user":
                    setError("Sign-in popup was closed before completing login.");
                    break;

                case "auth/popup-blocked":
                    setError("Your browser blocked the Google sign-in popup.");
                    break;

                case "auth/cancelled-popup-request":
                    setError("Another sign-in popup was already in progress.");
                    break;

                default:
                    setError("Google sign-in failed. Please try again.");
                    break;
            }

            try {
                await signOut(auth);
            } catch {
                // ignore cleanup failure
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main style={{ padding: 24, maxWidth: 480 }}>
            <h1>Sign in</h1>

            <Button onClick={handleGoogleLogin} disabled={loading} className="logo">
                {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            {error ? (
                <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>
            ) : null}
        </main>
    );
}