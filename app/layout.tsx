import type { Metadata } from "next";
import "./globals.css";
import PublicShell from "@/components/layout/PublicShell";

export const metadata: Metadata = {
  title: "Plentra Exports | Premium Indian Agricultural Exports",
  description: "India's trusted B2B exporter of onions, spices, chillies, peanuts, and other agricultural products. IEC, APEDA, & FSSAI certified. Request a bulk export quote today.",
  keywords: ["agricultural exports", "Indian spices", "APEDA certified", "onion exporter", "peanut wholesale", "dry red chilli", "Plentra Exports"],
  authors: [{ name: "Plentra Exports" }],
  openGraph: {
    title: "Plentra Exports | Global Agricultural Export Partner",
    description: "Premium quality onions, spices, chillies, peanuts, and other agricultural products exported worldwide with complete compliance.",
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
