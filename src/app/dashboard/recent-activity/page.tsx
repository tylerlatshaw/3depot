import PageHeader from "@/components/global/page-header";
import { SetPageTitle } from "@/components/global/set-page-title";
import AllHistoryTable from "@/components/recent-activity/all-history-table";
import { getFilamentWithHistory } from "@/lib/data/get-filament-with-history";
import { cookies } from "next/headers";

export default async function AnalyticsPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    const inventory = await getFilamentWithHistory();

    return (<>
        <div className="flex min-w-0 flex-1 flex-col">
            <PageHeader />
            <main className="min-h-0 flex-1 overflow-auto">
                <SetPageTitle title="Recent Activity" />

                <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6">

                    <AllHistoryTable inventory={inventory} />

                </div>
            </main>
        </div>
    </>);
}