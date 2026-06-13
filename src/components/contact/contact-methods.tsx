import { MailIcon } from "lucide-react";
import Link from "next/link";

export default function ContactMethods() {

    return (<div className="flex flex-col items-start w-full md:w-fit gap-2">
        <span className="text-muted-foreground">Other Ways to Reach Us</span>

        <div className="flex flex-col items-start justify-center w-full bg-card px-6 py-4 rounded-xl">
            <div className="flex flex-row items-center justify-center gap-4">
                <div className="flex p-2 bg-success/50 text-success rounded-lg">
                    <MailIcon className="size-6" />
                </div>

                <div className="flex flex-col gap-0">
                    <span className="font-bold">Email:</span>
                    <span className="text-success font-semibold">
                        <Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</Link>
                    </span>
                </div>
            </div>
        </div>
    </div>);
}