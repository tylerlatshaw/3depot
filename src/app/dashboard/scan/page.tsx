import PageHeader from "@/components/global/page-header";
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
        <PageHeader pageName="Scan" />

        <div className="flex h-[calc(100vh-86px)] px-8 py-4 overflow-y-auto">
            <ScanEntryContainer inventory={inventory} />
        </div>
    </>
    );
}