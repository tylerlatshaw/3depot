/* eslint-disable quotes */
import { PolicySection } from "../types";

export const PrivacyPolicyText: PolicySection[] = [
    {
        title: "Introduction",
        details: [
            {
                text: `<p>This privacy notice for 3Depot (&quot;<strong>The Website</strong>,&quot; &quot;<strong>We</strong>,&quot; &quot;<strong>Us</strong>,&quot; or &quot;<strong>Our</strong>&quot;), describes how and why we might collect, store, use, and/or share (&quot;<strong>process</strong>&quot;) your information when you access our website (&quot;<strong>Services</strong>&quot;), such as when you:</p>`
            },
            {
                text: `<ul> <li>Visit our website at <a href=\"${process.env.NEXT_PUBLIC_BASE_URL}\" target=\"_blank\">${process.env.NEXT_PUBLIC_BASE_URL}</a>, or any website of ours that links to this privacy notice</li> <li>Engage with us in other related ways, including filling out any forms or accessing documents</li> </ul>`
            },
            {
                header: "Questions or concerns?",
                text: `Reading this privacy policy will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please email us at <a href="mailto:${process.env.NEXT_PUBLIC_LEGAL_EMAIL}">${process.env.NEXT_PUBLIC_LEGAL_EMAIL}</a>.`
            }
        ]
    },
    {
        title: "Summary of Key Points",
        details: [
            {
                header: "What personal information do we process?",
                text: `When you visit, use, or navigate the website, we may process personal information depending on how you interact with the website, the choices you make, and the features you use. Learn more about <a href="#personalinfo">personal information you disclose to us</a>.`
            },
            {
                header: "Do we process any sensitive personal information?",
                text: `We do not process sensitive personal information.`
            },
            {
                header: "Do we receive any information from third parties?",
                text: `We may receive certain information from third-party services that support the operation of the website. For example, when you choose to sign in using Google, we may receive information associated with your Google account, such as your name, email address, and profile image. We also use Google Analytics to help us understand how visitors interact with the website.`
            },
            {
                header: "How do we process your information?",
                text: `We process your information to provide, improve, and administer the website, communicate with you, for security and fraud prevention, and to comply with the law. We may also process your information for other purposes with your consent. We process your information only when we have a valid reason to do so. Learn more about <a href="#how-do-we-use-your-information">how we process your information</a>.`
            },
            {
                header: "In what situations and with which parties do we share personal information?",
                text: `We do not share personal information with third parties. Learn more about <a href="#when-and-with-whom-do-we-share-your-information">sharing your personal information</a>.`
            },
            {
                header: "How do we keep your information safe?",
                text: `We have technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about <a href="#how-do-we-keep-your-information-safe">how we keep your information safe</a>.`
            },
            {
                header: "What are your rights?",
                text: `Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a href="#privacyrights">your privacy rights</a>.`
            },
            {
                header: "How do you exercise your rights?",
                text: `The easiest way to exercise your rights is by submitting a <a href="mailto:${process.env.NEXT_PUBLIC_LEGAL_EMAIL}">data subject access request</a>. We will consider and act upon any request as necessary.`
            },
            {
                header: "How do I learn more?",
                text: `To learn more, read this policy in full.`
            }
        ]
    },
    {
        title: "What Information Do We Collect",
        details: [
            {
                header: `<div id="personalinfo">Personal information you disclose to us</div>`,
                text: `We collect personal information that you voluntarily provide to us when you create an account, sign in using Google, contact us, or otherwise interact with the website.`
            },
            {
                text: `Depending on how you use the website, this information may include but is not limited to:`
            },
            {
                text: `<ul><li>Your name</li><li>Your email address</li><li>Your picture/profile image</li></ul>`
            },
            {
                text: `All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.`
            },
            {
                header: "Sensitive Information",
                text: `We do not collect sensitive information such as financial information or social security numbers.`
            },
            {
                header: "Information automatically collected",
                text: `We automatically collect certain information when you visit, use, or navigate the website. This information does not reveal your specific identity (like your name or contact information unless you provide it) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use the website, and other technical information. This information is primarily needed to maintain the security and operation of the website, and for internal analytics and reporting purposes.`
            },
            {
                text: `Like many websites, we also collect information through cookies and similar technologies.`
            },
            {
                text: `The information we collect may include but is not limited to:`
            },
            {
                text: `<ul> <li><strong>Log and Usage Data.</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use the website and which we record in log files. Depending on how you interact with the website, this log data may include your IP address, device information, browser type, and settings and information about your activity on the website (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called &quot;crash dumps&quot;), and hardware settings).</li> <li><strong>Device Data.</strong> We collect device data such as information about your computer, phone, tablet, or other device you use to access the website. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.</li> </ul>`
            }
        ]
    },
    {
        title: "Where Is Your Information Stored",
        details: [
            {
                text: `Information collected through the website may be stored and processed using cloud service providers, including Google Firebase. These providers may store data on servers located in the United States or other jurisdictions where they operate.`
            },
            {
                text: `By using the website, you acknowledge that your information may be transferred to and processed in locations outside of your state, province, or country of residence.`
            }
        ]
    },
    {
        title: "How Do We Use Your Information",
        details: [
            {
                text: `We process your personal information for a variety of reasons, depending on how you interact with the website, including:`
            },
            {
                text: `<ul><li><strong>To provide and maintain the website.</strong> We use your information to authenticate users, manage accounts, and provide access to website features.</li><li><strong>To improve the website.</strong> We analyze usage patterns and performance data to improve functionality, reliability, and user experience.</li><li><strong>To communicate with you.</strong> We may use your information to respond to inquiries, support requests, or other communications you send to us.</li><li><strong>To protect the website and its users.</strong> We may process information to detect, investigate, and prevent fraud, abuse, security incidents, and unauthorized access.</li><li><strong>To comply with legal obligations.</strong> We may process information when required to comply with applicable laws, regulations, or legal requests.</li></ul>`
            }
        ]
    },
    {
        title: "When and With Whom Do We Share Your Information",
        details: [
            {
                text: `We do not sell, rent, or share your personal information with third parties for marketing purposes.`
            },
            {
                text: `However, we may share information with trusted service providers that help us operate, secure, and improve the website. These providers may include but are not limited to:`
            },
            {
                text: `<ul><li>Google Analytics</li><li>Cloudflare</li><li>Google Firebase</li><li>Google Authentication</li></ul>`
            },
            {
                text: `These providers are only permitted to process information as necessary to provide their services to us.`
            },
            {
                text: `Authentication services are provided through Google and Firebase Authentication.`
            }
        ]
    },
    {
        title: "Do We Use Cookies and Other Tracking Technology",
        details: [
            {
                text: `We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our <a href="#do-we-use-cookies-and-other-tracking-technology">Cookie Notice</a>.`
            }
        ]
    },
    {
        title: "How Long Do We Keep Your Information",
        details: [
            {
                text: `We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.`
            }
        ]
    },
    {
        title: "How Do We Keep Your Information Safe",
        details: [
            {
                text: `We have implemented appropriate and reasonable technical security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from the website is at your own risk. You should only access the website within a secure environment.`
            }
        ]
    },
    {
        title: "Do We Collect Information From Minors",
        details: [
            {
                text: `We do not knowingly collect, solicit, or process personal information from children under 13 years of age. If we become aware that we have collected personal information from a child under 13, we will take reasonable steps to delete such information promptly.`
            },
            {
                text: `If you believe we may have collected information from a child under 13, please contact us at <a href="mailto:${process.env.NEXT_PUBLIC_LEGAL_EMAIL}">${process.env.NEXT_PUBLIC_LEGAL_EMAIL}</a>.`
            }
        ]
    },
    {
        title: "What Are Your Privacy Rights",
        details: [
            {
                header: "Cookies and similar technologies",
                text: `Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect your use of certain website functions. You may also <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">opt out of interest-based advertising</a> on the website.`
            },
            {
                text: `If you have questions or comments about your privacy rights, you may email us at <a href="mailto:${process.env.NEXT_PUBLIC_LEGAL_EMAIL}">${process.env.NEXT_PUBLIC_LEGAL_EMAIL}</a>.`
            },
        ]
    },
    {
        title: "Controls for Do-Not-Track-Features",
        details: [
            {
                text: `Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.`
            }
        ]
    },
    {
        title: "Do California Residents Have Specific Privacy Rights",
        details: [
            {
                text: `In accordance with CCPA laws, California residents may have certain rights regarding access to, correction of, and deletion of their personal information under applicable law. To exercise these rights, please contact us at <a href="mailto:${process.env.NEXT_PUBLIC_LEGAL_EMAIL}">${process.env.NEXT_PUBLIC_LEGAL_EMAIL}</a>.`
            }
        ]
    },
    {
        title: "Do We Make Updates to This Policy",
        details: [
            {
                text: `We may update this privacy policy from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you by posting a notice to this page. We encourage you to review this privacy policy frequently to stay informed about how we protect your information.`
            }
        ]
    },
    {
        title: "How Can You Contact Us About This Notice",
        details: [
            {
                text: `If you have questions or comments about this notice, you may email us at <a href="mailto:${process.env.NEXT_PUBLIC_LEGAL_EMAIL}">${process.env.NEXT_PUBLIC_LEGAL_EMAIL}</a>.`
            }
        ]
    },
    {
        title: "How Can You Review, Updates, or Delete the Data We Collect From You",
        details: [
            {
                text: `Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please email us at <a href="mailto:${process.env.NEXT_PUBLIC_LEGAL_EMAIL}">${process.env.NEXT_PUBLIC_LEGAL_EMAIL}</a>.`
            }
        ]
    }
];