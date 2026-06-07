import PageHeader from "@/components/global/page-header";
import { SetPageTitle } from "@/components/global/set-page-title";
import ActivityData from "@/components/recent-activity/activity-data";
import Loading from "@/components/ui/loading";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Recent Activity",
};

export default async function RecentActivityPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    return (<>
        <div className="flex min-w-0 flex-1 flex-col">
            <PageHeader />
            <main className="min-h-0 flex-1 overflow-auto">
                <SetPageTitle title="Recent Activity" />

                <div className="min-h-0 flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6">
                    <Suspense fallback={<Loading />}>
                        <ActivityData />
                    </Suspense>
                </div>
            </main>
        </div>
    </>);
}