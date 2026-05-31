"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ShieldCheck, CheckCircle2, Award, FileSpreadsheet } from "lucide-react";

// ── Export destinations — gold dots on the globe ─────────────────────────────
const exportMarkers = [
  { id: "malaysia",    location: [4.2105,    101.9758] as [number, number], label: "Malaysia" },
  { id: "bangladesh",  location: [23.6850,    90.3563] as [number, number], label: "Bangladesh" },
  { id: "srilanka",    location: [7.8731,     80.7718] as [number, number], label: "Sri Lanka" },
  { id: "singapore",   location: [1.3521,    103.8198] as [number, number], label: "Singapore" },
  { id: "thailand",    location: [15.8700,   100.9925] as [number, number], label: "Thailand" },
  { id: "vietnam",     location: [14.0583,   108.2772] as [number, number], label: "Vietnam" },
  { id: "australia",   location: [-25.2744,  133.7751] as [number, number], label: "Australia" },
  { id: "uae",         location: [23.4241,    53.8478] as [number, number], label: "UAE" },
  { id: "indonesia",   location: [-0.7893,   113.9213] as [number, number], label: "Indonesia" },
];

// Dynamically import Globe to prevent SSR issues with canvas/WebGL
const Globe = dynamic(
  () => import("@/components/ui/cobe-globe").then((m) => m.Globe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square rounded-full bg-[#F1F5F9] animate-pulse" />
    ),
  }
);

// ── Main Section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const triggerQuoteModal = () => {
    if (typeof window !== "undefined" && (window as any).openQuoteModal) {
      (window as any).openQuoteModal("");
    }
  };

  const badges = [
    { text: "IEC Certified",    icon: ShieldCheck },
    { text: "APEDA Registered", icon: Award },
    { text: "FSSAI Licensed",   icon: CheckCircle2 },
    { text: "GMP Certified",    icon: FileSpreadsheet },
  ];

  return (
    <section className="relative overflow-hidden green-gradient-bg py-20 lg:py-28 border-b border-[#E2E8F0]">

      {/* Subtle dot-grid & glow blobs */}
      <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 pointer-events-none bg-[radial-gradient(#1A365D_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#1A365D]/5 filter blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#718096]/6 filter blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* ── Left: Headline + CTAs + Trust Badges ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">

            {/* Top tag */}
            <div className="inline-flex self-center lg:self-start items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A365D] text-[#718096] border border-[#718096]/40 text-xs font-semibold uppercase tracking-wider">
              🌟 Globally Trusted Agricultural Exporter
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0F172A] leading-[1.1] tracking-tight">
              India's Trusted{" "}
              <span className="text-[#718096]">Agricultural</span>{" "}
              Export Partner
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-[#475569] max-w-xl leading-relaxed">
              Premium quality grains, organic spices, fresh coconuts, raw forest honey, and custom
              cotton garments — sourced directly from Indian farms and delivered worldwide with
              absolute compliance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
              <button
                onClick={triggerQuoteModal}
                className="w-full sm:w-auto h-12 bg-[#718096] hover:bg-[#4A5568] text-white font-semibold rounded-full px-8 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/products"
                className="w-full sm:w-auto h-12 border-2 border-[#1A365D] text-[#1A365D] hover:bg-[#F1F5F9] font-semibold rounded-full px-8 flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
              >
                View Products
              </Link>
            </div>

            {/* Certification badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#E2E8F0]">
              {badges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#718096]/40 transition-all duration-200 shadow-sm group"
                  >
                    <Icon className="w-5 h-5 text-[#1A365D] shrink-0 group-hover:text-[#718096] transition-colors" />
                    <span className="text-xs font-bold text-[#0F172A] text-center sm:text-left leading-tight">
                      {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: Interactive Globe ── */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4 relative">

            {/* Label above globe */}
            <div className="flex items-center gap-3 self-start w-full max-w-[420px]">
              <span className="text-xs font-bold text-[#718096] uppercase tracking-widest">
                Export Reach
              </span>
              <span className="px-2.5 py-0.5 bg-[#1A365D] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                48+ Countries
              </span>
            </div>

            {/* Globe — draggable, gold marker dots, no connecting arcs */}
            <div className="w-full max-w-[420px] drop-shadow-2xl">
              <Globe
                markers={exportMarkers}
                markerColor={[0.44, 0.50, 0.59]}
                baseColor={[0.95, 0.96, 0.98]}
                glowColor={[0.89, 0.91, 0.94]}
                dark={0}
                mapBrightness={9}
                markerSize={0.032}
                markerElevation={0.01}
                speed={0.003}
                theta={0.18}
                diffuse={1.4}
              />
            </div>

            {/* Compact stats strip below globe */}
            <div className="w-full max-w-[420px] flex items-center justify-between border-t border-[#E2E8F0] pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#475569]">Delivery</span>
                <span className="text-sm font-bold text-[#0F172A]">14–18 Days CIF</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#475569]">Sorting</span>
                <span className="text-sm font-bold text-[#0F172A]">Laser Sorted</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#475569]">Compliance</span>
                <span className="text-sm font-bold text-[#718096]">100% Clean</span>
              </div>
            </div>

            {/* Gold glow orb */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-20 h-20 rounded-full bg-[#718096]/15 blur-xl" />
          </div>

        </div>
      </div>
    </section>
  );
}
