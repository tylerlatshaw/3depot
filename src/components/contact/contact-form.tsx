"use client";

import { contactCategories } from "@/lib/contact/contact-categories";
import {
    Field,
    FieldContent,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { SendIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { showToast } from "../ui/toast";

export default function ContactForm() {
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            setLoading(true);

            const payload = {
                reason,
                name: String(formData.get("name") ?? ""),
                email: String(formData.get("email") ?? ""),
                message: String(formData.get("message") ?? ""),
                pageUrl: window.location.href,
                referrer: document.referrer,
            };

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error);
            }

            form.reset();
            setReason("");

            showToast({
                message: "Message sent successfully",
                variant: "success",
            });
        } catch (error) {
            console.error(error);

            showToast({
                message: "Failed to send message",
                variant: "danger",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex grow flex-col items-start justify-center gap-6 rounded-xl bg-card p-6"
        >
            <span className="text-lg font-bold">
                Send Us a Message
            </span>

            <Field className="w-full">
                <FieldContent className="w-full">
                    <FieldLabel
                        htmlFor="reason"
                        className="font-semibold uppercase"
                    >
                        Topic
                    </FieldLabel>
                </FieldContent>

                <Select
                    name="reason"
                    value={reason}
                    onValueChange={setReason}
                    required
                >
                    <SelectTrigger
                        id="reason"
                        className="w-full border-foreground px-4 py-6 text-base font-semibold"
                    >
                        <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>

                    <SelectContent className="w-full">
                        <SelectGroup className="border border-accent bg-background">
                            {contactCategories.map((category) => (
                                <SelectItem
                                    key={category}
                                    value={category}
                                    className="text-base font-semibold"
                                >
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>

            <div className="flex w-full flex-col items-stretch gap-4 md:flex-row">
                <Field className="min-w-0 flex-1">
                    <FieldContent>
                        <FieldLabel
                            htmlFor="name"
                            className="font-semibold uppercase"
                        >
                            Name
                        </FieldLabel>
                    </FieldContent>

                    <div className="relative w-full overflow-hidden rounded-lg border border-input focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="Enter Your Name"
                            className="w-full border-0 px-4 py-6 text-base font-semibold"
                        />
                    </div>
                </Field>

                <Field className="min-w-0 flex-1">
                    <FieldContent>
                        <FieldLabel
                            htmlFor="email"
                            className="font-semibold uppercase"
                        >
                            Email
                        </FieldLabel>
                    </FieldContent>

                    <div className="relative w-full overflow-hidden rounded-lg border border-input focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            required
                            placeholder="Enter Your Email"
                            className="w-full border-0 px-4 py-6 text-base font-semibold"
                        />
                    </div>
                </Field>
            </div>

            <Field className="w-full">
                <FieldContent>
                    <FieldLabel
                        htmlFor="message"
                        className="font-semibold uppercase"
                    >
                        Message
                    </FieldLabel>
                </FieldContent>

                <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="How can we help?"
                    className="min-h-40 resize-none px-4 py-3 text-base font-semibold"
                />
            </Field>

            <div className="flex w-full flex-col items-center justify-center gap-2">
                <Button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center"
                    size="lg"
                >
                    <SendIcon className="size-5" />
                    <span className="py-2 font-bold">
                        {loading ? "Sending..." : "Send Message"}
                    </span>
                </Button>

                <span className="text-sm text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <Link
                        href="/privacy-policy"
                        target="_blank"
                        className="text-foreground hover:underline"
                    >
                        Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/terms-of-use"
                        target="_blank"
                        className="text-foreground hover:underline"
                    >
                        Terms of Use
                    </Link>
                    .
                </span>
            </div>
        </form>
    );
}