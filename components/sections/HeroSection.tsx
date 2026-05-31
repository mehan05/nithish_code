"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Award, FileSpreadsheet } from "lucide-react";

export default function HeroSection() {
  const triggerQuoteModal = () => {
    if (typeof window !== "undefined" && (window as any).openQuoteModal) {
      (window as any).openQuoteModal("");
    }
  };

  const badges = [
    { text: "IEC Certified", icon: ShieldCheck },
    { text: "APEDA Registered", icon: Award },
    { text: "FSSAI Licensed", icon: CheckCircle2 },
    { text: "GMP Certified", icon: FileSpreadsheet }
  ];

  return (
    <section className="relative overflow-hidden green-gradient-bg py-20 lg:py-32 border-b border-border/50">
      
      {/* Background design elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[100%] opacity-15 pointer-events-none bg-[radial-gradient(#1A6B3C_1.5px,transparent_1.5px)] [background-size:24px_24px] mask-gradient" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/5 filter blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-accent/5 filter blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline and CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            
            <div className="inline-flex self-center lg:self-start items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B4332] text-[#C8942A] border border-[#C8942A]/40 text-xs font-semibold uppercase tracking-wider">
              🌟 Globally Trusted Agricultural Exporter
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0F2D1E] leading-[1.1] tracking-tight">
              India's Trusted <span className="text-[#C8942A]">Agricultural</span> Export Partner
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Premium quality grains, organic spices, fresh coconuts, raw forest honey, and custom cotton garments — sourced directly from Indian farms and delivered worldwide with absolute compliance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
              <button
                onClick={triggerQuoteModal}
                className="w-full sm:w-auto h-12 bg-[#C8942A] hover:bg-[#A87820] text-white font-semibold rounded-full px-8 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/products"
                className="w-full sm:w-auto h-12 border-2 border-[#1B4332] text-[#1B4332] hover:bg-[#EAF2EC] font-semibold rounded-full px-8 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                View Products
              </Link>
            </div>

            {/* Sub-headline animated trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#C8D8CC]">
              {badges.map((badge, index) => {
                const IconComp = badge.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-[#C8D8CC] hover:border-[#C8942A]/40 transition-all duration-200 shadow-sm group"
                  >
                    <IconComp className="w-5 h-5 text-[#1B4332] shrink-0 group-hover:text-[#C8942A] transition-colors" />
                    <span className="text-xs font-bold text-[#0F2D1E] text-center sm:text-left leading-tight">
                      {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Hero graphics illustration */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Visual Glassmorphic Grid Card */}
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-2xl border border-[#C8942A]/25 bg-white/94 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C8942A]/8 rounded-full filter blur-xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#1B4332]/8 rounded-full filter blur-xl" />
              
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#C8942A] uppercase tracking-widest">Active Shipments</span>
                  <span className="font-serif text-3xl font-bold text-[#0F2D1E] mt-1">48+ Countries</span>
                </div>
                <span className="px-3 py-1 bg-[#1B4332] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Live Operations
                </span>
              </div>

              <div className="my-6 border-t border-b border-[#C8D8CC] py-4 flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#4E6355]">Standard Delivery:</span>
                  <span className="font-semibold text-[#0F2D1E]">14 - 18 Days (CIF)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#4E6355]">Quality Sorting:</span>
                  <span className="font-semibold text-[#0F2D1E]">Double Laser Sorted</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#4E6355]">Compliance Rating:</span>
                  <span className="font-semibold text-[#C8942A]">100% Fully Compliant</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="w-8 h-8 rounded-full border-2 border-white bg-[#EAF2EC] flex items-center justify-center text-[10px] font-bold">🇺🇸</span>
                  <span className="w-8 h-8 rounded-full border-2 border-white bg-[#EAF2EC] flex items-center justify-center text-[10px] font-bold">🇦🇪</span>
                  <span className="w-8 h-8 rounded-full border-2 border-white bg-[#EAF2EC] flex items-center justify-center text-[10px] font-bold">🇬🇧</span>
                  <span className="w-8 h-8 rounded-full border-2 border-white bg-[#EAF2EC] flex items-center justify-center text-[10px] font-bold">🇯🇵</span>
                </div>
                <span className="text-[11px] text-[#4E6355] font-medium">
                  Verified global trade distribution network.
                </span>
              </div>

            </div>

            {/* Glowing gold decoration ball */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-16 h-16 rounded-full bg-[#C8942A]/20" />
          </div>

        </div>
      </div>
    </section>
  );
}
