"use client";

import React, { useState } from "react";
import { ShieldCheck, FileText, Award, CheckCircle2, Briefcase, Leaf, Star, Globe, ArrowUpRight, X } from "lucide-react";
import { mockCertifications, Certification } from "@/lib/mock-db";

export default function CertificationsPage() {
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
    setSelectedCert(cert);
  };

  return (
    <div className="flex-1 bg-background">
      
      {/* Banner */}
      <div className="bg-secondary/40 border-b border-border/50 py-16 text-center">
        <div className="container mx-auto px-4">
          <span className="px-3.5 py-1 bg-white text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/10">
            Official Approvals
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Global Compliance & Licensing
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-2 leading-relaxed">
            Standard authorizations, food security central licenses, MSME ratings, and customs filings certificates.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        
        {/* Core Description */}
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-5 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
            Authorized Trade Partners
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Plentra is registered with central customs clearing agencies, food hygiene boards, and agricultural trade promoters to execute seamless sea container exports. You can zoom in on any certificate below to check its credentials code.
          </p>
        </div>

        {/* 8 Certification Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockCertifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-border/80 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    {getIcon(cert.iconType)}
                  </div>
                  <span className="text-[10px] font-bold bg-secondary text-primary border border-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    {cert.shortCode}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                  {cert.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <button
                onClick={() => handleOpenCertificate(cert)}
                className="mt-6 w-full py-2 bg-secondary/50 text-primary text-xs font-bold rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1 group/btn"
              >
                <span>Zoom Certificate</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Zoom Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-border overflow-hidden animate-scale-up p-6">
              
              <div className="flex justify-between items-start border-b border-border/60 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                    {getIcon(selectedCert.iconType)}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">
                      {selectedCert.name}
                    </h3>
                    <p className="text-xs text-muted-foreground tracking-wider uppercase font-bold mt-0.5 text-primary">
                      Registration Badge Code: {selectedCert.shortCode}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 text-muted-foreground hover:text-primary hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate simulated graphic */}
              <div className="bg-secondary/40 border border-primary/20 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4 py-12 relative overflow-hidden select-none">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full filter blur-xl" />
                <Award className="w-16 h-16 text-primary animate-pulse" />
                
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold tracking-tight text-slate-800">
                    GOVERNMENT OF INDIA
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">
                    Verified Digital Export Registry
                  </span>
                </div>

                <div className="w-full border-t border-dashed border-primary/30 my-2" />

                <div className="text-xs text-slate-700 max-w-sm leading-relaxed">
                  <p className="font-bold text-primary text-sm uppercase mb-1">
                    {selectedCert.shortCode} LICENSE VALIDATED
                  </p>
                  <p className="text-muted-foreground">
                    This document verifies that Plentra Exports is fully compliant with standard trade norms and registered under regulatory schedules.
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold bg-emerald-100/80 px-3 py-1 rounded-full mt-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Safe & Authentic Exporter</span>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2 bg-primary hover:bg-accent text-white text-xs font-bold rounded-full transition-colors"
                >
                  Done, Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
