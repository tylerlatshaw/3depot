"use client";

import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePwaInstall } from "@/hooks/use-pwa-install";

export default function InstallAppButton() {
    const { install, canInstall } = usePwaInstall();

    if (!canInstall) {
        return null;
    }

    return (<>
        <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex flex-row items-center justify-center gap-2 border-warning text-warning font-bold bg-warning/10 hover:bg-warning/30"
            onClick={install}
        >
            <DownloadIcon />
            <span>Install App</span>
            <span className="bg-warning/75 text-foreground px-2 py-1 text-xs uppercase rounded-md">
                Free
            </span>
        </Button>
    </>);
}