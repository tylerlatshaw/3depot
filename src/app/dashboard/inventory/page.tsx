import PageHeader from "@/components/global/page-header";
import InventoryContainer from "@/components/inventory/inventory-container";
import { Filament } from "@/lib/types";
import { cookies } from "next/headers";

export default async function InventoryPage() {
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

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <PageHeader pageName="Inventory" />

            <div className="px-8 py-4 h-full overflow-y-auto">
                <InventoryContainer inventory={result.data} />
            </div>
        </div>

    );
}