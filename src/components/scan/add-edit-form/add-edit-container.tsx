"use client";

import { EntryModeOptions, Filament } from "@/lib/types";
import { Dispatch, SetStateAction, useRef } from "react";
import { ArrowRightIcon, DownloadIcon, QrCodeIcon, Undo2Icon, XIcon } from "lucide-react";

import FilamentForm from "./filament-form";
import FilamentWeightPanel from "./filament-weight-panel";
import SwatchImageUpload from "./swatch-image-upload";
import { useFilamentForm } from "../../../hooks/use-filament-form";
import { showToast } from "@/components/ui/toast";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SetPageTitle } from "@/components/global/set-page-title";
import { authenticatedFetch } from "@/lib/auth/authenticated-fetch";
import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

type Props = {
    newFilamentId?: string;
    selectedFilament?: Filament;
    inventory: Filament[];
    setEntryMode: Dispatch<SetStateAction<EntryModeOptions>>;
};

export default function AddEditContainer({
    newFilamentId,
    selectedFilament,
    inventory,
    setEntryMode,
}: Props) {

    const labelRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const {
        editedData,
        updateField,

        swatchImage,
        setSwatchImage,

        imageRemoved,
        setImageRemoved,

        brands,
        materials,
        existingTags,

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

        const submittedId = editedData.id.trim();

        const duplicate = inventory.find((filament) => {
            const sameId =
                filament.id.toLowerCase() === submittedId.toLowerCase();

            const sameOriginalFilament =
                selectedFilament &&
                filament.uuid === selectedFilament.uuid;

            return sameId && !sameOriginalFilament;
        });

        if (duplicate) {
            showToast({
                message: `Spool ID ${submittedId} already exists`,
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

            const response = await authenticatedFetch("/api/upsert-filament", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error);
            }

            router.refresh();

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

    async function downloadLabel() {
        if (!labelRef.current) return;

        const dataUrl = await toPng(labelRef.current, {
            pixelRatio: 4,
            backgroundColor: "#ffffff",
        });

        const link = document.createElement("a");
        link.download = `${editedData.id}.png`;
        link.href = dataUrl;
        link.click();
    }



    const buttonActions = <div className="flex w-full flex-row items-center justify-between">
        <Button
            size="lg"
            onClick={() => setEntryMode("entry")}
            variant="outline"
            className="hidden md:flex"
        >
            <Undo2Icon />
            <span>Reset</span>
        </Button>

        <div className="flex flex-row gap-4 items-center justify-between w-full md:w-fit md:justify-center">
        <Button
            size="lg"
            onClick={() => setEntryMode("entry")}
            variant="outline"
            className="flex md:hidden"
        >
            <Undo2Icon />
            <span>Reset</span>
        </Button>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        size="lg"
                        variant="default"
                    >
                        <span>Generate Label</span>
                        <QrCodeIcon />
                    </Button>
                </DialogTrigger>

                {/* Label Modal */}
                <DialogContent className="w-[95%] lg:w-1/2 text-base" showCloseButton={false}>
                    <DialogHeader className="w-full p-8">
                        <DialogDescription className="grid grid-cols-1 w-full">

                            <DialogTitle className="text-xl font-bold">Generated Label</DialogTitle>

                            <div className="flex flex-col items-center justify-center w-full gap-8 mt-8">

                                <div
                                    ref={labelRef}
                                    className="flex items-center justify-between gap-4 px-3 py-2 w-80 h-24 rounded-xl bg-white text-black overflow-hidden"
                                >
                                    <div className="flex items">
                                        <QRCode
                                            size={76}
                                            value={editedData.id ?? ""}
                                        />
                                    </div>
                                    <div className="grow text-base leading-tight text-nowrap text-ellipsis overflow-hidden">
                                        <div><strong>ID:</strong> {editedData.id ?? ""}</div>
                                        <div><strong>Brand:</strong> {editedData.brand ?? ""}</div>
                                        <div><strong>Color:</strong> {editedData.color ?? ""}</div>
                                        <div><strong>Tags:</strong> {editedData.tags?.join(", ") ?? ""}</div>
                                    </div>
                                </div>

                                <Button
                                    onClick={downloadLabel}
                                    variant="default"
                                    size="lg"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <span>Download Label</span>
                                    <DownloadIcon />
                                </Button>
                            </div>

                            <DialogClose asChild>
                                <div className="absolute top-6 right-6 rounded-full focus:outline-none p-0 cursor-pointer">
                                    <XIcon className="size-6" />
                                </div>
                            </DialogClose>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

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
    </div>;

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

    return (<>
        <SetPageTitle title={newFilamentId ? "Add New Filament" : selectedFilament?.brand + " " + selectedFilament?.color} />

        <div className="flex h-full w-full flex-col gap-16 pt-0 pb-4">
            <div className="flex flex-col md:flex-row w-full gap-8 md:gap-16 pb-8 md:pb-0">

                <div className="flex flex-col gap-14">
                    <FilamentForm
                        editedData={editedData}
                        updateField={updateField}
                        brands={brands}
                        materials={materials}
                        existingTags={existingTags}
                    />

                    <div className="hidden md:flex">
                        {buttonActions}
                    </div>
                </div>

                <div className="flex min-w-96 flex-col gap-4 md:gap-8">
                    <FilamentWeightPanel
                        editedData={editedData}
                        updateField={updateField}
                    />

                    <div className="flex flex-col gap-4 rounded-xl bg-card shadow-md p-6">
                        <Field className="flex flex-row items-center md:items-center gap-4">
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
                                    className="px-8 rounded-none rounded-l-lg"
                                >
                                    Yes
                                </ToggleGroupItem>

                                <ToggleGroupItem
                                    value="no"
                                    className="px-8 rounded-none rounded-r-lg"
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

                <div className="flex md:hidden">
                    {buttonActions}
                </div>
            </div>
        </div>
    </>);
}