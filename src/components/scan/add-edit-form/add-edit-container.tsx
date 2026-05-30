"use client";

import { EntryModeOptions, Filament } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { ArrowRightIcon, Undo2Icon } from "lucide-react";

import FilamentForm from "./filament-form";
import FilamentWeightPanel from "./filament-weight-panel";
import SwatchImageUpload from "./swatch-image-upload";
import { useFilamentForm } from "./hooks/use-filament-form";
import { showToast } from "@/components/ui/toast";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Props = {
    newFilamentId?: string;
    selectedFilament?: Filament;
    setEntryMode: Dispatch<SetStateAction<EntryModeOptions>>;
};

export default function AddEditContainer({
    newFilamentId,
    selectedFilament,
    setEntryMode,
}: Props) {
    const {
        editedData,
        updateField,

        swatchImage,
        setSwatchImage,

        imageRemoved,
        setImageRemoved,

        brands,
        materials,
        loading,
        error,
    } = useFilamentForm({
        newFilamentId,
        selectedFilament,
    });

    async function handleSubmit() {
        if (!editedData.id?.trim()) {
            showToast({
                message: "Spool ID is required",
                variant: "danger",
            });
            return;
        }

        if (!editedData.brand?.trim()) {
            showToast({
                message: "Brand is required",
                variant: "danger",
            });
            return;
        }

        if (!editedData.material?.trim()) {
            showToast({
                message: "Material is required",
                variant: "danger",
            });
            return;
        }

        if (!editedData.color?.trim()) {
            showToast({
                message: "Color name is required",
                variant: "danger",
            });
            return;
        }

        if (!editedData.colorCode?.trim()) {
            showToast({
                message: "Hex color is required",
                variant: "danger",
            });
            return;
        }

        if (!editedData.datePurchased) {
            showToast({
                message: "Purchase date is required",
                variant: "danger",
            });
            return;
        }

        if (
            editedData.startingWeight == null ||
            editedData.startingWeight <= 0
        ) {
            showToast({
                message: "Starting weight is required",
                variant: "danger",
            });
            return;
        }

        if (
            editedData.spoolWeight == null ||
            editedData.spoolWeight <= 0
        ) {
            showToast({
                message: "Spool weight is required",
                variant: "danger",
            });
            return;
        }

        try {
            const formData = new FormData();

            formData.append(
                "filament",
                JSON.stringify(editedData)
            );

            formData.append(
                "removeSwatchImage",
                String(imageRemoved)
            );

            if (swatchImage) {
                formData.append("swatchImage", swatchImage);
            }

            const response = await fetch("/api/upsert-filament", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error);
            }

            showToast({
                message: "Filament saved successfully",
                variant: "success",
            });

            setEntryMode("entry");
        } catch (error) {
            console.error(error);

            showToast({
                message: "Failed to save filament",
                variant: "danger",
            });
        }
    }

    if (loading) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-full w-full items-center justify-center text-danger">
                {error}
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col gap-16 py-4">
            <div className="flex w-full flex-row gap-16">

                <div className="flex flex-col gap-14">
                    <FilamentForm
                        editedData={editedData}
                        updateField={updateField}
                        brands={brands}
                        materials={materials}
                    />

                    <div className="flex w-full flex-row items-center justify-between">
                        <Button
                            size="lg"
                            onClick={() => setEntryMode("entry")}
                            variant="outline"
                        >
                            <Undo2Icon />
                            <span>Reset</span>
                        </Button>

                        <Button
                            onClick={handleSubmit}
                            className="w-fit bg-success"
                            variant="default"
                            size="lg"
                        >
                            <span>Submit</span>
                            <ArrowRightIcon />
                        </Button>
                    </div>
                </div>

                <div className="flex min-w-96 flex-col gap-8">
                    <FilamentWeightPanel
                        editedData={editedData}
                        updateField={updateField}
                    />

                    <div className="flex flex-col gap-4 rounded-xl bg-card p-6">
                        <Field className="flex flex-row items-center gap-4">
                            <FieldLabel className="font-semibold uppercase">
                                Swatch Printed:
                            </FieldLabel>

                            <ToggleGroup
                                type="single"
                                value={editedData.swatch ? "yes" : "no"}
                                onValueChange={(value) => {
                                    if (!value) return;

                                    updateField("swatch", value === "yes");
                                }}
                                variant="outline"
                                spacing={0}
                                className="w-fit"
                            >
                                <ToggleGroupItem
                                    value="yes"
                                    className="px-8"
                                >
                                    Yes
                                </ToggleGroupItem>

                                <ToggleGroupItem
                                    value="no"
                                    className="px-8"
                                >
                                    No
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </Field>

                        <SwatchImageUpload
                            imageUrl={editedData.swatchImageUrl}
                            onChange={setSwatchImage}
                            onRemove={setImageRemoved}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}