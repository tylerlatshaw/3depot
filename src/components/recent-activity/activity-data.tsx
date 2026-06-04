import AllHistoryTable from "./all-history-table";
import { getFilamentWithHistory } from "@/lib/data/get-filament-with-history";

export default async function ActivityData() {
    const inventory = await getFilamentWithHistory();

    return <AllHistoryTable inventory={inventory} />;
}