import { Barlow, Public_Sans, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-barlow"
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-public-sans"
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.3depot.io"),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | 3Depot",
    default: "3Depot | 3D Printer Filament Management"
  },
  description: "Track, organize, and manage your 3D printing filament inventory with 3Depot. Monitor spool weights, view usage history, and keep your workshop organized.",
  generator: "Next.js",
  applicationName: "Next.js",
  keywords: ["Next.js", "React", "JavaScript"],
  authors: [{ name: "Tyler Latshaw", url: "https://tylerlatshaw.com/" }],
  creator: "Tyler J. Latshaw",
  publisher: "Tyler J. Latshaw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${publicSans.variable} ${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={process.env.GOOGLE_PROPERTY_ID!} />
      <body className="min-h-full flex flex-col bg-background w-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
