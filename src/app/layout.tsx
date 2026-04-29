import type { Metadata } from "next";
import { inter, syne, jetbrainsMono } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Haritha Akkad",
  jobTitle: "Senior Software Engineer",
  url: "https://harithaakkad.dev",
  sameAs: [
    "https://linkedin.com/in/HarithaSeddik",
    "https://github.com/HarithaSeddik",
  ],
  knowsAbout: [
    "Generative AI",
    "Flutter",
    "Mobile Engineering",
    "Backend Engineering",
    "AI Agents",
    "Browser Automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: "light" }}
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
