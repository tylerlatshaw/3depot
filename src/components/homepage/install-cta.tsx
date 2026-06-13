"use client";

import { CircleCheckBigIcon, DownloadIcon, MonitorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePwaInstall } from "@/hooks/use-pwa-install";

export default function InstallCTA() {
    const { install, canInstall } = usePwaInstall();

    if (!canInstall) {
        return null;
    }

    return (<div className="hidden md:flex flex-col items-center justify-center gap-24 w-full">
        <hr className="border border-accent/50 w-full" />

        <div className="flex flex-row items-center justify-between bg-info/10 border border-info rounded-xl w-full px-16 py-12">
            <div className="flex flex-col items-start gap-3 w-md">
                <div className="flex flex-row items-center justify-center gap-2 text-info font-semibold text-lg">
                    <MonitorIcon className="size-6" />
                    <span>Desktop App</span>
                </div>

                <span className="text-xl font-bold">Install 3Depot on Your Computer</span>

                <span className="text-base text-muted-foreground">
                    Opens like a native app and syncs directly to the cloud. <br />No download required - just click install.
                </span>

                <div className="flex flex-row items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex flex-row items-center gap-2">
                        <CircleCheckBigIcon className="text-success" size={16} />
                        Native feel
                    </span>

                    <span className="flex flex-row items-center gap-2">
                        <CircleCheckBigIcon className="text-success" size={16} />
                        Free to use
                    </span>

                    <span className="flex flex-row items-center gap-2">
                        <CircleCheckBigIcon className="text-success" size={16} />
                        Available on mobile
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
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

                <span className="text-sm font-light text-muted-foreground">Available in Chrome and Edge</span>
            </div>
        </div>
    </div>);
}