import AnalyticsData from "@/components/analytics/analytics-data";
import AnalyticsLoading from "@/components/analytics/analytics-loading";
import PageHeader from "@/components/global/page-header";
import { SetPageTitle } from "@/components/global/set-page-title";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function AnalyticsPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    return (
        <div className="flex min-w-0 flex-1 flex-col">
            <PageHeader />

            <main className="min-h-0 flex-1 overflow-auto">
                <SetPageTitle title="Analytics" />

                <div className="min-h-0 flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6">
                    <Suspense fallback={<AnalyticsLoading />}>
                        <AnalyticsData />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}