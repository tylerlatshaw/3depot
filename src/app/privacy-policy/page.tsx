import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import PolicyCTA from "@/components/policies/policy-cta";
import { Chip } from "@/components/ui/chip";
import PolicyContainer from "@/components/policies/policy-container";
import { PrivacyPolicyText } from "@/lib/legal/privacy-policy";

export default function PrivacyPolicy() {
    return (<div className="w-full flex flex-col items-center justify-start min-h-screen">
        <Navbar />

        <main className="flex flex-col flex-1 items-start my-8 md:my-16 w-full md:max-w-4xl px-4 md:px-0 gap-8 md:gap-12">

            <div className="flex flex-col flex-1 items-start w-full gap-4">
                <Chip variant={"info"}>Legal</Chip>

                <h1 className="text-3xl md:text-4xl font-bold tracking-wide">Privacy Policy</h1>

                <span className="text-muted-foreground w-full md:w-3/4">
                    We take your privacy seriously. This policy explains what data we collect, how we use it, and the controls you have over it.
                </span>

                <span className="text-muted-foreground w-full md:w-3/4 flex flex-col md:flex-row md:gap-2">
                    <span>Last Updated: June 12, 2026</span>
                    <span className="hidden md:inline">•</span>
                    <span>Effective Date: June 10, 2026</span>
                </span>
            </div>

            <hr className="border border-accent/50 w-full" />

            <PolicyContainer policy={PrivacyPolicyText} />

            <PolicyCTA />

        </main>

        <Footer />
    </div >);
}
