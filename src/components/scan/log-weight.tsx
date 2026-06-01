"use client";

import { EntryModeOptions, Filament } from "@/lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import FilamentProgressCard from "../dashboard/filament-progress-card";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { getStatusTextColor } from "@/utilities/color-functions";
import { ArrowDownRightIcon, ArrowRightIcon, ArrowUpRightIcon, Undo2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { showToast } from "@/components/ui/toast";
import { authenticatedFetch } from "@/lib/auth/authenticated-fetch";

type Props = {
    selectedFilament: Filament;
    setEntryMode: Dispatch<SetStateAction<EntryModeOptions>>;
};

export default function LogWeight({
    selectedFilament,
    setEntryMode
}: Props) {

    const [updatedWeight, setUpdatedWeight] = useState<number>(selectedFilament.remainingWeight);
    const updatedPercent = (updatedWeight / selectedFilament.startingWeight) * 100;
    const changedAmount = updatedWeight - selectedFilament.remainingWeight;

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

    async function handleSubmit(
        updatedWeight: number
    ) {
        const response = await authenticatedFetch("/api/log-weight", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filamentId: selectedFilament.id,
                updatedWeight
            }),
        });

        const result = await response.json();

        if (!result.success) {
            console.error(result.error);
            return;
        }

        showToast({
            message: `${selectedFilament.brand} ${selectedFilament.color} updated successfully`,
            variant: "success",
        });

        setEntryMode("entry");
    }

    return (
        <div className="flex flex-col items-center gap-8 w-4xl">
            <div className="w-2xl bg-card shadow-md rounded-lg p-6 border-t-8"
                style={{ "borderColor": selectedFilament.colorCode }}
            >
                <FilamentProgressCard inventory={selectedFilament} />
            </div>

            <div className="flex flex-col gap-6 w-lg">
                <span className="text-base font-light uppercase">Updated Weight (g)</span>

                <Input
                    value={updatedWeight}
                    type="number"
                    onChange={(event) =>
                        setUpdatedWeight(Number(event.target.value))
                    }
                    className="px-4 py-6 text-xl font-bold uppercase tracking-widest text-center"
                />

                <div className="flex flex-row items-center justify-center gap-4">
                    <Progress
                        value={updatedPercent}
                        className="h-2 rounded-full bg-accent"
                        indicatorClassName={statusBgColorMap[statusTextColor]}
                    />

                    <span className={`text-sm font-semibold tabular-nums ${statusTextColorMap[statusTextColor]}`}>
                        {updatedPercent.toFixed(0)}%
                    </span>
                </div>

                <div className="flex flex-row items-center justify-center gap-2 uppercase font-bold">
                    <span>Was: {selectedFilament.remainingWeight} g</span>
                    <span> • </span>
                    <div className="flex flex-row gap-1">
                        <span>Change:&nbsp;</span>
                        {
                            changedAmount < 0 &&
                            <span className="flex flex-row gap-1 text-danger">
                                <span className="tabular-nums">{changedAmount.toFixed(0)} g</span>
                                <ArrowDownRightIcon />
                            </span>
                        }
                        {
                            changedAmount > 0 &&
                            <span className="flex flex-row gap-1 text-success">
                                <span className="tabular-nums">{changedAmount.toFixed(0)} g</span>
                                <ArrowUpRightIcon />
                            </span>
                        }
                        {
                            changedAmount === 0 &&
                            <span>-</span>
                        }
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between w-full">
                    <Button size={"lg"}
                        onClick={() => setEntryMode("entry")}
                        variant={"outline"}
                        className="self-center"
                    >
                        <Undo2Icon />
                        <span>Reset</span>
                    </Button>

                    <Button
                        disabled={changedAmount === 0}
                        onClick={() => handleSubmit(updatedWeight)}
                        className="bg-success w-fit"
                        variant={"default"}
                        size={"lg"}
                    >
                        <span>Submit</span>
                        <ArrowRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
}