"use client";

import { Brands, Filament, Materials } from "@/lib/types";
import { Field, FieldDescription, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { Colorful } from "@uiw/react-color";

type Props = {
    editedData: Partial<Filament>;
    updateField: <K extends keyof Filament>(
        key: K,
        value: Filament[K]
    ) => void;
    brands: Brands[];
    materials: Materials[];
};

export default function FilamentForm({
    editedData,
    updateField,
    brands,
    materials,
}: Props) {
    return (
        <div className="flex grow flex-col gap-8">
            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-16">
                    <Field className="flex flex-col gap-2">
                        <FieldLabel className="font-semibold uppercase" htmlFor="id">
                            Spool ID:
                        </FieldLabel>

                        <Input
                            id="id"
                            type="text"
                            required
                            value={editedData.id ?? ""}
                            onChange={(event) =>
                                updateField("id", event.target.value.toUpperCase())
                            }
                            placeholder="BA-BL"
                            className="px-4 py-6 text-base font-bold uppercase tracking-widest"
                        />

                        <FieldDescription>
                            Format: XX-XX or XX-XX-XXXX
                        </FieldDescription>
                    </Field>

                    <Field className="flex flex-col gap-2">
                        <FieldLabel className="font-semibold uppercase" htmlFor="date">
                            Date Purchased:
                        </FieldLabel>

                        <Input
                            id="date"
                            type="date"
                            value={editedData.datePurchased ?? ""}
                            onChange={(event) =>
                                updateField("datePurchased", event.target.value)
                            }
                            className="px-4 py-6 text-base font-bold uppercase tracking-widest"
                        />
                    </Field>

                    <Field className="flex grow flex-col gap-2">
                        <FieldLabel className="font-semibold uppercase" htmlFor="material">
                            Material:
                        </FieldLabel>

                        <ToggleGroup
                            id="material"
                            type="single"
                            value={editedData.material ?? ""}
                            onValueChange={(value) => {
                                if (value) updateField("material", value);
                            }}
                            className="flex flex-row gap-4"
                            variant="default"
                            spacing={1}
                        >
                            {materials.map((material) => (
                                <ToggleGroupItem
                                    key={material.uuid}
                                    className="mt-2 flex flex-row items-center justify-center rounded-full border border-white bg-card px-8 py-2"
                                    value={material.id}
                                >
                                    <span className="text-base font-semibold">
                                        {material.id}
                                    </span>
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </Field>
                </div>
            </div>

            <Field className="flex flex-col gap-2">
                <FieldLabel className="font-semibold uppercase" htmlFor="brand">
                    Brand:
                </FieldLabel>

                <ToggleGroup
                    id="brand"
                    type="single"
                    value={editedData.brand ?? ""}
                    onValueChange={(value) => {
                        if (value) updateField("brand", value);
                    }}
                    className="grid grid-cols-5 gap-4"
                    variant="outline"
                    spacing={1}
                >
                    {brands.map((brand) => (
                        <ToggleGroupItem
                            key={brand.uuid}
                            className="flex h-16 w-full flex-row items-center justify-start gap-1.5 rounded-lg bg-card"
                            value={brand.name}
                        >
                            <div className="rounded-lg bg-foreground/20 p-1.5 text-lg font-bold">
                                {brand.id}
                            </div>

                            <div className="flex flex-col text-left">
                                <span className="text-base font-semibold">
                                    {brand.name}
                                </span>
                                <span className="text-sm font-light">
                                    Spool: {brand.spoolWeight} g
                                </span>
                            </div>
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </Field>

            <div className="flex flex-row gap-16">
                <Field className="flex flex-col gap-2">
                    <FieldLabel className="font-semibold uppercase" htmlFor="hex">
                        Hex Color:
                    </FieldLabel>

                    <div className="flex flex-row items-start justify-start gap-4">
                        <Colorful
                            color={editedData.colorCode ?? "#00DDFF"}
                            onChange={(color) =>
                                updateField("colorCode", color.hex)
                            }
                            disableAlpha
                        />

                        <Input
                            id="hex"
                            type="text"
                            value={editedData.colorCode ?? ""}
                            onChange={(event) =>
                                updateField(
                                    "colorCode",
                                    event.target.value.toUpperCase()
                                )
                            }
                            placeholder="#275ED9"
                            className="max-w-38 px-4 py-6 text-base font-bold uppercase tracking-widest"
                        />
                    </div>
                </Field>

                <Field className="flex flex-col gap-2">
                    <FieldLabel className="font-semibold uppercase" htmlFor="name">
                        Color Name:
                    </FieldLabel>

                    <Input
                        id="name"
                        type="text"
                        value={editedData.color ?? ""}
                        onChange={(event) =>
                            updateField("color", event.target.value)
                        }
                        placeholder="Matte Blue"
                        className="px-4 py-6 text-base font-bold tracking-widest"
                    />
                </Field>
            </div>
        </div>
    );
}