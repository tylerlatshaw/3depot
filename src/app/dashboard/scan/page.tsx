import PageHeader from "@/components/global/page-header";
import ScanEntryContainer from "@/components/scan/scan-entry-container";
import { Filament } from "@/lib/types";
import { cookies } from "next/headers";

export default async function ScanPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-filament`, {
        cache: "no-store",
        headers: {
            Cookie: `session=${session}`,
        },
    });

    const result: {
        success: boolean;
        data: Filament[];
    } = await response.json();

    return (<>
        <PageHeader pageName="Scan" />

        <div className="flex h-[calc(100vh-192px)] items-center justify-center px-8 py-4">
            <ScanEntryContainer inventory={result.data} />
        </div>
    </>
    );
}