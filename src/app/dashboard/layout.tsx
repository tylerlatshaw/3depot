/* eslint-disable react-hooks/error-boundaries */
import { cookies } from "next/headers";
import { DarkModeToggle } from "@/components/global/dark-mode-toggle";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import DashboardLinkMenu from "@/components/global/dashboard-link-menu";
import { adminAuth } from "@/lib/firebase-admin";
import { Rotate3DIcon } from "lucide-react";
import { SignOutButton } from "@/components/global/sign-out-button";
import { PageHeaderProvider } from "@/contexts/page-header-context";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
        redirect("/sign-in", RedirectType.replace);
    }

    try {
        const decoded = await adminAuth.verifySessionCookie(session, true);

        const workshopName = decoded.name ? decoded.name.split(" ")[0] + "'s Workshop" : "Workshop";

        return (
            <div className="flex h-screen overflow-hidden">

                {/* Sidebar */}
                <div className="flex flex-col w-64 h-full bg-menu border-r border-accent">

                    {/* Logo */}
                    <div className="h-[86px] p-4 border-b-2 border-accent">
                        <Link
                            href={"/dashboard"}
                            className="group flex items-center justify-center gap-3"
                        >
                            <div className="bg-primary aspect-square rounded-lg p-2">
                                <span className="text-white">
                                    <Rotate3DIcon className="size-8" />
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-2xl logo group-hover:text-primary transition-colors">
                                    3Depot
                                </span>
                                <span className="text-xs font-light uppercase group-hover:text-primary transition-colors">
                                    {workshopName}
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="grow p-4 border-b-2 border-accent">
                        <div className="flex flex-col gap-2 w-full">
                            <DashboardLinkMenu />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-row items-center justify-between p-4">
                        <SignOutButton />
                        <DarkModeToggle />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                    <PageHeaderProvider>
                        <div className="flex h-screen overflow-hidden bg-background">
                            <Suspense fallback={<Loading />}>
                                {children}
                            </Suspense>
                        </div>
                    </PageHeaderProvider>
                </div>
            </div>

        );
    } catch {
        return <div>Invalid session</div>;
    };
}
