"use client";

import React from "react";
import { Container, ShieldCheck, ThermometerSnowflake, Microscope, Truck, Star } from "lucide-react";

export default function InfrastructurePage() {
  const specs = [
    {
      title: "Trusted Supplier Network",
      desc: "We work directly with established farming cooperatives and local aggregators to ensure consistent supply of high-quality agricultural products.",
      icon: Container,
      details: ["Direct farm engagement", "Ethical procurement", "Traceable sourcing"]
    },
    {
      title: "Export Packaging Support",
      desc: "Partnering with certified packaging facilities to ensure products are sorted, cleaned, and packed to meet international import requirements.",
      icon: ThermometerSnowflake,
      details: ["Export-grade materials", "Moisture-controlled packing", "Custom branding options"]
    },
    {
      title: "Quality Inspection Process",
      desc: "Every batch undergoes rigorous pre-shipment inspections by certified third-party agencies to guarantee adherence to global standards.",
      icon: Microscope,
      details: ["Third-party lab testing", "Phytosanitary checks", "Visual & mechanical grading"]
    },
    {
      title: "Chennai Port Logistics Coordination",
      desc: "Strategic coordination with freight forwarders at major ports ensures smooth customs clearance and timely vessel loading.",
      icon: Truck,
      details: ["Efficient customs handling", "Direct port connectivity", "Reliable transit schedules"]
    }
  ];

  return (
    <div className="flex-1 bg-background">
      
      {/* Banner */}
      <div className="bg-secondary/40 border-b border-border/50 py-16 text-center">
        <div className="container mx-auto px-4">
          <span className="px-3.5 py-1 bg-white text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/10">
            Sourcing & Logistics
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Sourcing & Logistics Network
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-2 leading-relaxed">
            Reliable sourcing channels, quality inspections, and streamlined export logistics.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        
        {/* Core Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
              Ensuring Export-Ready Quality & Compliance
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plentra Exports coordinates closely with trusted sourcing networks and packaging facilities near Chennai port corridors. We ensure that our export processes align with ISO 22000, HACCP, and phytosanitary validations to meet foreign custom standards.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-100/80 px-4 py-2.5 rounded-xl self-start">
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>Phytosanitary & ISO 22000 Certified Packaging Lines</span>
            </div>
          </div>

          <div className="bg-secondary/30 rounded-2xl border border-primary/15 p-8 flex flex-col gap-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-border pb-3">
              Logistics Hub Features
            </h3>
            
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Sourcing Regions:</span>
                <span className="font-semibold text-slate-800">Tamil Nadu, Andhra Pradesh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Packaging Hub:</span>
                <span className="font-semibold text-slate-800">Chennai Logistics Zone</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quality Inspection:</span>
                <span className="font-semibold text-slate-800">Pre-shipment Verification</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Logistics Port Corridors:</span>
                <span className="font-semibold text-primary">Chennai & Tuticorin Ports</span>
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Grid Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specs.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-border/80 rounded-2xl p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 group flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                    <IconComp className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>

                {/* Sub specifications bullets */}
                <div className="bg-slate-50 rounded-xl p-4 border border-border/60 mt-auto">
                  <ul className="flex flex-col gap-1.5 text-xs text-slate-700 font-medium">
                    {item.details.map((bullet, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Star className="w-3.5 h-3.5 text-primary shrink-0 fill-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
