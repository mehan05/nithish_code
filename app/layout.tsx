import type { Metadata } from "next";
import "./globals.css";
import PublicShell from "@/components/layout/PublicShell";

export const metadata: Metadata = {
  title: "Plentra Exports | Premium Indian Agricultural Exports",
  description: "India's trusted B2B exporter of rice, spices, honey, coconut, and garments. IEC, APEDA, & FSSAI certified. Request a bulk export quote today.",
  keywords: ["agricultural exports", "Indian spices", "APEDA certified", "rice exporter", "coconut wholesale", "cotton Kurtas OEM", "Plentra Exports"],
  authors: [{ name: "Plentra Exports" }],
  openGraph: {
    title: "Plentra Exports | Global Agricultural Export Partner",
    description: "Premium quality grains, spices, coconut, wild honey, and garments exported worldwide with complete compliance.",
    type: "website",
    locale: "en_US",
    siteName: "Plentra Exports"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-sans antialiased text-foreground bg-background">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
