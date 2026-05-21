"use client";

import { useState } from "react";
import { FilterIcon, SearchIcon } from "lucide-react";
import { Field } from "../ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import FilamentCard from "./filament-card";
import { Filament, FILAMENT_STATUS_ORDER } from "@/lib/types";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export default function InventoryContainer({ inventory }: { inventory: Filament[] }) {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [searchText, setSearchText] = useState("");

    const inventoryStatuses = [
        ...new Set(inventory.map((item) => item.status)),
    ];

    const statusArray = [
        "all",
        ...FILAMENT_STATUS_ORDER.filter((status) =>
            inventoryStatuses.includes(status)
        ),
    ];

    const normalizedSearch = searchText.trim().toLowerCase();

    const filteredInventory = inventory.filter((item) => {
        const matchesStatus =
            selectedStatus === "all" || item.status === selectedStatus;

        const matchesSearch =
            !normalizedSearch ||
            item.brand.toLowerCase().includes(normalizedSearch) ||
            item.color.toLowerCase().includes(normalizedSearch) ||
            item.id.toLowerCase().includes(normalizedSearch);

        return matchesStatus && matchesSearch;
    });

    return (
        <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-row items-center gap-4">
                <div className="grow min-w-0 flex flex-row items-center gap-2">
                    <FilterIcon />

                    <div className="no-scrollbar overflow-x-auto whitespace-nowrap">
                        <ToggleGroup
                            type="single"
                            size="default"
                            value={selectedStatus}
                            onValueChange={(value) => {
                                if (value) setSelectedStatus(value);
                            }}
                            variant="default"
                            spacing={2}
                            className="w-max cursor-pointer"
                        >
                            {statusArray.map((status) => (
                                <ToggleGroupItem
                                    key={status}
                                    value={status}
                                    aria-label={`Toggle ${status}`}
                                    className="uppercase data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground data-[state=on]:!border-primary"
                                >
                                    {status}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                </div>

                <span className="text-accent">|</span>

                <Field className="group w-64">
                    <InputGroup className="border border-accent bg-card">
                        <InputGroupInput
                            id="input-search-box"
                            placeholder="Bambu"
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                        <InputGroupAddon align="inline-start">
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>

                <span className="text-accent">|</span>

                <span className="text-sm font-light">
                    <span className="inline-block w-6 text-right tabular-nums">
                        {filteredInventory.length}
                    </span>
                    &nbsp;Spools
                </span>
            </div>

            <hr className="border border-accent" />

            <div className="grid grid-cols-3 gap-6">
                {filteredInventory.map((filament) => (
                    <FilamentCard key={filament.id} filament={filament} />
                ))}
            </div>
        </div>
    );
}