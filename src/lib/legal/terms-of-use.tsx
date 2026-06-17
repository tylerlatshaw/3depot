/* eslint-disable quotes */
import { PolicySection } from "../types";

export const TermsOfUsePolicyText: PolicySection[] = [
    {
        title: "Acceptance of Terms",
        details: [
            {
                text: `By accessing or using 3Depot (&quot;<strong>The Website</strong>&quot;), you agree to be bound by these Terms of Use. If you do not agree with these terms, you may not access or use the website.`
            }
        ]
    },
    {
        title: "Eligibility and Accounts",
        details: [
            {
                text: `To access certain features of the website, you may be required to sign in using a supported authentication provider. You are responsible for maintaining the security of your account and for all activities that occur under your account.`
            },
            {
                text: `You agree to provide accurate and complete information and to keep your account information up to date.`
            }
        ]
    },
    {
        title: "Acceptable Use",
        details: [
            {
                text: `You agree to use the website only for lawful purposes and in accordance with these Terms of Use.`
            },
            {
                text: `<ul> <li>Attempt to gain unauthorized access to the website, its systems, or other user accounts</li> <li>Upload, distribute, or transmit malicious software, viruses, or harmful code</li> <li>Interfere with or disrupt the operation of the website</li> <li>Use automated systems to access the website in a manner that places an unreasonable load on our infrastructure</li> <li>Use the website for any unlawful, fraudulent, or abusive purpose</li></ul>`
            }
        ]
    },
    {
        title: "User Content and Data",
        details: [
            {
                text: `You retain ownership of any information, data, or content that you submit to the website. By submitting content, you grant us the limited rights necessary to store, process, and display that content solely for the purpose of providing the website and its features.`
            }
        ]
    },
    {
        title: "Intellectual Property",
        details: [
            {
                text: `The website, including its design, branding, software, features, and content, is owned by Tyler Latshaw and 3Depot unless otherwise stated and is protected by applicable intellectual property laws.`
            },
            {
                text: `You may not copy, reproduce, distribute, modify, reverse engineer, or create derivative works from any portion of the website except as expressly permitted by law.`
            }
        ]
    },
    {
        title: "Availability of Service",
        details: [
            {
                text: `The website is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no guarantees regarding uptime, availability, reliability, or uninterrupted access to the website.`
            },
            {
                text: `We reserve the right to modify, suspend, discontinue, or remove any part of the website at any time without prior notice.`
            }
        ]
    },
    {
        title: "Limitation of Liability",
        details: [
            {
                text: `To the fullest extent permitted by law, 3Depot, its owner, affiliates, service providers, and contributors shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages arising from or related to your use of the website.`
            },
            {
                text: `Your use of the website is at your own risk.`
            }
        ]
    },
    {
        title: "Termination",
        details: [
            {
                text: `We reserve the right to suspend, restrict, or terminate your access to the website at any time, with or without notice, for any reason, including violations of these Terms of Use.`
            }
        ]
    },
    {
        title: "Changes to These Terms",
        details: [
            {
                text: `We may update these Terms of Use from time to time. Any changes will become effective upon posting the updated version on the website. Continued use of the website after changes are posted constitutes acceptance of the revised terms.`
            }
        ]
    },
    {
        title: "Governing Law",
        details: [
            {
                text: `These Terms of Use shall be governed by and construed in accordance with the laws of the Commonwealth of Pennsylvania, without regard to its conflict of law provisions.`
            }
        ]
    },
    {
        title: "Contact Information",
        details: [
            {
                text: `If you have any questions regarding these Terms of Use, please contact us at <a href="mailto:${process.env.NEXT_PUBLIC_LEGAL_EMAIL}">${process.env.NEXT_PUBLIC_LEGAL_EMAIL}</a>.`
            }
        ]
    }
];