"use client";

import { Filament } from "@/lib/types";
import { Field, FieldDescription, FieldLabel } from "../../ui/field";
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
    const startingWeight = Number(editedData.startingWeight ?? 0);
    const spoolWeight = Number(editedData.spoolWeight ?? 0);
    const remainingWeight = Math.max(startingWeight - spoolWeight, 0);

    function updateStartingWeight(value: number) {
        updateField("startingWeight", value);
        updateField("remainingWeight", Math.max(value - spoolWeight, 0));
    }

    function updateSpoolWeight(value: number) {
        updateField("spoolWeight", value);
        updateField("remainingWeight", Math.max(startingWeight - value, 0));
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
                    value={editedData.startingWeight ?? ""}
                    onChange={(event) =>
                        updateStartingWeight(Number(event.target.value))
                    }
                    placeholder="1300"
                    autoComplete="off"
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    The weight of the filament and spool
                </FieldDescription>
            </Field>

            <Field className="flex flex-col gap-2">
                <FieldLabel
                    className="font-semibold uppercase"
                    htmlFor="spoolWeight"
                >
                    Spool Weight:
                </FieldLabel>

                <Input
                    id="spoolWeight"
                    type="number"
                    value={editedData.spoolWeight ?? ""}
                    onChange={(event) =>
                        updateSpoolWeight(Number(event.target.value))
                    }
                    placeholder="300"
                    autoComplete="off"
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    The weight of the spool without filament
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
                    value={remainingWeight}
                    disabled
                    placeholder="1000"
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    The remaining filament by weight
                </FieldDescription>
            </Field>
        </div>
    );
}