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
    return (
        <div className="flex flex-col gap-6 rounded-xl bg-card p-6">
            <Field className="flex flex-col gap-2">
                <FieldLabel className="font-semibold uppercase" htmlFor="startingWeight">
                    Starting Weight:
                </FieldLabel>

                <Input
                    id="startingWeight"
                    type="number"
                    value={editedData.startingWeight ?? 0}
                    onChange={(event) =>
                        updateField("startingWeight", Number(event.target.value))
                    }
                    placeholder="1300"
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    The weight of the filament and spool
                </FieldDescription>
            </Field>

            <Field className="flex flex-col gap-2">
                <FieldLabel className="font-semibold uppercase" htmlFor="spoolWeight">
                    Spool Weight:
                </FieldLabel>

                <Input
                    id="spoolWeight"
                    type="number"
                    value={editedData.spoolWeight ?? 0}
                    onChange={(event) =>
                        updateField("spoolWeight", Number(event.target.value))
                    }
                    placeholder="300"
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    The weight of the spool without filament
                </FieldDescription>
            </Field>

            <Field className="flex flex-col gap-2">
                <FieldLabel className="font-semibold uppercase" htmlFor="remainingWeight">
                    Remaining Filament:
                </FieldLabel>

                <Input
                    id="remainingWeight"
                    type="number"
                    value={editedData.remainingWeight ?? 0}
                    disabled
                    placeholder="300"
                    className="px-4 py-6 text-base font-bold tracking-widest"
                />

                <FieldDescription>
                    The remaining filament by weight
                </FieldDescription>
            </Field>
        </div>
    );
}