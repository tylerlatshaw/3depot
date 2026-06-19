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

    const originalFilamentWeight = Math.max(
        selectedFilament.startingWeight - selectedFilament.spoolWeight,
        0
    );

    const previousTotalWeight =
        selectedFilament.remainingWeight + selectedFilament.spoolWeight;

    const [updatedWeight, setUpdatedWeight] = useState<number>(
        selectedFilament.currentWeight ?? previousTotalWeight
    );

    const filamentWeight = Math.max(
        updatedWeight - selectedFilament.spoolWeight,
        0
    );

    const updatedPercent =
        originalFilamentWeight > 0
            ? (filamentWeight / originalFilamentWeight) * 100
            : 0;

    const changedAmount = updatedWeight - previousTotalWeight;

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

    const isInvalid =
        updatedWeight <= 0 ||
        updatedWeight < selectedFilament.spoolWeight ||
        updatedWeight > selectedFilament.startingWeight;

    async function handleSubmit(updatedScaleWeight: number) {
        if (isInvalid) {
            showToast({
                message: "Current scale weight is outside the valid range",
                variant: "danger",
            });
            return;
        }

        const updatedFilamentWeight = Math.max(
            updatedScaleWeight - selectedFilament.spoolWeight,
            0
        );

        const response = await authenticatedFetch("/api/log-weight", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filamentId: selectedFilament.id,
                currentWeight: updatedScaleWeight,
                updatedWeight: updatedFilamentWeight,
            }),
        });

        const result = await response.json();

        if (!result.success) {
            console.error(result.error);

            showToast({
                message: result.error ?? "Failed to update filament",
                variant: "danger",
            });

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
        <div className="flex w-full flex-col items-center gap-8 md:w-4xl">
            <div
                className="w-full rounded-lg border-t-8 bg-card p-6 shadow-md md:w-2xl"
                style={{ borderColor: selectedFilament.colorCode }}
            >
                <FilamentProgressCard inventory={selectedFilament} />
            </div>

            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    handleSubmit(updatedWeight);
                }}
                className="flex w-full flex-col gap-6 md:w-lg"
            >
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

                {isInvalid && (
                    <span className="text-center text-sm font-semibold text-danger">
                        Current scale weight must be between spool weight and
                        starting weight.
                    </span>
                )}

                <div className="flex flex-col gap-1 rounded-lg bg-card p-4 text-sm">
                    <div className="flex justify-between">
                        <span className="font-light uppercase">
                            Starting Weight:
                        </span>
                        <span className="font-bold tabular-nums">
                            {selectedFilament.startingWeight} g
                        </span>
                    </div>

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
                            Original Filament:
                        </span>
                        <span className="font-bold tabular-nums">
                            {originalFilamentWeight} g
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-light uppercase">
                            Remaining Filament:
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
                                    +{changedAmount.toFixed(0)} g
                                </span>
                                <ArrowUpRightIcon />
                            </span>
                        )}

                        {changedAmount === 0 && <span>-</span>}
                    </div>
                </div>

                <div className="flex w-full flex-row items-center justify-between">
                    <Button
                        type="button"
                        size="lg"
                        onClick={() => setEntryMode("entry")}
                        variant="outline"
                        className="self-center"
                    >
                        <Undo2Icon />
                        <span>Reset</span>
                    </Button>

                    <Button
                        type="submit"
                        disabled={changedAmount === 0 || isInvalid}
                        className="w-fit bg-success"
                        variant="default"
                        size="lg"
                    >
                        <span>Submit</span>
                        <ArrowRightIcon />
                    </Button>
                </div>
            </form>
        </div>
    );
}