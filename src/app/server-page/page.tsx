import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        return <div>Not authorized</div>;
    }

    try {
        const decoded = await adminAuth.verifySessionCookie(session, true);

        return (
            // eslint-disable-next-line react-hooks/error-boundaries
            <div>
                Welcome {decoded.email}
            </div>
        );
    } catch {
        return <div>Invalid session</div>;
    }
}