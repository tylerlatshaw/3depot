"use client";

import { Brands, Materials } from "@/lib/types";
import { Field } from "../ui/field";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import BrandEditTable from "./brand-table";
import MaterialEditTable from "./material-table";

type Page = "Brands" | "Materials";

export default function SettingsContainer({
    brands,
    materials,
}: {
    brands: Brands[];
    materials: Materials[];
}) {

    const [page, setPage] = useState<Page>("Brands");

    return (<>
        <div className="flex flex-col items-start w-full gap-4 text-base">
            <Field>
                <ToggleGroup
                    type="single"
                    value={page}
                    onValueChange={(value: Page) => {
                        if (value) setPage(value);
                    }}
                    variant="default"
                    spacing={0}
                    size="default"
                >
                    <ToggleGroupItem
                        value="Brands"
                        className="rounded-none rounded-l-lg font-bold px-4"
                    >
                        <span>Brands</span>
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="Materials"
                        className="rounded-none rounded-r-lg font-bold px-4"
                    >
                        <span>Materials</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </Field>

            <AnimatePresence mode="wait">
                <motion.div
                    key={page}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex flex-col items-center w-full h-full"
                >
                    {
                        page === "Brands" && <BrandEditTable initialData={brands} />
                    }

                    {
                        page === "Materials" && <MaterialEditTable initialData={materials} />
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    </>);
}