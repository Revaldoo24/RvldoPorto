import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revaldo Putra Anggara | System Architect & Precision Developer",
  description: "The Architecture of Intelligence - Enter a reactive digital system engineered by Revaldo Putra Anggara",
  keywords: ["developer", "system architect", "web development", "interactive", "portfolio"],
  authors: [{ name: "Revaldo Putra Anggara" }],
  openGraph: {
    title: "Revaldo Putra Anggara | System Architect",
    description: "The Architecture of Intelligence",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
