"use client";

import React from "react";
import Link from "next/link";
import { Container, ShieldCheck, Microscope, ThermometerSnowflake, Truck, ChevronRight, ArrowRight } from "lucide-react";

export default function InfrastructureSection() {
  const specs = [
    {
      title: "Vast Warehousing Capacity",
      desc: "Over 75,000 sq. ft. of dry packing halls with modern heavy-duty pallet racks for organized cargo preparation at scale.",
      icon: Container,
      stat: "75,000 sq. ft."
    },
    {
      title: "Advanced Cold Storage",
      desc: "Zoned temperature settings (−5°C to 15°C) to eliminate insect ingress and maintain full moisture integrity across batches.",
      icon: ThermometerSnowflake,
      stat: "−5°C to 15°C"
    },
    {
      title: "In-House Quality Labs",
      desc: "Spectral refractometers, chemical analyzers, and grading sieves verifying absolute purity at every packing stage.",
      icon: Microscope,
      stat: "ISO Verified"
    },
    {
      title: "Global Logistics Network",
      desc: "Direct tie-ups with leading shipping lines at Chennai and Tuticorin ports guaranteeing express customs clearance lanes.",
      icon: Truck,
      stat: "48+ Countries"
    }
  ];

  return (
    <section className="py-24 bg-[#F1F5F9]/50 border-b border-[#E2E8F0] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">

        {/* Section Header — centered, prominent */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-white text-[#1A365D] text-xs font-bold uppercase tracking-widest border border-[#718096]/30 shadow-sm">
            Silo & Warehousing Specs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] max-w-2xl leading-tight">
            World-Class Processing Infrastructure
          </h2>
          <div className="w-16 h-1.5 bg-[#718096] rounded-full" />
          <p className="text-base text-[#475569] max-w-xl leading-relaxed">
            We leverage top-tier cleaning machinery and temperature-regulated silos to prepare commodities matching strict international phytosanitary guidelines.
          </p>
        </div>

        {/* Main layout: 4 spec cards + right dashboard panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: 2x2 spec cards grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {specs.map((spec, index) => {
              const IconComp = spec.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:border-[#718096]/40 hover:shadow-lg transition-all duration-300 group flex flex-col gap-4"
                >
                  {/* Icon + stat row */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-[#1A365D] group-hover:bg-[#718096] group-hover:text-white transition-all duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#718096] bg-[#F1F5F9] border border-[#718096]/25 px-3 py-1 rounded-full">
                      {spec.stat}
                    </span>
                  </div>

                  {/* Title & description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#1A365D] transition-colors leading-snug">
                      {spec.title}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* CTA link below cards */}
            <div className="sm:col-span-2 pt-2">
              <Link
                href="/infrastructure"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#718096] hover:text-[#4A5568] group transition-colors"
              >
                <span>Read Full Infrastructure Specifications</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: Dashboard stats card */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Main facility card */}
            <div className="relative bg-white rounded-2xl border border-[#E2E8F0] shadow-md p-7 flex flex-col gap-6 overflow-hidden">
              {/* Subtle dot pattern background */}
              <div className="absolute top-0 left-0 w-full h-full opacity-[0.04] bg-[radial-gradient(#718096_1.5px,transparent_1.5px)] [background-size:18px_18px] pointer-events-none" />

              {/* Header row */}
              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#1A365D] bg-[#F1F5F9] border border-[#718096]/25 px-3 py-1.5 rounded-full">
                  HQ Facilities View
                </span>
                <div className="flex items-center gap-1.5 text-[#718096] text-xs font-bold bg-[#F1F5F9] border border-[#718096]/25 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ISO 22000 Checked</span>
                </div>
              </div>

              {/* Temperature gauges */}
              <div className="flex flex-col gap-5 z-10">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#475569] font-medium">Silo Temp Zone-1 (Dry Rice Grains)</span>
                    <span className="text-sm font-bold text-[#0F172A]">12.4 °C</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden border border-[#E2E8F0]">
                    <div className="h-full bg-[#1A365D] rounded-full w-[45%] transition-all" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#475569] font-medium">Zone-2 Cold Storage (Raw Forest Honey)</span>
                    <span className="text-sm font-bold text-[#0F172A]">4.5 °C</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden border border-[#E2E8F0]">
                    <div className="h-full bg-[#718096] rounded-full w-[25%] transition-all" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#475569] font-medium">Zone-3 Spice Grinding & Packing</span>
                    <span className="text-sm font-bold text-[#0F172A]">22.0 °C</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden border border-[#E2E8F0]">
                    <div className="h-full bg-[#A0AEC0] rounded-full w-[65%] transition-all" />
                  </div>
                </div>
              </div>

              {/* Footer stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-[#E2E8F0] pt-5 z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#475569]">Total Capacity</span>
                  <span className="text-2xl font-bold text-[#0F172A]">12,500 MT</span>
                  <span className="text-xs text-[#475569] font-medium">per month</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#475569]">Logistics Port</span>
                  <span className="text-base font-bold text-[#718096] leading-tight">Chennai Maritime Port</span>
                  <span className="text-xs text-[#475569] font-medium">Tuticorin corridor</span>
                </div>
              </div>
            </div>

            {/* Compliance badge row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "APEDA", sub: "Registered" },
                { label: "FSSAI", sub: "Licensed" },
                { label: "GMP", sub: "Certified" }
              ].map((badge, i) => (
                <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl p-3 flex flex-col items-center text-center gap-0.5 hover:border-[#718096]/40 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-[#718096] mb-1" />
                  <span className="text-sm font-bold text-[#0F172A]">{badge.label}</span>
                  <span className="text-[10px] text-[#475569] uppercase tracking-wider font-medium">{badge.sub}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
