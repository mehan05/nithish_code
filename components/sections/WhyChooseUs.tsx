"use client";

import React from "react";
import { Container, ShieldCheck, Snowflake, Globe, Landmark } from "lucide-react";

export default function WhyChooseUs() {
  const strengths = [
    {
      title: "Export Sourcing Specialist",
      desc: "Reliable sourcing networks and streamlined logistics systems built to scale for international maritime transport.",
      icon: Container
    },
    {
      title: "Cold Storage Logistics",
      desc: "State-of-the-art cold storage systems that preserve nutritional compounds, block insect ingress, and prolong product shell life.",
      icon: Snowflake
    },
    {
      title: "Global Market Expertise",
      desc: "Extensive shipping expertise with localized tariff intelligence across key international markets.",
      icon: Globe
    },
    {
      title: "Certified Supplier",
      desc: "Rigorous standards verified by central licensing bodies: IEC, APEDA, FSSAI, Spices Board, GST, and UDYAM.",
      icon: Landmark
    }
  ];

  return (
    <section className="py-20 bg-[#F7F9F7]/50 border-b border-[#D8F3DC]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="px-4 py-1 rounded-full bg-white text-[#1B4332] text-xs font-bold uppercase tracking-widest border border-[#2D6A4F]/30 shadow-sm">
            Our Strengths
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F2D1E]">
            Why Partner with Plentra Exports?
          </h2>
          <div className="w-16 h-1 bg-[#2D6A4F] rounded-full mt-2" />
          <p className="text-sm text-[#40916C] max-w-lg leading-relaxed mt-1">
            Setting the standard for quality agricultural procurement, certified sanitation, and streamlined custom clearances.
          </p>
        </div>

        {/* 4-column strengths grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-[#D8F3DC] rounded-2xl p-6 hover:border-[#2D6A4F]/40 hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#F7F9F7] border border-[#1B4332]/15 flex items-center justify-center text-[#1B4332] mb-5 group-hover:scale-110 group-hover:bg-[#2D6A4F] group-hover:text-white transition-all">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0F2D1E] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-[#40916C] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
