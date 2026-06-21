import { getFilamentWithHistory } from "@/lib/data/get-filament-with-history";
import AnalyticsContainer from "./analytics-container";

export default async function AnalyticsData() {
    const inventory = await getFilamentWithHistory();

    return <AnalyticsContainer inventory={inventory} />;
}