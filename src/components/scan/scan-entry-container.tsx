"use client";

import { Field } from "../ui/field";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
    KeyboardIcon,
    ScanLineIcon,
} from "lucide-react";

import ScannerContainer from "./scanner-container";
import ManualContainer from "./manual-container";

import {
    Filament,
} from "@/lib/types";

type EntryFormatOptions =
    | "camera"
    | "manual";

type EntryModeOptions =
    | "entry"
    | "matched"
    | "unmatched";

type ScanEntryContainerProps = {
    inventory: Filament[];
};

export default function ScanEntryContainer({
    inventory,
}: ScanEntryContainerProps) {
    const [entryFormat, setEntryFormat] = useState<EntryFormatOptions>("camera");
    const [entryMode, setEntryMode] = useState<EntryModeOptions>("entry");
    const [selectedFilament, setSelectedFilament] = useState<Filament | null>(null);
    const [newFilamentId, setNewFilamentId] = useState("");

    function handleFilamentIdSubmit(
        filamentId: string
    ) {
        const existingFilament =
            inventory.find(
                (item) =>
                    item.id === filamentId
            );

        if (existingFilament) {
            setSelectedFilament(existingFilament);
            setNewFilamentId("");
            setEntryMode("matched")
            return;
        }

        setSelectedFilament(null);
        setNewFilamentId(filamentId);
        setEntryMode("unmatched");
    }

    if (entryMode === "entry")
        return (
            <div className="flex w-full flex-col items-center justify-center gap-12">

                <Field>
                    <ToggleGroup
                        type="single"
                        value={entryFormat}
                        onValueChange={(value: EntryFormatOptions) =>
                            setEntryFormat(value)
                        }
                        variant="default"
                        spacing={0}
                        size="lg"
                        className="rounded-lg bg-card p-4"
                    >
                        <ToggleGroupItem
                            value="camera"
                            className="rounded-lg py-6"
                        >
                            <div className="flex flex-row items-center justify-center gap-3 px-3 py-4 text-xl">
                                <ScanLineIcon size={16} />
                                <span>
                                    Camera
                                </span>
                            </div>
                        </ToggleGroupItem>

                        <ToggleGroupItem
                            value="manual"
                            className="rounded-lg py-6"
                        >
                            <div className="flex flex-row items-center justify-center gap-3 px-3 py-4 text-xl">
                                <KeyboardIcon size={16} />
                                <span>
                                    Manual
                                </span>
                            </div>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </Field>

                <div className="aspect-square max-w-76">

                    {entryFormat === "camera" ? (
                        <ScannerContainer onFilamentIdSubmit={handleFilamentIdSubmit} />
                    ) : (
                        <ManualContainer onFilamentIdSubmit={handleFilamentIdSubmit} />
                    )}

                </div>
            </div>
        );

    if (entryMode === "matched")
        return (
            <div className="flex w-full flex-col items-center justify-center gap-12">
                <span>{selectedFilament?.id}</span>
            </div>
        );

    if (entryMode === "unmatched")
        return (
            <div className="flex w-full flex-col items-center justify-center gap-12">
                <span>{newFilamentId}</span>
            </div>
        );

    return null;
}