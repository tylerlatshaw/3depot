import DashboardContainer from "@/components/dashboard/dashboard-container";
import { getFilamentWithHistory } from "@/lib/data/get-filament-with-history";

export default async function DashboardData() {
    const inventory = await getFilamentWithHistory();

    return <DashboardContainer inventory={inventory} />;
}