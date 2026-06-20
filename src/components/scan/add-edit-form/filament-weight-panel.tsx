"use client";

import { Filament } from "@/lib/types";
import {
    Field,
    FieldDescription,
    FieldLabel,
} from "../../ui/field";
import { Input } from "../../ui/input";

type Props = {
    editedData: Partial<Filament>;
    updateField: <K extends keyof Filament>(
        key: K,
        value: Filament[K]
    ) => void;
};

export default function FilamentWeightPanel({
    editedData,
    updateField,
}: Props) {
    const startingWeight = Number(
        editedData.startingWeight ?? 0
    );

    const spoolWeight = Number(
        editedData.spoolWeight ?? 0
    );

    const currentWeight = Number(
        editedData.currentWeight ?? 0
    );

    const originalFilamentWeight = Math.max(
        startingWeight - spoolWeight,
        0
    );

    const remainingFilamentWeight = Math.max(
        currentWeight - spoolWeight,
        0
    );

    const percentRemaining =
        originalFilamentWeight > 0
            ? Math.round(
                (remainingFilamentWeight /
                    originalFilamentWeight) *
                100
            )
            : 0;

    function updateWeights({
        newStartingWeight = startingWeight,
        newSpoolWeight = spoolWeight,
        newCurrentWeight = currentWeight,
    }: {
        newStartingWeight?: number;
        newSpoolWeight?: number;
        newCurrentWeight?: number;
    }) {
        const newOriginalFilamentWeight = Math.max(
            newStartingWeight - newSpoolWeight,
            0
        );

        const newRemainingFilamentWeight = Math.max(
            newCurrentWeight - newSpoolWeight,
            0
        );

        const newPercentRemaining =
            newOriginalFilamentWeight > 0
                ? Math.round(
                    (newRemainingFilamentWeight /
                        newOriginalFilamentWeight) *
                    100
                )
                : 0;

        updateField(
            "startingWeight",
            newStartingWeight
        );

        updateField(
            "spoolWeight",
            newSpoolWeight
        );

        updateField(
            "currentWeight",
            newCurrentWeight
        );

        updateField(
            "remainingWeight",
            newRemainingFilamentWeight
        );

        updateField(
            "percentRemaining",
            newPercentRemaining
        );
    }

    return (
        <div className="flex flex-col gap-6 rounded-xl bg-card p-6 shadow-md">
            <Field className="flex flex-col gap-2">
                <FieldLabel
                    className="font-semibold uppercase"
                    htmlFor="startingWeight"
                >
                    Starting Weight:
                </FieldLabel>

                <Input
                    id="startingWeight"
                    type="number"
                    value={
                        editedData.startingWeight ??
                        ""
                    }
                    onChange={(event) =>
                        updateWeights({
                            newStartingWeight:
                                Number(
                                    event.target.value
                                ),
                        })
                    }
                    placeholder="1300"
                    autoComplete="off"
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    Full spool weight when new,
                    including filament and spool
                </FieldDescription>
            </Field>

            <Field className="flex flex-col gap-2">
                <FieldLabel
                    className="font-semibold uppercase"
                    htmlFor="spoolWeight"
                >
                    Empty Spool Weight:
                </FieldLabel>

                <Input
                    id="spoolWeight"
                    type="number"
                    value={
                        editedData.spoolWeight ??
                        ""
                    }
                    onChange={(event) =>
                        updateWeights({
                            newSpoolWeight:
                                Number(
                                    event.target.value
                                ),
                        })
                    }
                    placeholder="300"
                    autoComplete="off"
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    Weight of the empty spool
                    without filament
                </FieldDescription>
            </Field>

            <Field className="flex flex-col gap-2">
                <FieldLabel
                    className="font-semibold uppercase"
                    htmlFor="currentWeight"
                >
                    Current Scale Weight:
                </FieldLabel>

                <Input
                    id="currentWeight"
                    type="number"
                    value={
                        editedData.currentWeight ??
                        ""
                    }
                    onChange={(event) =>
                        updateWeights({
                            newCurrentWeight:
                                Number(
                                    event.target.value
                                ),
                        })
                    }
                    placeholder="850"
                    autoComplete="off"
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    Total weight currently shown
                    on the scale, including the
                    spool
                </FieldDescription>
            </Field>

            <Field className="flex flex-col gap-2">
                <FieldLabel
                    className="font-semibold uppercase"
                    htmlFor="remainingWeight"
                >
                    Remaining Filament:
                </FieldLabel>

                <Input
                    id="remainingWeight"
                    type="number"
                    value={
                        remainingFilamentWeight
                    }
                    disabled
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    Calculated filament weight
                    after subtracting the empty
                    spool weight
                </FieldDescription>
            </Field>

            <Field className="flex flex-col gap-2">
                <FieldLabel
                    className="font-semibold uppercase"
                    htmlFor="percentRemaining"
                >
                    Percent Remaining:
                </FieldLabel>

                <Input
                    id="percentRemaining"
                    type="text"
                    value={percentRemaining + "%"}
                    disabled
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    Percentage of the original
                    filament still remaining
                </FieldDescription>
            </Field>
        </div>
    );
}