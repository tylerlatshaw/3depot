import DashboardContainer from "@/components/dashboard/dashboard-container";
import PageHeader from "@/components/global/page-header";
import { Filament, FilamentWithHistory } from "@/lib/types";
import { flattenFilamentHistory } from "@/utilities/filament-functions";
import { cookies } from "next/headers";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-filament-with-history`, {
        cache: "no-store",
        headers: {
            Cookie: `session=${session}`,
        },
    });

    const result: {
        success: boolean;
        data: FilamentWithHistory[];
    } = await response.json();

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <PageHeader pageName="Dashboard" />

            <div className="min-h-0 flex-1 overflow-y-auto px-8 py-4">

                <DashboardContainer inventory={result.data} />

            </div>
        </div>

    );
}