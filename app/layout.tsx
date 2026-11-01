import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";
import "./globals.css";

export const viewport: Viewport = { themeColor: "#0d0f11", colorScheme: "dark" };

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

// Vercel sets this to the production domain; social previews need absolute URLs.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const description =
  "Student engineer working across robotics, computer vision, neural network research, and software.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} — Engineering Portfolio`, template: `%s — ${site.name}` },
  description,
  openGraph: { type: "website", siteName: site.name, title: `${site.name} — Engineering Portfolio`, description },
  twitter: { card: "summary_large_image" },
};

/** Gates scroll-reveal styles so content is visible if JavaScript never runs. */
const jsFlag = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // MISSING markers show while developing and never on the live site.
      data-markers={process.env.NODE_ENV === "production" ? "hide" : "show"}
      className={`${grotesk.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <div className="backdrop" aria-hidden="true" />
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
