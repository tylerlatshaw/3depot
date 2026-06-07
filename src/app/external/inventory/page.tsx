import ExternalData from "@/components/external/external-data";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Inventory",
};

export default async function InventoryPage() {
    return (<>
        <div className="flex h-screen flex-col overflow-hidden">
            <ExternalData />
        </div>
    </>);
}