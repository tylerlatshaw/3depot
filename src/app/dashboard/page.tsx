import DashboardContainer from "@/components/dashboard/dashboard-container";
import PageHeader from "@/components/global/page-header";
import { getFilamentWithHistory } from "@/lib/data/get-filament-with-history";
import { cookies } from "next/headers";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    const inventory = await getFilamentWithHistory();

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <PageHeader pageName="Dashboard" />

            <div className="min-h-0 flex-1 overflow-y-auto px-8 py-4">

                <DashboardContainer inventory={inventory} />

            </div>
        </div>

    );
}