import PageHeader from "@/components/global/page-header";
import { cookies } from "next/headers";

export default async function SettingsPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    return (<>
        <PageHeader pageName="Settings" />

        <div className="px-8 py-4">
            Page content
        </div>
    </>
    );
}