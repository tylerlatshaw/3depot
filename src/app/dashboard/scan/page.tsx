import PageHeader from "@/components/global/page-header";
import { SetPageTitle } from "@/components/global/set-page-title";
import ScanEntryContainer from "@/components/scan/scan-entry-container";
import { getFilament } from "@/lib/data/get-filament";
import { cookies } from "next/headers";

export default async function ScanPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    const inventory = await getFilament();
    return (<>
        <div className="flex min-w-0 flex-1 flex-col">
            <PageHeader />
            <main className="min-h-0 flex-1 overflow-auto">
                <SetPageTitle title="Scan" />

                <div className="min-h-0 h-[calc(100vh-86px)] flex-1 overflow-y-auto px-8 py-6">

                    <ScanEntryContainer inventory={inventory} />

                </div>
            </main>
        </div>
    </>);
}