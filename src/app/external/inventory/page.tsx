import ExternalData from "@/components/external/external-data";
import Loading from "@/components/ui/loading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Inventory",
};

export default async function InventoryPage() {
    return (<>
        <div className="flex h-screen flex-col overflow-hidden">
            <Suspense fallback={<Loading />}>
                <ExternalData />
            </Suspense>
        </div>
    </>);
}