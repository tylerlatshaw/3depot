import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import PolicyContainer from "@/components/policies/policy-container";
import PolicyCTA from "@/components/policies/policy-cta";
import { Chip } from "@/components/ui/chip";
import { TermsOfUsePolicyText } from "@/lib/legal/terms-of-use";

export default function TermsOfUse() {
    return (<div className="w-full flex flex-col items-center justify-start">
        <Navbar />

        <main className="flex flex-col flex-1 items-start my-8 md:my-16 w-full md:max-w-4xl px-4 md:px-0 gap-8 md:gap-12">

            <div className="flex flex-col flex-1 items-start w-full gap-4">
                <Chip variant={"info"}>Legal</Chip>

                <h1 className="text-3xl md:text-4xl font-bold tracking-wide">Terms of Use</h1>

                <span className="text-muted-foreground w-full md:w-3/4">
                    Please read these terms carefully before using 3Depot. They describe your rights and responsibilities as a user of our service.
                </span>

                <span className="text-muted-foreground w-full md:w-3/4 flex flex-col md:flex-row md:gap-2">
                    <span>Last Updated: June 12, 2026</span>
                    <span className="hidden md:inline">•</span>
                    <span>Effective Date: June 10, 2026</span>
                </span>
            </div>

            <hr className="border border-accent/50 w-full" />

            <PolicyContainer policy={TermsOfUsePolicyText} />

            <PolicyCTA />

        </main>

        <Footer />
    </div >);
}
