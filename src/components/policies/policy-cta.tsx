import Link from "next/link";

export default function PolicyCTA() {

    return (<div className="flex flex-col items-center justify-center gap-12 w-full">
        <hr className="border border-accent/50 w-full" />

        <div className="flex flex-col items-start bg-info/10 border border-info rounded-xl w-full px-16 py-12 gap-4">

            <span className="font-bold text-lg">Questions about this policy?</span>

            <span className="text-muted-foreground">Feel free to <Link href={"/contact"} className="text-info font-semibold hover:underline">contact us</Link> or send us an email at the address listed below.</span>

            <span className="text-info font-bold hover:underline"><Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</Link></span>

        </div>
    </div>);
}