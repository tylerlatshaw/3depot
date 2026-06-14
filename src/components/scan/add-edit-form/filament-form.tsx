"use client";

import { Brands, Filament, Materials } from "@/lib/types";
import { Field, FieldDescription, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { Colorful } from "@uiw/react-color";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronsUpDownIcon, CheckIcon, XIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
    editedData: Partial<Filament>;
    updateField: <K extends keyof Filament>(
        key: K,
        value: Filament[K]
    ) => void;
    brands: Brands[];
    materials: Materials[];
    existingTags: string[];
};

export default function FilamentForm({
    editedData,
    updateField,
    brands,
    materials,
    existingTags,
}: Props) {
    const [tagOpen, setTagOpen] = useState(false);
    const [tagSearch, setTagSearch] = useState("");

    return (
        <div className="flex grow flex-col gap-8">
            <div className="flex flex-col gap-1">
                <div className="flex flex-col md:flex-row gap-4 md:gap-16">
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

            <Field className="flex flex-col gap-2 w-full">
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
                    className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full"
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

            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8 pt-2">
                <Colorful
                    color={editedData.colorCode ?? "#00DDFF"}
                    onChange={(color) =>
                        updateField("colorCode", color.hex)
                    }
                    disableAlpha
                    className="md:pt-0.5"
                />

                <div className="flex flex-row md:flex-col gap-4 grow">
                    <Field className="flex flex-col gap-2">
                        <FieldLabel className="font-semibold uppercase" htmlFor="hex">
                            Hex Color:
                        </FieldLabel>
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
                            className="w-48 px-4 py-6 text-base font-bold uppercase tracking-widest"
                            autoComplete="one-time-code"
                        />
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
                            className="w-48 px-4 py-6 text-base font-bold tracking-widest"
                            autoComplete="one-time-code"
                        />
                    </Field>
                </div>

                <Field className="flex w-full md:w-72 flex-1 flex-col gap-2">
                    <FieldLabel className="font-semibold uppercase">
                        Tags:
                    </FieldLabel>

                    <Popover open={tagOpen} onOpenChange={setTagOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                role="combobox"
                                className="w-full md:w-72 justify-between px-4 py-6 text-base"
                            >
                                Add tag
                                <ChevronsUpDownIcon className="h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border border-accent">
                            <Command>
                                <CommandInput
                                    placeholder="Search or create tag..."
                                    value={tagSearch}
                                    onValueChange={setTagSearch}
                                />

                                <CommandList>
                                    <CommandEmpty>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => {
                                                const value = tagSearch.trim();
                                                if (!value) return;

                                                const currentTags = editedData.tags ?? [];

                                                if (!currentTags.includes(value)) {
                                                    updateField(
                                                        "tags",
                                                        [...currentTags, value].sort((a, b) =>
                                                            a.localeCompare(b)
                                                        )
                                                    );
                                                }

                                                setTagSearch("");
                                                setTagOpen(false);
                                            }}
                                        >
                                            Create “{tagSearch}”
                                        </Button>
                                    </CommandEmpty>

                                    <CommandGroup>
                                        {existingTags.map((tag) => {
                                            const selected =
                                                editedData.tags?.includes(tag) ?? false;

                                            return (
                                                <CommandItem
                                                    key={tag}
                                                    value={tag}
                                                    onSelect={() => {
                                                        const currentTags =
                                                            editedData.tags ?? [];

                                                        if (!selected) {
                                                            updateField(
                                                                "tags",
                                                                [...currentTags, tag].sort(
                                                                    (a, b) =>
                                                                        a.localeCompare(b)
                                                                )
                                                            );
                                                        }

                                                        setTagSearch("");
                                                        setTagOpen(false);
                                                    }}
                                                    className="cursor-pointer hover:bg-card"
                                                >
                                                    <CheckIcon
                                                        className={`mr-2 h-4 w-4 ${selected
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                            }`}
                                                    />
                                                    {tag}
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {(editedData.tags ?? []).map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() =>
                                    updateField(
                                        "tags",
                                        (editedData.tags ?? []).filter(
                                            (item) => item !== tag
                                        )
                                    )
                                }
                                className="flex items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground"
                            >
                                {tag}
                                <XIcon className="h-3 w-3" />
                            </button>
                        ))}
                    </div>
                </Field>
            </div>
        </div>
    );
}