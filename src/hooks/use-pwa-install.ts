"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
    }>;
};

export function usePwaInstall() {
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        function handleBeforeInstallPrompt(event: Event) {
            event.preventDefault();

            setInstallPrompt(event as BeforeInstallPromptEvent);
        }

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    async function install() {
        if (!installPrompt) return;

        await installPrompt.prompt();

        const result = await installPrompt.userChoice;

        if (result.outcome === "accepted") {
            setInstallPrompt(null);
        }
    }

    return {
        install,
        canInstall: !!installPrompt,
    };
}