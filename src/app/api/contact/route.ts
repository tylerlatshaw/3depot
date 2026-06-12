import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const reason = String(body.reason ?? "").trim();
        const name = String(body.name ?? "").trim();
        const email = String(body.email ?? "").trim();
        const message = String(body.message ?? "").trim();
        const pageUrl = String(body.pageUrl ?? "");
        const referrer = String(body.referrer ?? "");
        const userAgent = request.headers.get("user-agent") ?? "";
        const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
        const ip = forwardedFor.split(",")[0].trim();

        if (!reason || !name || !email || !message) {
            return NextResponse.json(
                {
                    success: false,
                    error: "All fields are required.",
                },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "A valid email is required.",
                },
                { status: 400 }
            );
        }

        const now = FieldValue.serverTimestamp();

        const logRef = await adminDb
            .collection("contact_messages")
            .add({
                reason,
                name,
                email,
                message,
                pageUrl,
                referrer,
                status: "pending",
                date_created: now,
                date_modified: now,
                userAgent,
                ip,
            });

        try {
            const result = await resend.emails.send({
                from:
                    process.env.CONTACT_FROM_EMAIL ??
                    "3Depot <noreply@example.com>",
                to: process.env.CONTACT_TO_EMAIL ?? "",
                replyTo: email,
                subject: `3Depot Contact Form: ${reason}`,
                html: `
                    <div>
                        <h2>New 3Depot Contact Message</h2>

                        <p><strong>Topic:</strong> ${reason}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>

                        <p><strong>Page:</strong> ${pageUrl || "Unknown"}</p>
                        <p><strong>Referrer:</strong> ${referrer || "Direct Visit"}</p>

                        <p><strong>User Agent:</strong> ${userAgent || "Unknown"}</p>
                        <p><strong>IP:</strong> ${ip || "Unknown"}</p>

                        <hr />

                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, "<br />")}</p>
                    </div>
                `,
            });

            await logRef.update({
                status: "sent",
                resend_id: result.data?.id ?? null,
                date_modified: FieldValue.serverTimestamp(),
            });

            return NextResponse.json({
                success: true,
            });
        } catch (emailError) {
            console.error("Resend error:", emailError);

            await logRef.update({
                status: "failed",
                error:
                    emailError instanceof Error
                        ? emailError.message
                        : "Unknown email error",
                date_modified: FieldValue.serverTimestamp(),
            });

            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to send message.",
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Contact form error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to submit contact form.",
            },
            { status: 500 }
        );
    }
}