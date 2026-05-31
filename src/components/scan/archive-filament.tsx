// components/scan/archive-filament.tsx

"use client";

import { EntryModeOptions, Filament } from "@/lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import {
    ArchiveIcon,
    ArrowRightIcon,
    TriangleAlertIcon,
    Undo2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";
import FilamentProgressCard from "../dashboard/filament-progress-card";

type Props = {
    selectedFilament: Filament;
    setEntryMode: Dispatch<SetStateAction<EntryModeOptions>>;
};

export default function ArchiveFilament({
    selectedFilament,
    setEntryMode,
}: Props) {
    const [loading, setLoading] = useState(false);

    async function handleArchive() {
        try {
            setLoading(true);

            const response = await fetch("/api/delete-filament", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    filamentId: selectedFilament.uuid,
                    notes: "Archived from scan flow",
                }),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error);
            }

            showToast({
                message: `${selectedFilament.id} archived`,
                variant: "success",
            });

            setEntryMode("entry");
        } catch (error) {
            console.error(error);

            showToast({
                message: "Failed to archive filament",
                variant: "danger",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex w-4xl flex-col items-center justify-center gap-8">
            <div
                className="w-2xl rounded-lg border-t-8 bg-card p-6"
                style={{
                    borderColor: selectedFilament.colorCode,
                }}
            >
                <FilamentProgressCard inventory={selectedFilament} />
            </div>

            <div className="flex w-lg flex-col gap-6 rounded-xl border border-danger bg-danger/10 p-6">
                <div className="flex flex-row items-center gap-4 text-danger">
                    <TriangleAlertIcon className="size-16" />

                    <div className="flex flex-col">
                        <span className="text-xl font-bold">
                            Archive this filament?
                        </span>

                        <span className="text-sm font-light text-foreground">
                            This will archive the selected filament and hide it from inventory. It can still be accessed by ID.
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg bg-background/50 p-4">
                    <span className="text-sm font-light uppercase">
                        Spool ID:
                    </span>

                    <span className="text-lg font-bold tracking-widest">
                        {selectedFilament.id}
                    </span>
                </div>

                <div className="flex flex-row items-center justify-between gap-4">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setEntryMode("entry")}
                        disabled={loading}
                        className="bg-background/80 hover:bg-foreground/20"
                    >
                        <Undo2Icon />
                        <span>Reset</span>
                    </Button>

                    <Button
                        size="lg"
                        variant="danger"
                        onClick={handleArchive}
                        disabled={loading}
                    >
                        <ArchiveIcon />
                        <span>
                            {loading ? "Archiving..." : "Archive Spool"}
                        </span>
                        {!loading && <ArrowRightIcon />}
                    </Button>
                </div>
            </div>
        </div>
    );
}