import PageHeader from "@/components/global/page-header";
import { SetPageTitle } from "@/components/global/set-page-title";
import SettingsLinkMenu from "@/components/settings/settings-link-menu";
import MaterialEditTable from "@/components/settings/material-table";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edit Materials",
};

export default async function SettingsPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    return (<>
        <SettingsLinkMenu />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <PageHeader />

            <SetPageTitle title="Edit Materials" />

            <main className="min-h-0 flex-1 overflow-auto px-8 py-6">

                <MaterialEditTable />

            </main>
        </div>
    </>);
}