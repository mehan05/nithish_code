"use client";

import React from "react";
import { Download, FileText, Eye, CheckCircle2, FileCheck } from "lucide-react";

export default function BrochureSection() {
  const triggerBrochureModal = () => {
    if (typeof window !== "undefined" && (window as any).openBrochureModal) {
      (window as any).openBrochureModal();
    }
  };

  const handleDownload = () => {
    if (typeof window !== "undefined") {
      console.log("GA4 custom event: brochure_download");
    }
    window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank");
  };

  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="px-4 py-1 rounded-full bg-[#F1F5F9] text-[#1A365D] text-xs font-bold uppercase tracking-widest border border-[#718096]/30">
            Corporate Profile
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F172A]">
            Download Company Brochure
          </h2>
          <div className="w-16 h-1 bg-[#718096] rounded-full mt-2" />
          <p className="text-sm text-[#475569] max-w-lg leading-relaxed mt-1">
            Get instant access to our comprehensive product catalog, grading schedules, container loading specifications, and compliance credentials.
          </p>
        </div>

        {/* Brochure Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#F1F5F9]/40 rounded-3xl p-8 lg:p-12 border border-[#718096]/20">
          
          {/* Left panel: details and download triggers */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h3 className="font-serif text-2xl font-bold text-[#0F172A] leading-snug">
              Comprehensive Guide to Plentra Exports
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Our brochure contains ready reference guides useful for international procurement managers, including grain sorting thresholds, packaging options, and shipping port transit averages.
            </p>

            <ul className="flex flex-col gap-2.5 text-xs text-[#0F172A] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#718096] shrink-0" />
                <span>Product grading & laser-sorting standards</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#718096] shrink-0" />
                <span>Container packing capacities (FCL/LCL specs)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#718096] shrink-0" />
                <span>Phytosanitary & customs clearances checklists</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
              <button
                onClick={triggerBrochureModal}
                className="w-full sm:w-auto h-11 bg-[#718096] hover:bg-[#4A5568] text-white text-xs font-bold rounded-full px-6 flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Eye className="w-4 h-4" />
                Preview Brochure Cover
              </button>
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto h-11 border-2 border-[#1A365D] text-[#1A365D] hover:bg-[#F1F5F9] text-xs font-bold rounded-full px-6 flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>

          {/* Right panel: Inline PDF cover page visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={triggerBrochureModal}
              className="relative w-full max-w-xs aspect-[1/1.4] rounded-xl border border-[#718096]/25 bg-white shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:scale-[1.01]"
            >
              {/* Outer frame border */}
              <div className="absolute top-0 left-0 w-full h-full bg-slate-50 opacity-10 bg-[radial-gradient(#718096_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />
              
              {/* Cover illustration */}
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#1A365D]">
                    <FileCheck className="w-5 h-5" />
                    <span className="text-[10px] font-bold tracking-widest uppercase font-sans">
                      Official Document
                    </span>
                  </div>
                  <span className="text-[9px] font-bold bg-[#F1F5F9] text-[#718096] px-2 py-0.5 rounded border border-[#718096]/20">
                    Edition 2026
                  </span>
                </div>

                <div className="my-auto flex flex-col gap-2 py-8 text-center items-center">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#718096]">
                    Plentra Exports Ltd
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-[#0F172A] leading-tight">
                    Corporate Profile
                  </h4>
                  <p className="text-[10px] text-[#475569] font-sans max-w-[180px]">
                    Sourcing parameters, trade logistics, and certification matrix.
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-[#E2E8F0] pt-4 text-[9px] font-semibold text-[#475569] uppercase tracking-wider">
                  <span>Export Grade A</span>
                  <span>Direct from India</span>
                </div>
              </div>

              {/* Hover screen */}
              <div className="absolute inset-0 bg-[#718096]/8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                <span className="px-4 py-2 bg-white/95 border border-[#718096]/25 rounded-full font-bold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-[#1A365D]">
                  <Eye className="w-3.5 h-3.5" />
                  View Preview Panel
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
