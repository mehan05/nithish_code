"use client";

import React, { useState } from "react";
import { ShieldCheck, ArrowUpRight, Award, FileText, CheckCircle2, Star, Briefcase, Leaf, Globe, X } from "lucide-react";
import { mockCertifications, Certification } from "@/lib/mock-db";

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const getIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      "shield": ShieldCheck,
      "file": FileText,
      "award": Award,
      "check": CheckCircle2,
      "briefcase": Briefcase,
      "leaf": Leaf,
      "star": Star,
      "globe": Globe
    };
    const IconComp = icons[type] || ShieldCheck;
    return <IconComp className="w-6 h-6" />;
  };

  const handleOpenCertificate = (cert: Certification) => {
    if (typeof window !== "undefined") {
      console.log("GA4 custom event: certificate_view", { shortCode: cert.shortCode });
    }
    setSelectedCert(cert);
  };

  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="px-4 py-1 rounded-full bg-[#F1F5F9] text-[#1A365D] text-xs font-bold uppercase tracking-widest border border-[#718096]/30">
            Compliance & Registrations
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F172A]">
            Export Certifications & Licenses
          </h2>
          <div className="w-16 h-1 bg-[#718096] rounded-full mt-2" />
          <p className="text-sm text-[#475569] max-w-lg leading-relaxed mt-1">
            Plentra is fully authorized to conduct bulk cross-border commerce by central food, spice, and customs agencies.
          </p>
        </div>

        {/* 8 Certification Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCertifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:border-[#718096]/40 transition-all duration-300 hover:shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#1A365D] group-hover:scale-105 transition-transform">
                    {getIcon(cert.iconType)}
                  </div>
                  <span className="text-[10px] font-bold bg-[#F1F5F9] text-[#1A365D] border border-[#718096]/25 px-2 py-0.5 rounded uppercase tracking-wider">
                    {cert.shortCode}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0F172A] group-hover:text-[#1A365D] transition-colors mb-2">
                  {cert.name}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <button
                onClick={() => handleOpenCertificate(cert)}
                className="mt-5 w-full py-2 bg-[#F1F5F9] text-[#1A365D] text-xs font-bold rounded-full hover:bg-[#718096] hover:text-white transition-all flex items-center justify-center gap-1 group/btn border border-[#E2E8F0] hover:border-[#718096]"
              >
                <span>View Certificate</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Dynamic Zoom Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden animate-scale-up p-6">
              
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#1A365D]">
                    {getIcon(selectedCert.iconType)}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F172A] leading-tight">
                      {selectedCert.name}
                    </h3>
                    <p className="text-xs text-[#718096] tracking-wider uppercase font-bold mt-0.5">
                      Registration Badge Code: {selectedCert.shortCode}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 text-[#475569] hover:text-[#1A365D] hover:bg-[#F1F5F9] rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate simulated graphic */}
              <div className="bg-[#F1F5F9]/60 border border-[#718096]/25 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4 py-12 relative overflow-hidden select-none">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#718096]/8 rounded-full filter blur-xl" />
                <Award className="w-16 h-16 text-[#718096]" />
                
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold tracking-tight text-[#0F172A]">
                    GOVERNMENT OF INDIA
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#475569] tracking-widest mt-1">
                    Verified Digital Export Registry
                  </span>
                </div>

                <div className="w-full border-t border-dashed border-[#718096]/40 my-2" />

                <div className="text-xs text-[#0F172A] max-w-sm leading-relaxed">
                  <p className="font-bold text-[#718096] text-sm uppercase mb-1">
                    {selectedCert.shortCode} LICENSE VALIDATED
                  </p>
                  <p className="text-[#475569]">
                    This document verifies that Plentra Exports is fully compliant with standard trade norms and registered under regulatory schedules.
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 text-[#718096] text-xs font-semibold bg-[#F1F5F9] px-3 py-1 rounded-full mt-2 border border-[#718096]/20">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Safe & Authentic Exporter</span>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2 bg-[#1A365D] hover:bg-[#718096] text-white text-xs font-bold rounded-full transition-colors"
                >
                  Done, Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
