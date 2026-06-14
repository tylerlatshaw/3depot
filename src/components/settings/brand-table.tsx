"use client";

import { Brands } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    CheckIcon,
    PencilIcon,
    PlusIcon,
    Trash2Icon,
    XIcon,
} from "lucide-react";
import { Colorful } from "@uiw/react-color";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { authenticatedFetch } from "@/lib/auth/authenticated-fetch";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import NoData from "../global/no-data";

const NEW_BRAND_UUID = "__new_brand__";

export default function BrandEditTable({
    initialData = [],
}: {
    initialData?: Brands[];
}) {
    const router = useRouter();

    const [brands, setBrands] = useState<Brands[]>(initialData ?? []);
    const [error, setError] = useState("");

    const [editingUuid, setEditingUuid] = useState<string | null>(null);
    const [editedBrand, setEditedBrand] = useState<Partial<Brands>>({});

    const [actionLoading, setActionLoading] = useState<
        "save" | "delete" | null
    >(null);

    function handleAddBrand() {
        if (editingUuid) return;

        const newBrand: Brands = {
            uuid: NEW_BRAND_UUID,
            id: "",
            name: "",
            spoolWeight: 0,
            brandColor: "#00ddff",
            dateCreated: new Date().toISOString(),
            dateModified: new Date().toISOString(),
        };

        setBrands((current) => [newBrand, ...current]);
        setEditingUuid(NEW_BRAND_UUID);
        setEditedBrand(newBrand);
    }

    function handleEdit(brand: Brands) {
        setEditingUuid(brand.uuid);
        setEditedBrand({ ...brand });
    }

    function handleCancel() {
        if (editingUuid === NEW_BRAND_UUID) {
            setBrands((current) =>
                current.filter((brand) => brand.uuid !== NEW_BRAND_UUID)
            );
        }

        setEditingUuid(null);
        setEditedBrand({});
    }

    async function handleSave() {
        try {
            setError("");
            setActionLoading("save");

            const isNewBrand = editingUuid === NEW_BRAND_UUID;

            const response = await authenticatedFetch("/api/upsert-brand", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uuid: isNewBrand ? undefined : editedBrand.uuid,
                    id: editedBrand.id,
                    name: editedBrand.name,
                    spoolWeight: editedBrand.spoolWeight,
                    brandColor: editedBrand.brandColor,
                }),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error);
            }

            setBrands((current) =>
                current
                    .map((brand) =>
                        brand.uuid === editingUuid
                            ? {
                                ...brand,
                                uuid: result.uuid ?? brand.uuid,
                                id: editedBrand.id ?? brand.id,
                                name: editedBrand.name ?? brand.name,
                                spoolWeight:
                                    editedBrand.spoolWeight ??
                                    brand.spoolWeight,
                                brandColor:
                                    editedBrand.brandColor ??
                                    brand.brandColor,
                                dateModified: new Date().toISOString(),
                            }
                            : brand
                    )
                    .sort((a, b) => a.name.localeCompare(b.name))
            );

            setEditingUuid(null);
            setEditedBrand({});

            router.refresh();
        } catch (error) {
            console.error(error);
            setError("Failed to save brand.");
        } finally {
            setActionLoading(null);
        }
    }

    async function handleDelete(brand: Brands) {
        try {
            setError("");
            setActionLoading("delete");

            const response = await authenticatedFetch("/api/delete-brand", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uuid: brand.uuid,
                }),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error);
            }

            setBrands((current) =>
                current.filter((item) => item.uuid !== brand.uuid)
            );

            router.refresh();
        } catch (error) {
            console.error(error);
            setError("Failed to delete brand.");
        } finally {
            setActionLoading(null);
        }
    }

    if (error) {
        return (
            <div className="text-xl font-bold text-danger">
                {error}
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-center justify-center gap-8 pt-2 text-base">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Brand Name</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Spool Weight</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {brands.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="py-16">
                                <NoData />
                            </TableCell>
                        </TableRow>
                    ) : (
                        brands.map((brand) => {
                            const isEditing = editingUuid === brand.uuid;

                            return (
                                <TableRow key={brand.uuid}>
                                    <TableCell className="align-middle">
                                        <div className="flex items-center gap-3">
                                            {isEditing && (
                                                <Colorful
                                                    color={
                                                        editedBrand.brandColor ??
                                                        "#00ddff"
                                                    }
                                                    onChange={(color) =>
                                                        setEditedBrand((prev) => ({
                                                            ...prev,
                                                            brandColor:
                                                                color.hex,
                                                        }))
                                                    }
                                                />
                                            )}

                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{
                                                    backgroundColor: isEditing
                                                        ? editedBrand.brandColor
                                                        : brand.brandColor,
                                                }}
                                            />

                                            {isEditing ? (
                                                <Input
                                                    value={
                                                        editedBrand.name ?? ""
                                                    }
                                                    placeholder="Brand name"
                                                    onChange={(event) =>
                                                        setEditedBrand(
                                                            (prev) => ({
                                                                ...prev,
                                                                name: event
                                                                    .target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                    className="w-56"
                                                />
                                            ) : (
                                                <span className="text-lg font-semibold">
                                                    {brand.name}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>

                                    <TableCell className="align-middle">
                                        {isEditing ? (
                                            <Input
                                                value={editedBrand.id ?? ""}
                                                placeholder="BA"
                                                onChange={(event) =>
                                                    setEditedBrand((prev) => ({
                                                        ...prev,
                                                        id: event.target.value.toUpperCase(),
                                                    }))
                                                }
                                                className="w-24 uppercase"
                                            />
                                        ) : (
                                            brand.id
                                        )}
                                    </TableCell>

                                    <TableCell className="align-middle">
                                        {isEditing ? (
                                            <Input
                                                type="number"
                                                value={
                                                    editedBrand.spoolWeight ??
                                                    0
                                                }
                                                onChange={(event) =>
                                                    setEditedBrand((prev) => ({
                                                        ...prev,
                                                        spoolWeight: Number(
                                                            event.target.value
                                                        ),
                                                    }))
                                                }
                                                className="w-28"
                                            />
                                        ) : (
                                            `${brand.spoolWeight.toFixed(1)} g`
                                        )}
                                    </TableCell>

                                    <TableCell className="align-middle">
                                        <div className="flex items-center gap-4">
                                            {isEditing ? (
                                                <>
                                                    <Button
                                                        variant="default"
                                                        className="gap-2"
                                                        onClick={handleSave}
                                                        disabled={actionLoading !== null}
                                                    >
                                                        {actionLoading === "save" ? (
                                                            <span>Saving...</span>
                                                        ) : (
                                                            <>
                                                                <CheckIcon />
                                                                <span>Save</span>
                                                            </>
                                                        )}
                                                    </Button>

                                                    <Button
                                                        variant="outline"
                                                        className="gap-2"
                                                        onClick={handleCancel}
                                                    >
                                                        <XIcon />
                                                        <span>Cancel</span>
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="outline"
                                                        className="gap-2"
                                                        onClick={() =>
                                                            handleEdit(brand)
                                                        }
                                                    >
                                                        <PencilIcon />
                                                        <span>Edit</span>
                                                    </Button>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="danger"
                                                                className="gap-2"
                                                                disabled={actionLoading !== null}
                                                            >
                                                                <Trash2Icon />
                                                                <span>
                                                                    {actionLoading === "delete" ? "Deleting..." : "Delete"}
                                                                </span>
                                                            </Button>
                                                        </AlertDialogTrigger>

                                                        <AlertDialogContent className="w-96 p-4">
                                                            <AlertDialogHeader className="flex flex-col gap-1 p-2 pb-4 text-base font-base">
                                                                <AlertDialogTitle className="text-lg font-bold">
                                                                    Delete{" "}
                                                                    {brand.name}
                                                                </AlertDialogTitle>

                                                                <AlertDialogDescription>
                                                                    Are you sure
                                                                    you want to
                                                                    delete{" "}
                                                                    <span className="font-semibold">
                                                                        {
                                                                            brand.name
                                                                        }
                                                                    </span>
                                                                    ? This
                                                                    cannot be
                                                                    undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>

                                                            <AlertDialogFooter className="flex flex-row gap-4">
                                                                <AlertDialogCancel>
                                                                    Cancel
                                                                </AlertDialogCancel>

                                                                <AlertDialogAction
                                                                    variant="danger"
                                                                    className="text-base"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            brand
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>

            <div className="flex w-full flex-row items-center justify-start">
                <Button
                    variant="default"
                    size="lg"
                    className="bg-success hover:bg-success/80"
                    onClick={handleAddBrand}
                    disabled={!!editingUuid || actionLoading !== null}
                >
                    <div className="flex flex-row items-center justify-center gap-2">
                        <PlusIcon />
                        <span>Add Brand</span>
                    </div>
                </Button>
            </div>
        </div>
    );
}