import { Brands, Filament, Materials } from "@/lib/types";
import { useEffect, useState } from "react";
import buildInitialFilament from "../utilities/build-initial-filament";

type Props = {
    newFilamentId?: string;
    selectedFilament?: Filament;
};

export function useFilamentForm({
    newFilamentId,
    selectedFilament,
}: Props) {
    const [editedData, setEditedData] = useState<Partial<Filament>>(() =>
        buildInitialFilament({
            newFilamentId,
            selectedFilament,
        })
    );

    const [swatchImage, setSwatchImage] = useState<File | null>(null);
    const [imageRemoved, setImageRemoved] = useState(false);

    const [brands, setBrands] = useState<Brands[]>([]);
    const [materials, setMaterials] = useState<Materials[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const [brandsResponse, materialsResponse] = await Promise.all([
                    fetch("/api/get-brands", {
                        cache: "no-store",
                    }),
                    fetch("/api/get-materials", {
                        cache: "no-store",
                    }),
                ]);

                const brandsResult = await brandsResponse.json();
                const materialsResult = await materialsResponse.json();

                if (!brandsResult.success) {
                    throw new Error(brandsResult.error);
                }

                if (!materialsResult.success) {
                    throw new Error(materialsResult.error);
                }

                setBrands(brandsResult.data);
                setMaterials(materialsResult.data);
            } catch (error) {
                console.error(error);
                setError("Failed to load form data.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    function updateField<K extends keyof Filament>(
        key: K,
        value: Filament[K]
    ) {
        setEditedData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    return {
        editedData,
        setEditedData,
        updateField,

        swatchImage,
        setSwatchImage,

        imageRemoved,
        setImageRemoved,

        brands,
        materials,

        loading,
        error,
    };
}