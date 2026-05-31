"use client";

import React from "react";
import { Leaf, Award, ShieldCheck, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Direct Sourcing Integrity",
      desc: "By engaging directly with farmer co-operatives, we secure highly competitive pricing structures while ensuring that growers receive equitable earnings.",
      icon: Leaf
    },
    {
      title: "Premium Graded Standards",
      desc: "All grain silos and processing units operate double laser-sorters to verify that broken percentages satisfy foreign import regulations.",
      icon: Award
    },
    {
      title: "Absolute Trade Compliance",
      desc: "Authorized under central customs pipelines (ICEGATE) and agricultural promoters (APEDA) to secure express clearance timelines.",
      icon: ShieldCheck
    },
    {
      title: "Ethical Procurement Desk",
      desc: "Supporting rural empowerment. Every bulk container contract aids local agricultural networks in sustaining pure organic farming clusters.",
      icon: HeartHandshake
    }
  ];

  return (
    <div className="flex-1 bg-background">
      
      {/* Banner */}
      <div className="bg-secondary/40 border-b border-border/50 py-16 text-center">
        <div className="container mx-auto px-4">
          <span className="px-3.5 py-1 bg-white text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/10">
            About Our Values
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            India's Premium Agro Exporter
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-2 leading-relaxed">
            Connecting direct farmer sourcing with global maritime distribution networks.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        
        {/* Core Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
              Our Sourcing Philosophy & Direct Farm Engagement
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              At Plentra Exports, we believe that high-quality B2B international commerce originates at the roots. We bypass middle brokers by collaborating directly with local agricultural clusters across Tamil Nadu, Andhra Pradesh, and Karnataka. This guarantees crop fresh-harvest purity, absolute sanitation, and complete compliance.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              With a state-of-the-art packing warehouse near Chennai, we process grains, spices, and fresh coconuts using double laser-sorters and temperature-regulated silos before maritime loading.
            </p>
          </div>

          <div className="bg-secondary/30 rounded-2xl border border-primary/15 p-8 flex flex-col justify-center relative select-none min-h-[300px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full filter blur-xl" />
            
            <div className="flex flex-col gap-1.5 text-center items-center">
              <Leaf className="w-12 h-12 text-primary" />
              <span className="font-serif text-xl font-bold text-slate-900 mt-3">
                Plentra Exports Ltd
              </span>
              <span className="text-[10px] uppercase font-bold text-primary tracking-widest">
                Agricultural B2B Exporter
              </span>
              <div className="w-12 h-0.5 bg-primary/30 my-4" />
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Empowering farmers, serving global businesses, and ensuring 100% compliant food grading standards.
              </p>
            </div>

          </div>

        </div>

        {/* Corporate Values */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 text-center mb-12">
            Our Core Corporate Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-border/80 rounded-2xl p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 group flex gap-4 items-start"
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                    <IconComp className="w-5.5 h-5.5" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
