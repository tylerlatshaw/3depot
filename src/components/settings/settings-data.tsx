import { getMaterials } from "@/lib/data/get-materials";
import SettingsContainer from "./settings-container";
import { getBrands } from "@/lib/data/get-brands";

export default async function SettingsData() {
    const brands = await getBrands();
    const materials = await getMaterials();

    return <SettingsContainer brands={brands} materials={materials} />;
}