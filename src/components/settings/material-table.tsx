"use client";

import { Materials } from "@/lib/types";
import { useEffect, useState } from "react";
import {
    CheckIcon,
    PencilIcon,
    PlusIcon,
    Trash2Icon,
    XIcon,
} from "lucide-react";

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
import Loading from "../ui/loading";
import NoData from "../global/no-data";
import { authenticatedFetch } from "@/lib/auth/authenticated-fetch";

const NEW_MATERIAL_UUID = "__new_material__";

export default function MaterialEditTable() {
    const [materials, setMaterials] = useState<Materials[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingUuid, setEditingUuid] = useState<string | null>(null);
    const [editedMaterial, setEditedMaterial] = useState<Partial<Materials>>({});

    useEffect(() => {
        async function getMaterials() {
            try {
                setLoading(true);
                setError("");

                const response = await authenticatedFetch("/api/get-materials", {
                    cache: "no-store",
                });

                const result = await response.json();

                if (!result.success) {
                    throw new Error(result.error);
                }

                setMaterials(result.data);
            } catch (error) {
                console.error(error);
                setError("Failed to load materials.");
            } finally {
                setLoading(false);
            }
        }

        getMaterials();
    }, []);

    function handleAddMaterial() {
        if (editingUuid) return;

        const newMaterial: Materials = {
            uuid: NEW_MATERIAL_UUID,
            id: "",
            name: "",
            dateCreated: new Date().toISOString(),
            dateModified: new Date().toISOString(),
        };

        setMaterials((current) => [newMaterial, ...current]);
        setEditingUuid(NEW_MATERIAL_UUID);
        setEditedMaterial(newMaterial);
    }

    function handleEdit(material: Materials) {
        setEditingUuid(material.uuid);
        setEditedMaterial({ ...material });
    }

    function handleCancel() {
        if (editingUuid === NEW_MATERIAL_UUID) {
            setMaterials((current) =>
                current.filter(
                    (material) => material.uuid !== NEW_MATERIAL_UUID
                )
            );
        }

        setEditingUuid(null);
        setEditedMaterial({});
    }

    async function handleSave() {
        try {
            const isNewMaterial = editingUuid === NEW_MATERIAL_UUID;

            const response = await authenticatedFetch("/api/upsert-material", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uuid: isNewMaterial ? undefined : editedMaterial.uuid,
                    id: editedMaterial.id,
                    name: editedMaterial.name,
                }),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error);
            }

            setMaterials((current) =>
                current
                    .map((material) =>
                        material.uuid === editingUuid
                            ? {
                                ...material,
                                uuid: result.uuid ?? material.uuid,
                                id: editedMaterial.id ?? material.id,
                                name: editedMaterial.name ?? material.name,
                                dateModified: new Date().toISOString(),
                            }
                            : material
                    )
                    .sort((a, b) => a.name.localeCompare(b.name))
            );

            setEditingUuid(null);
            setEditedMaterial({});
        } catch (error) {
            console.error(error);
            setError("Failed to save material.");
        }
    }

    async function handleDelete(material: Materials) {
        try {
            const response = await authenticatedFetch(`/api/delete-material?uuid=${material.uuid}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error);
            }

            setMaterials((current) =>
                current.filter((item) => item.uuid !== material.uuid)
            );
        } catch (error) {
            console.error(error);
            setError("Failed to delete material.");
        }
    }

    if (loading) {
        return <div className="text-xl font-bold h-full"><Loading /></div>;
    }

    if (error) {
        return <div className="text-xl font-bold text-danger">{error}</div>;
    }

    return (
        <div className="flex w-full flex-col items-center justify-center gap-8 pt-2 text-base">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Material Name</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        materials.length === 0
                            ? <TableRow>
                                <TableCell colSpan={4} className="py-16">
                                    <NoData />
                                </TableCell>
                            </TableRow>
                            : materials.map((material) => {
                                const isEditing = editingUuid === material.uuid;

                                return (
                                    <TableRow key={material.uuid}>
                                        <TableCell className="align-middle">
                                            {isEditing ? (
                                                <Input
                                                    value={editedMaterial.name ?? ""}
                                                    placeholder="Material name"
                                                    onChange={(event) =>
                                                        setEditedMaterial((prev) => ({
                                                            ...prev,
                                                            name: event.target.value,
                                                        }))
                                                    }
                                                    className="w-56"
                                                />
                                            ) : (
                                                <span className="text-lg font-semibold">
                                                    {material.name}
                                                </span>
                                            )}
                                        </TableCell>

                                        <TableCell className="align-middle">
                                            {isEditing ? (
                                                <Input
                                                    value={editedMaterial.id ?? ""}
                                                    placeholder="PLA"
                                                    onChange={(event) =>
                                                        setEditedMaterial((prev) => ({
                                                            ...prev,
                                                            id: event.target.value.toUpperCase(),
                                                        }))
                                                    }
                                                    className="w-24 uppercase"
                                                />
                                            ) : (
                                                material.id
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
                                                        >
                                                            <CheckIcon />
                                                            <span>Save</span>
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
                                                                handleEdit(material)
                                                            }
                                                        >
                                                            <PencilIcon />
                                                            <span>Edit</span>
                                                        </Button>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="danger"
                                                                    className="gap-2"
                                                                >
                                                                    <Trash2Icon />
                                                                    <span>Delete</span>
                                                                </Button>
                                                            </AlertDialogTrigger>

                                                            <AlertDialogContent className="w-96 p-4">
                                                                <AlertDialogHeader className="flex flex-col gap-1 p-2 pb-4 text-base font-base">
                                                                    <AlertDialogTitle className="text-lg font-bold">
                                                                        Delete{" "}
                                                                        {material.name}
                                                                    </AlertDialogTitle>

                                                                    <AlertDialogDescription>
                                                                        Are you sure you
                                                                        want to delete{" "}
                                                                        <span className="font-semibold">
                                                                            {
                                                                                material.name
                                                                            }
                                                                        </span>
                                                                        ? This cannot be
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
                                                                                material
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
                    }
                </TableBody>
            </Table>

            <div className="flex w-full flex-row items-center justify-start">
                <Button
                    variant="default"
                    size="lg"
                    className="bg-success hover:bg-success/80"
                    onClick={handleAddMaterial}
                    disabled={!!editingUuid}
                >
                    <div className="flex flex-row items-center justify-center gap-2">
                        <PlusIcon />
                        <span>Add Material</span>
                    </div>
                </Button>
            </div>
        </div>
    );
}