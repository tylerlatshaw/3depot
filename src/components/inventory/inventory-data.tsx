import { getFilament } from "@/lib/data/get-filament";
import InventoryContainer from "./inventory-container";

export default async function InventoryData() {
    const inventory = await getFilament();

    return <InventoryContainer inventory={inventory} />;
}