"use client";

import { EntryModeOptions, Filament } from "@/lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import FilamentProgressCard from "../dashboard/filament-progress-card";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { getStatusTextColor } from "@/utilities/color-functions";
import {
    ArrowDownRightIcon,
    ArrowRightIcon,
    ArrowUpRightIcon,
    Undo2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { showToast } from "@/components/ui/toast";
import { authenticatedFetch } from "@/lib/auth/authenticated-fetch";
import { useRouter } from "next/navigation";

type Props = {
    selectedFilament: Filament;
    setEntryMode: Dispatch<SetStateAction<EntryModeOptions>>;
};

export default function LogWeight({
    selectedFilament,
    setEntryMode,
}: Props) {
    const router = useRouter();

    const [updatedWeight, setUpdatedWeight] = useState<number>(
        selectedFilament.remainingWeight + selectedFilament.spoolWeight
    );

    const filamentWeight = Math.max(
        updatedWeight - selectedFilament.spoolWeight,
        0
    );

    const updatedPercent =
        selectedFilament.startingWeight > 0
            ? (filamentWeight / selectedFilament.startingWeight) * 100
            : 0;

    const changedAmount =
        filamentWeight - selectedFilament.remainingWeight;

    const previousTotalWeight =
        selectedFilament.remainingWeight + selectedFilament.spoolWeight;

    const statusTextColor = getStatusTextColor(updatedPercent);

    const statusTextColorMap = {
        foreground: "text-success",
        warning: "text-warning",
        danger: "text-danger",
    } as const;

    const statusBgColorMap = {
        foreground: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
    } as const;

    async function handleSubmit(updatedFilamentWeight: number) {
        const response = await authenticatedFetch("/api/log-weight", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filamentId: selectedFilament.id,
                updatedWeight: updatedFilamentWeight,
            }),
        });

        const result = await response.json();

        if (!result.success) {
            console.error(result.error);
            return;
        }

        router.refresh();

        showToast({
            message: `${selectedFilament.brand} ${selectedFilament.color} updated successfully`,
            variant: "success",
        });

        setEntryMode("entry");
    }

    return (
        <div className="flex w-full md:w-4xl flex-col items-center gap-8">
            <div
                className="w-full md:w-2xl rounded-lg border-t-8 bg-card p-6 shadow-md"
                style={{ borderColor: selectedFilament.colorCode }}
            >
                <FilamentProgressCard inventory={selectedFilament} />
            </div>

            <div className="flex w-full md:w-lg flex-col gap-6">
                <span className="text-base font-light uppercase">
                    Current Scale Weight (g)
                </span>

                <Input
                    value={updatedWeight}
                    type="number"
                    autoComplete="off"
                    onChange={(event) =>
                        setUpdatedWeight(Number(event.target.value))
                    }
                    className="px-4 py-6 text-center text-xl font-bold uppercase tracking-widest"
                />

                <div className="flex flex-col gap-1 rounded-lg bg-card p-4 text-sm">
                    <div className="flex justify-between">
                        <span className="font-light uppercase">
                            Spool Weight:
                        </span>
                        <span className="font-bold tabular-nums">
                            {selectedFilament.spoolWeight} g
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-light uppercase">
                            Filament Weight:
                        </span>
                        <span className="font-bold tabular-nums">
                            {filamentWeight} g
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-4">
                    <Progress
                        value={updatedPercent}
                        className="h-2 rounded-full bg-accent"
                        indicatorClassName={statusBgColorMap[statusTextColor]}
                    />

                    <span
                        className={`text-sm font-semibold tabular-nums ${statusTextColorMap[statusTextColor]}`}
                    >
                        {updatedPercent.toFixed(0)}%
                    </span>
                </div>

                <div className="flex flex-row items-center justify-center gap-2 font-bold uppercase">
                    <span>Was: {previousTotalWeight} g</span>
                    <span> • </span>

                    <div className="flex flex-row gap-1">
                        <span>Change:&nbsp;</span>

                        {changedAmount < 0 && (
                            <span className="flex flex-row gap-1 text-danger">
                                <span className="tabular-nums">
                                    {changedAmount.toFixed(0)} g
                                </span>
                                <ArrowDownRightIcon />
                            </span>
                        )}

                        {changedAmount > 0 && (
                            <span className="flex flex-row gap-1 text-success">
                                <span className="tabular-nums">
                                    {changedAmount.toFixed(0)} g
                                </span>
                                <ArrowUpRightIcon />
                            </span>
                        )}

                        {changedAmount === 0 && <span>-</span>}
                    </div>
                </div>

                <div className="flex w-full flex-row items-center justify-between">
                    <Button
                        size="lg"
                        onClick={() => setEntryMode("entry")}
                        variant="outline"
                        className="self-center"
                    >
                        <Undo2Icon />
                        <span>Reset</span>
                    </Button>

                    <Button
                        disabled={changedAmount === 0}
                        onClick={() => handleSubmit(filamentWeight)}
                        className="w-fit bg-success"
                        variant="default"
                        size="lg"
                    >
                        <span>Submit</span>
                        <ArrowRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
}