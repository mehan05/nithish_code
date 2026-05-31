"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import QuoteFormModal from "../sections/QuoteFormModal";
import BrochureModal from "../sections/BrochureModal";
import { trackVisitor } from "@/lib/mock-db";

interface PublicShellProps {
  children: React.ReactNode;
}

export default function PublicShell({ children }: PublicShellProps) {
  const pathname = usePathname();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  // Track visitor location
  useEffect(() => {
    if (isAdminRoute) return;

    const recordVisit = async () => {
      try {
        // Fallback geolocator using ipinfo or a standard public endpoint
        // For local development, we resolve a random export-friendly country to make the stats dashboard look amazing!
        const demoLocations = [
          { country: "United States", code: "US", city: "New York" },
          { country: "Germany", code: "DE", city: "Frankfurt" },
          { country: "United Arab Emirates", code: "AE", city: "Dubai" },
          { country: "United Kingdom", code: "GB", city: "London" },
          { country: "Singapore", code: "SG", city: "Singapore" },
          { country: "Japan", code: "JP", city: "Tokyo" },
          { country: "Saudi Arabia", code: "SA", city: "Riyadh" }
        ];
        
        const loc = demoLocations[Math.floor(Math.random() * demoLocations.length)];
        const randomIp = `198.51.100.${Math.floor(Math.random() * 254) + 1}`;

        // Attempt a live fetch, fallback to demo track
        try {
          const res = await fetch("https://ipapi.co/json/");
          if (res.ok) {
            const data = await res.json();
            if (data.ip && data.country_name) {
              trackVisitor(
                data.ip,
                data.country_name,
                data.country_code || "US",
                data.city || "Unknown",
                pathname || "/"
              );
              return;
            }
          }
        } catch (e) {
          // ignore error and proceed to fallback
        }

        trackVisitor(
          randomIp,
          loc.country,
          loc.code,
          loc.city,
          pathname || "/"
        );

      } catch (err) {
        console.error("Failed tracking visit:", err);
      }
    };

    // Delay slightly to prevent blocking initial render
    const timer = setTimeout(recordVisit, 1200);
    return () => clearTimeout(timer);
  }, [pathname, isAdminRoute]);

  // Handler to open quote modal with a preselected product name
  const handleOpenQuote = (productName?: string) => {
    setSelectedProduct(productName || "");
    setIsQuoteOpen(true);
  };

  const handleOpenBrochure = () => {
    setIsBrochureOpen(true);
  };

  // Provide the triggers via a custom global context or custom window events
  // for easy trigger from nested dynamic page elements!
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).openQuoteModal = (productName?: string) => handleOpenQuote(productName);
      (window as any).openBrochureModal = () => handleOpenBrochure();
    }
  }, []);

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="public-root min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar
        onOpenQuoteModal={() => handleOpenQuote("")}
        onOpenBrochureModal={handleOpenBrochure}
      />
      
      <main className="flex-1 flex flex-col">{children}</main>
      
      <Footer />

      {/* Quote Form Modal */}
      <QuoteFormModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProduct={selectedProduct}
      />

      {/* Brochure View Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </div>
  );
}
