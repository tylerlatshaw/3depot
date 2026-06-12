import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { Chip } from "@/components/ui/chip";
import ContactForm from "@/components/contact/contact-form";
import ContactMethods from "@/components/contact/contact-methods";

export default function Contact() {
    return (<div className="w-full flex flex-col items-center justify-start">
        <Navbar />

        <main className="flex flex-col flex-1 items-start my-16 w-full max-w-4xl gap-12">
            <div className="flex flex-col flex-1 items-start w-full gap-4">
                <Chip variant={"info"}>Get In Touch</Chip>

                <h1 className="text-4xl font-bold tracking-wide">Contact Us</h1>

                <span className="text-muted-foreground w-3/4">
                    Have a question, found a bug, or just want to say hello? We&apos;re a small team and we read every message.
                </span>
            </div>

            <hr className="border border-accent/50 w-full" />

            <div className="flex flex-row justify-between gap-8 w-full">
                <ContactForm />

                <ContactMethods />
            </div>
        </main>

        <Footer />
    </div >);
}
