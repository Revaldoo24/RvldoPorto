import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rvldo-porto.vercel.app";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Revaldo Putra Anggara",
  jobTitle: "System Architect and Precision Developer",
  url: siteUrl,
  email: "mailto:revaldo@example.com",
  sameAs: ["https://github.com/Revaldoo24", "https://linkedin.com"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RVLDPORTO",
  url: siteUrl,
  inLanguage: ["en", "id"],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Revaldo Putra Anggara | System Architect & Precision Developer",
  description:
    "The Architecture of Intelligence. Interactive portfolio by Revaldo Putra Anggara, focused on scalable systems and precision engineering.",
  keywords: [
    "developer",
    "system architect",
    "web development",
    "interactive portfolio",
    "next.js engineer",
  ],
  authors: [{ name: "Revaldo Putra Anggara" }],
  creator: "Revaldo Putra Anggara",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Revaldo Putra Anggara | System Architect",
    description:
      "The Architecture of Intelligence. Building scalable digital systems with precision.",
    type: "website",
    url: siteUrl,
    siteName: "RVLDPORTO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revaldo Putra Anggara | System Architect",
    description:
      "Interactive portfolio focused on scalable systems, AI engineering, and modern web architecture.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-outfit">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
