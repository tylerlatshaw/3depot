import PageHeader from "@/components/global/page-header";
import BrandEditTable from "@/components/settings/brand-table";
import SettingsLinkMenu from "@/components/settings/dashboard-link-menu";
import { cookies } from "next/headers";

export default async function SettingsPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    return (<div className="flex h-screen overflow-hidden">
        <div className="flex flex-col w-64 h-full bg-menu border-r border-accent">

            <div className="h-[86px] p-4 border-b-2 border-accent flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Settings</h1>
                <span className="text-xs font-light uppercase">Select a category</span>
            </div>

            {/* Links */}
            <div className="grow p-4">
                <div className="flex flex-col gap-2 w-full">
                    <SettingsLinkMenu />
                </div>
            </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
            <PageHeader pageName="Edit Brands" />

            <div className="px-8 py-4 h-full overflow-y-auto">
                <BrandEditTable />
            </div>
        </div>
    </div>
    );
}