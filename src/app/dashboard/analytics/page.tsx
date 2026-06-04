import PageHeader from "@/components/global/page-header";
import { SetPageTitle } from "@/components/global/set-page-title";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Analytics",
};

export default async function AnalyticsPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    return (<>
        <div className="flex min-w-0 flex-1 flex-col">
            <PageHeader />
            <main className="min-h-0 flex-1 overflow-auto">
                <SetPageTitle title="Analytics" />

                <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6">

                    Page content

                </div>
            </main>
        </div>
    </>);
}