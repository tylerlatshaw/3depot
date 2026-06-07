import { getFilament } from "@/lib/data/get-filament";
import ScanEntryContainer from "./scan-entry-container";

export default async function ScanData() {
    const inventory = await getFilament();

    return <ScanEntryContainer inventory={inventory} />;
}