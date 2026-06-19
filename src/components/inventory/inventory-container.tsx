"use client";

import { useState } from "react";
import { FilterIcon, SearchIcon } from "lucide-react";
import { Field } from "../ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";
import FilamentCard from "./filament-card";
import {
    Filament,
    FILAMENT_STATUS,
    FILAMENT_STATUS_ORDER,
} from "@/lib/types";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { inventorySections } from "@/lib/inventory";
import { matchesInventorySection } from "@/utilities/inventory-functions";
import { hexToHue } from "@/utilities/color-functions";

export default function InventoryContainer({
    inventory,
}: {
    inventory: Filament[];
}) {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [searchText, setSearchText] = useState("");
    const [showArchived, setShowArchived] = useState(false);

    const visibleInventory = showArchived
        ? inventory
        : inventory.filter(
            (item) => item.status !== FILAMENT_STATUS.ARCHIVED
        );

    const inventoryStatuses = [
        ...new Set(visibleInventory.map((item) => item.status)),
    ];

    const statusArray = [
        "all",
        ...FILAMENT_STATUS_ORDER.filter((status) =>
            inventoryStatuses.includes(status)
        ),
    ];

    const normalizedSearch = searchText.trim().toLowerCase();

    const filteredInventory = visibleInventory.filter((item) => {
        const matchesStatus =
            selectedStatus === "all" || item.status === selectedStatus;

        const matchesSearch =
            !normalizedSearch ||
            item.brand.toLowerCase().includes(normalizedSearch) ||
            item.color.toLowerCase().includes(normalizedSearch) ||
            item.id.toLowerCase().includes(normalizedSearch) ||
            item.material.toLowerCase().includes(normalizedSearch) ||
            item.tags.some((tag) =>
                tag.toLowerCase().includes(normalizedSearch)
            );

        return matchesStatus && matchesSearch;
    });

    const sectionedInventory = inventorySections.map((section) => ({
        ...section,
        inventory: filteredInventory
            .filter((filament) =>
                matchesInventorySection(filament, section)
            )
            .toSorted(
                (a, b) =>
                    hexToHue(a.colorCode) -
                    hexToHue(b.colorCode)
            ),
    }));

    const matchedIds = new Set(
        sectionedInventory.flatMap((section) =>
            section.inventory.map((filament) => filament.uuid)
        )
    );

    const otherInventory = filteredInventory.filter(
        (filament) => !matchedIds.has(filament.uuid)
    );

    return (
        <div className="flex w-full flex-col gap-6 pt-2">
            <div className="flex min-w-0 w-full flex-col gap-6 md:flex-row md:items-center md:gap-4">
                <div className="flex min-w-0 w-full flex-row items-center gap-2">
                    <div className="hidden shrink-0 md:flex">
                        <FilterIcon />
                    </div>

                    <div className="min-w-0 flex-1 overflow-hidden">
                        <div className="no-scrollbar max-w-full overflow-x-auto">
                            <ToggleGroup
                                type="single"
                                size="default"
                                value={selectedStatus}
                                onValueChange={(value) => {
                                    if (value) setSelectedStatus(value);
                                }}
                                variant="default"
                                spacing={2}
                                className="inline-flex w-max shrink-0"
                            >
                                {statusArray.map((status) => (
                                    <ToggleGroupItem
                                        key={status}
                                        value={status}
                                        aria-label={`Toggle ${status}`}
                                        className="uppercase data-[state=on]:!border-primary data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
                                    >
                                        {status}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    </div>
                </div>

                <Field className="hidden md:flex group w-64 lg:w-72 xl:w-96">
                    <InputGroup className="border border-accent bg-card">
                        <InputGroupInput
                            id="input-search-box"
                            placeholder="Bambu"
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(event.target.value)
                            }
                        />

                        <InputGroupAddon align="inline-start">
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>

                <span className="text-accent hidden md:flex">|</span>

                <div className="flex flex-row items-center justify-between md:justify-center w-full md:w-fit px-1 md:px-0 gap-0 md:gap-2">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <Checkbox
                            id="show-archived"
                            checked={showArchived}
                            onCheckedChange={(checked) => {
                                const nextValue = checked === true;

                                setShowArchived(nextValue);

                                if (
                                    !nextValue &&
                                    selectedStatus ===
                                    FILAMENT_STATUS.ARCHIVED
                                ) {
                                    setSelectedStatus("all");
                                }
                            }}
                        />

                        <Label
                            htmlFor="show-archived"
                            className="text-sm font-light"
                        >
                            Show Archived
                        </Label>
                    </div>

                    <span className="text-accent hidden md:block">|</span>

                    <span className="text-sm text-muted-foreground text-nowrap">
                        <span className="inline-block w-6 text-right tabular-nums">
                            {filteredInventory.length}
                        </span>
                        &nbsp;Spools
                    </span>
                </div>
            </div>

            <hr className="border border-accent" />

            <div className="flex flex-col gap-12">
                {sectionedInventory.map((section) => {
                    if (section.inventory.length === 0) return null;

                    return (
                        <section
                            key={section.title}
                            className="flex flex-col gap-4"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold uppercase">
                                    {section.title}
                                </h2>

                                <span className="text-sm text-muted-foreground">
                                    {section.inventory.length} Spools
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {section.inventory.map((filament) => (
                                    <FilamentCard
                                        key={filament.id}
                                        filament={filament}
                                    />
                                ))}
                            </div>
                        </section>
                    );
                })}

                {otherInventory.length > 0 && (
                    <section className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold uppercase">
                                Other
                            </h2>

                            <span className="text-sm text-muted-foreground">
                                {otherInventory.length} Spools
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {otherInventory.map((filament) => (
                                <FilamentCard
                                    key={filament.id}
                                    filament={filament}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}