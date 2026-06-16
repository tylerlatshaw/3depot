import { PolicySection } from "@/lib/types";
import Link from "next/link";

function Section({
    title,
    details
}: PolicySection) {
    const anchor = title
        .replace(/\s+/g, "-")
        .toLowerCase();

    return (
        <div className="flex flex-col w-full text-base font-base text-foreground gap-6">
            <span id={anchor} className="scroll-mt-8 text-lg font-bold">{title}</span>

            {
                details.map((detail, i) => {
                    return <div className="flex flex-col items-start gap-2" key={i}>
                        {
                            detail.header &&
                            <div
                                className="text-base font-bold"
                                dangerouslySetInnerHTML={{
                                    __html: detail.header,
                                }}
                            />
                        }

                        <div
                            className="
                                text-base 
                                font-base 
                                text-muted-foreground 
                                [&_ul]:list-disc 
                                [&_ul]:list-inside 
                                [&_a]:text-info
                                [&_a]:hover:underline"
                            dangerouslySetInnerHTML={{
                                __html: detail.text,
                            }}
                        />
                    </div>;
                })
            }
        </div>
    );
}

export default function PolicyContainer({ policy }: { policy: PolicySection[] }) {

    return (
        <div className="flex flex-col items-start gap-8">

            {/* Contents */}
            <div className="flex flex-col items-start gap-2 w-full rounded-lg bg-accent/20 border border-accent p-6 md:p-8">
                <span className="font-bold">Contents</span>

                <ol className="list-inside list-decimal text-muted-foreground">
                    {
                        policy.map((section, i) => {
                            const anchor = section.title
                                .replace(/\s+/g, "-")
                                .toLowerCase();

                            return <li key={i + 1}>
                                <Link
                                    href={`#${anchor}`}
                                    className="font-bold hover:text-foreground hover:underline"
                                >
                                    {section.title}
                                </Link>
                            </li>;
                        })
                    }
                </ol>
            </div>

            {/* Policy */}
            {
                policy.map((section, i) => {
                    return <div className="flex gap-2 w-full" key={i + 1}>
                        <span className="w-8 shrink-0 text-muted-foreground font-bold text-lg">{(i + 1).toString().padStart(2, "0")}</span>

                        <Section title={section.title} details={section.details} />
                    </div>;
                })
            }
        </div>
    );
}