"use client";

import React from "react";
import { Container, ShieldCheck, ThermometerSnowflake, Microscope, Truck, Star } from "lucide-react";

export default function InfrastructurePage() {
  const specs = [
    {
      title: "Bulk Dry Grains Silos",
      desc: "Our automated silos support modern pre-cleaning, laser-sorting, and humidity control to eliminate moisture fluctuations in premium rice grains.",
      icon: Container,
      details: ["Capacity: 25,000 Metric Tons", "Moisture grading: Laser automated", "Ingress protection: IP54 hermetic seals"]
    },
    {
      title: "Cold Chain Logistics Zones",
      desc: "Specially calibrated storage modules designed to hold raw wild forest honey and perishable coconut derivatives without losing active nutrient values.",
      icon: ThermometerSnowflake,
      details: ["Temperature range: 2°C to 8°C", "Hygrometer feedback: Digital telemetry", "Aerosol cleaning: HEPA certified filters"]
    },
    {
      title: "Phytosanitary & Grading Labs",
      desc: "In-house lab technicians conduct regular batches testing, verifying curcumin contents in spices and moisture levels in coir fibers.",
      icon: Microscope,
      details: ["Purity testing: Refractometer and HPLC", "Pest controls: Eco-friendly ozone treatment", "Batch tracking: QR-coded logistics tags"]
    },
    {
      title: "Maritime Shipping Pipeline",
      desc: "Direct customs filing terminals connect Chennai port hubs directly with our packing facilities, reducing handling times.",
      icon: Truck,
      details: ["Port transit time: Less than 4 hours", "Customs clearance: ICEGATE authorized", "Container loading: Verified weight scaling"]
    }
  ];

  return (
    <div className="flex-1 bg-background">
      
      {/* Banner */}
      <div className="bg-secondary/40 border-b border-border/50 py-16 text-center">
        <div className="container mx-auto px-4">
          <span className="px-3.5 py-1 bg-white text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/10">
            Silos & Warehousing
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Our Processing Infrastructure
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-2 leading-relaxed">
            State-of-the-art grading machinery, temperature-zoned warehouses, and custom packaging silos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        
        {/* Core Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
              Ensuring 100% Export-Ready Agronomic Compliance
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plentra Exports maintains centralized sourcing depots near Chennai port corridors, allowing us to load containers immediately after packing. Our machinery line carries ISO 22000, HACCP, and phytosanitary validations to ensure that all bulk exports satisfy foreign custom standards.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-100/80 px-4 py-2.5 rounded-xl self-start">
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>Phytosanitary & ISO 22000 Certified Packaging Lines</span>
            </div>
          </div>

          <div className="bg-secondary/30 rounded-2xl border border-primary/15 p-8 flex flex-col gap-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-border pb-3">
              HQ Storage Matrix Specs
            </h3>
            
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dry Warehouse Area:</span>
                <span className="font-semibold text-slate-800">55,000 Square Feet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cold Storage Capacity:</span>
                <span className="font-semibold text-slate-800">10,000 Metric Tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Laser Sorting Machine:</span>
                <span className="font-semibold text-slate-800">Buhler Double-Chamber</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Logistics Port Corridors:</span>
                <span className="font-semibold text-primary">Chennai, Tuticorin & Cochin Ports</span>
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
