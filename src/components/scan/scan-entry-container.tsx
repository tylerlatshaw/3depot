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
import ActionSelector from "./action-selector";

import {
    EntryFormatOptions,
    EntryModeOptions,
    Filament,
    FormActions,
} from "@/lib/types";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import LogWeight from "./log-weight";
import AddEditContainer from "./add-edit-form/add-edit-container";
import HistoryTable from "./history-table";
import ArchiveFilament from "./archive-filament";
import { SetPageTitle } from "../global/set-page-title";

type Props = {
    inventory: Filament[];
};

const validActions: FormActions[] = [
    "logweight",
    "changeinfo",
    "history",
    "archive",
];

export default function ScanEntryContainer({ inventory }: Props) {
    const params = useSearchParams();

    const idParam = params.get("id");
    const actionParam = params.get("action");

    const initialAction: FormActions | null =
        actionParam && validActions.includes(actionParam as FormActions)
            ? (actionParam as FormActions)
            : null;

    const initialSelectedFilament =
        idParam
            ? inventory.find((item) => item.id === idParam) ?? null
            : null;

    const initialEntryMode: EntryModeOptions =
        idParam
            ? initialSelectedFilament
                ? "matched"
                : "unmatched"
            : "entry";

    const [entryFormat, setEntryFormat] =
        useState<EntryFormatOptions>(() => {
            if (typeof window === "undefined") {
                return "manual";
            }

            return window.matchMedia("(max-width: 1024px)").matches
                ? "camera"
                : "manual";
        });

    const [entryMode, setEntryMode] =
        useState<EntryModeOptions>(initialEntryMode);

    const [selectedFilament, setSelectedFilament] =
        useState<Filament | null>(initialSelectedFilament);

    const [newFilamentId, setNewFilamentId] =
        useState(idParam && !initialSelectedFilament ? idParam : "");

    const [selectedAction, setSelectedAction] =
        useState<FormActions | null>(initialAction);

    function handleFilamentIdSubmit(filamentId: string) {
        const existingFilament = inventory.find(
            (item) => item.id === filamentId
        );

        setSelectedAction(null);

        if (existingFilament) {
            setSelectedFilament(existingFilament);
            setNewFilamentId("");
            setEntryMode("matched");
            return;
        }

        setSelectedFilament(null);
        setNewFilamentId(filamentId);
        setEntryMode("unmatched");
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={entryMode}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col items-center w-full h-full py-8 md:py-0"
            >
                {entryMode === "entry" && (
                    <div className="flex flex-col items-center justify-start md:justify-center w-full h-full gap-12">
                        <SetPageTitle title="Scan" />

                        <Field>
                            <ToggleGroup
                                type="single"
                                value={entryFormat}
                                onValueChange={(value: EntryFormatOptions) => {
                                    if (value) setEntryFormat(value);
                                }}
                                variant="default"
                                spacing={0}
                                size="lg"
                                className="rounded-lg bg-card p-4"
                            >
                                <ToggleGroupItem
                                    value="camera"
                                    className="rounded-none rounded-l-lg py-6"
                                >
                                    <div className="flex flex-row items-center justify-center gap-3 px-3 py-4 text-xl">
                                        <ScanLineIcon size={16} />
                                        <span>Camera</span>
                                    </div>
                                </ToggleGroupItem>

                                <ToggleGroupItem
                                    value="manual"
                                    className="rounded-none rounded-r-lg py-6"
                                >
                                    <div className="flex flex-row items-center justify-center gap-3 px-3 py-4 text-xl">
                                        <KeyboardIcon size={16} />
                                        <span>Manual</span>
                                    </div>
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </Field>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={entryFormat}
                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                <div className="aspect-square min-h-[345px] max-w-76">
                                    {entryFormat === "camera" ? (
                                        <ScannerContainer
                                            onFilamentIdSubmit={handleFilamentIdSubmit}
                                        />
                                    ) : (
                                        <ManualContainer
                                            onFilamentIdSubmit={handleFilamentIdSubmit}
                                        />
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {entryMode === "matched" && selectedFilament && (
                    <div className="flex flex-col h-full w-full gap-4 md:gap-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedAction ?? "actionSelector"}
                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="flex h-full w-full"
                            >
                                {!selectedAction && (
                                    <div className="flex flex-col items-center justify-start md:justify-center w-full h-full">
                                        <ActionSelector
                                            selectedFilament={selectedFilament}
                                            setEntryMode={setEntryMode}
                                            selectedAction={selectedAction}
                                            setSelectedAction={setSelectedAction}
                                        />
                                    </div>
                                )}

                                {selectedAction?.toLowerCase() === "logweight" && (
                                    <div className="flex flex-col items-center justify-start md:justify-center w-full h-full">
                                        <LogWeight
                                            selectedFilament={selectedFilament}
                                            setEntryMode={setEntryMode}
                                        />
                                    </div>
                                )}

                                {selectedAction?.toLowerCase() === "history" && (
                                    <div className="flex flex-col items-center justify-start w-full h-full">
                                        <HistoryTable
                                            selectedFilament={selectedFilament}
                                            setEntryMode={setEntryMode}
                                        />
                                    </div>
                                )}

                                {selectedAction?.toLowerCase() === "changeinfo" && (
                                    <AddEditContainer
                                        selectedFilament={selectedFilament}
                                        setEntryMode={setEntryMode}
                                        inventory={inventory}
                                    />
                                )}

                                {selectedAction?.toLowerCase() === "archive" && (
                                    <div className="flex flex-col items-center justify-start md:justify-center w-full h-full">
                                        <ArchiveFilament
                                            selectedFilament={selectedFilament}
                                            setEntryMode={setEntryMode}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {entryMode === "unmatched" && (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <AddEditContainer
                            newFilamentId={newFilamentId}
                            setEntryMode={setEntryMode}
                            inventory={inventory}
                        />
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}