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

        const workshopName = decoded.name
            ? `${decoded.name.split(" ")[0]}'s Workshop`
            : "Workshop";

        return (
            <div className="flex h-screen overflow-hidden bg-background">
                {/* Desktop Sidebar */}
                <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-accent bg-menu md:flex">
                    <LogoBlock workshopName={workshopName} />

                    <div className="grow border-b-2 border-accent p-4">
                        <div className="flex w-full flex-col gap-2">
                            <DashboardLinkMenu />
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between p-4">
                        <SignOutButton />
                        <DarkModeToggle />
                    </div>
                </aside>

                {/* Mobile Layout Shell */}
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

                    {/* Mobile Top Bar */}
                    <header className="flex h-[86px] shrink-0 items-center justify-between border-b-2 border-accent bg-menu px-4 md:hidden">
                        <MobileLogo workshopName={workshopName} />

                        <div className="flex items-center gap-2">
                            <DarkModeToggle />
                            <SignOutButton />
                        </div>
                    </header>

                    {/* Main Content */}
                    <PageHeaderProvider>
                        <main className="min-h-0 flex-1 overflow-hidden pb-20 md:pb-0">
                            <div className="h-full overflow-y-auto">
                                <Suspense fallback={<Loading />}>
                                    {children}
                                </Suspense>
                            </div>
                        </main>
                    </PageHeaderProvider>

                    {/* Mobile Bottom Nav */}
                    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-accent bg-menu px-2 py-3 md:hidden flex flex-row items-center justify-between">
                        <DashboardLinkMenu />
                    </nav>
                </div>
            </div>
        );
    } catch {
        return <div>Invalid session</div>;
    }
}

function LogoBlock({ workshopName }: { workshopName: string }) {
    return (
        <div className="h-[86px] border-b-2 border-accent p-4">
            <Link
                href="/dashboard"
                className="group flex items-center justify-center gap-3"
            >
                <div className="aspect-square rounded-lg bg-primary p-2">
                    <Rotate3DIcon className="size-8 text-white" />
                </div>

                <div className="flex flex-col gap-1">
                    <span className="logo text-2xl transition-colors group-hover:text-primary">
                        3Depot
                    </span>
                    <span className="text-xs font-light uppercase transition-colors group-hover:text-primary">
                        {workshopName}
                    </span>
                </div>
            </Link>
        </div>
    );
}

function MobileLogo({ workshopName }: { workshopName: string }) {
    return (
        <Link href="/dashboard" className="group flex items-center gap-3">
            <div className="aspect-square rounded-lg bg-primary p-2">
                <Rotate3DIcon className="size-7 text-white" />
            </div>

            <div className="flex flex-col gap-1">
                <span className="logo text-2xl transition-colors group-hover:text-primary">
                    3Depot
                </span>
                <span className="text-xs font-light uppercase transition-colors group-hover:text-primary">
                    {workshopName}
                </span>
            </div>
        </Link>
    );
}