import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import PolicyContainer from "@/components/policies/policy-container";
import PolicyCTA from "@/components/policies/policy-cta";
import { Chip } from "@/components/ui/chip";
import { TermsOfUsePolicyText } from "@/lib/legal/terms-of-use";

export default function TermsOfUse() {
    return (<div className="w-full flex flex-col items-center justify-start">
        <Navbar />

        <main className="flex flex-col flex-1 items-start my-16 w-full max-w-4xl gap-12">

            <div className="flex flex-col flex-1 items-start w-full gap-4">
                <Chip variant={"info"}>Legal</Chip>

                <h1 className="text-4xl font-bold tracking-wide">Terms of Use</h1>

                <span className="text-muted-foreground w-3/4">
                    Please read these terms carefully before using 3Depot. They describe your rights and responsibilities as a user of our service.
                </span>

                <span className="text-muted-foreground w-3/4">
                    Last Updated: June 10, 2026 • Effective Date: June 10, 2026
                </span>
            </div>

            <hr className="border border-accent/50 w-full" />

            <PolicyContainer policy={TermsOfUsePolicyText} />

            <PolicyCTA />

        </main>

        <Footer />
    </div >);
}
