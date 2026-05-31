"use client";

import React, { useState } from "react";
import { ShieldCheck, ArrowUpRight, Award, FileText, CheckCircle2, Star, Briefcase, Leaf, Globe, X, ZoomIn, ZoomOut, RotateCw, RotateCcw, Download } from "lucide-react";
import { mockCertifications, Certification } from "@/lib/mock-db";

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotateCw = () => setRotation(prev => prev + 90);
  const handleRotateCcw = () => setRotation(prev => prev - 90);

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
    setZoom(1);
    setRotation(0);
    setSelectedCert(cert);
  };

  return (
    <section className="py-20 bg-white border-b border-[#D8F3DC]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="px-4 py-1 rounded-full bg-[#F7F9F7] text-[#1B4332] text-xs font-bold uppercase tracking-widest border border-[#2D6A4F]/30">
            Compliance & Registrations
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F2D1E]">
            Export Certifications & Licenses
          </h2>
          <div className="w-16 h-1 bg-[#2D6A4F] rounded-full mt-2" />
          <p className="text-sm text-[#40916C] max-w-lg leading-relaxed mt-1">
            Plentra is fully authorized to conduct bulk cross-border commerce by central food, spice, and customs agencies.
          </p>
        </div>

        {/* 8 Certification Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCertifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-[#D8F3DC] rounded-2xl p-5 hover:border-[#2D6A4F]/40 transition-all duration-300 hover:shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F7F9F7] flex items-center justify-center text-[#1B4332] group-hover:scale-105 transition-transform">
                    {getIcon(cert.iconType)}
                  </div>
                  <span className="text-[10px] font-bold bg-[#F7F9F7] text-[#1B4332] border border-[#2D6A4F]/25 px-2 py-0.5 rounded uppercase tracking-wider">
                    {cert.shortCode}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0F2D1E] group-hover:text-[#1B4332] transition-colors mb-2">
                  {cert.name}
                </h3>
                <p className="text-xs text-[#40916C] leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <button
                onClick={() => handleOpenCertificate(cert)}
                className="mt-5 w-full py-2 bg-[#F7F9F7] text-[#1B4332] text-xs font-bold rounded-full hover:bg-[#2D6A4F] hover:text-white transition-all flex items-center justify-center gap-1 group/btn border border-[#D8F3DC] hover:border-[#2D6A4F]"
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
            <div className={`relative w-full ${selectedCert.documentUrl ? 'max-w-4xl' : 'max-w-lg'} bg-white rounded-2xl shadow-xl border border-[#D8F3DC] overflow-hidden animate-scale-up p-6`}>
              
              <div className="flex justify-between items-start border-b border-[#D8F3DC] pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F7F9F7] flex items-center justify-center text-[#1B4332]">
                    {getIcon(selectedCert.iconType)}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F2D1E] leading-tight">
                      {selectedCert.name}
                    </h3>
                    <p className="text-xs text-[#2D6A4F] tracking-wider uppercase font-bold mt-0.5">
                      Registration Badge Code: {selectedCert.shortCode}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 text-[#40916C] hover:text-[#1B4332] hover:bg-[#F7F9F7] rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Content */}
              {selectedCert.documentUrl ? (
                <div className="w-full h-[65vh] bg-gray-50 rounded-xl overflow-hidden border border-[#D8F3DC] flex flex-col">
                  {/* PDF Toolbar */}
                  <div className="bg-[#F7F9F7] border-b border-[#D8F3DC] p-2 flex gap-2 justify-center items-center">
                    <button onClick={handleZoomOut} className="p-2 bg-white border border-[#D8F3DC] rounded hover:bg-[#E8F3EC] text-[#1B4332] transition-colors shadow-sm" title="Zoom Out">
                      <ZoomOut className="w-4 h-4"/>
                    </button>
                    <span className="text-xs font-bold text-[#1B4332] min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
                    <button onClick={handleZoomIn} className="p-2 bg-white border border-[#D8F3DC] rounded hover:bg-[#E8F3EC] text-[#1B4332] transition-colors shadow-sm" title="Zoom In">
                      <ZoomIn className="w-4 h-4"/>
                    </button>
                    
                    <div className="w-px h-6 bg-[#D8F3DC] mx-2" />
                    
                    <button onClick={handleRotateCcw} className="p-2 bg-white border border-[#D8F3DC] rounded hover:bg-[#E8F3EC] text-[#1B4332] transition-colors shadow-sm" title="Rotate Left">
                      <RotateCcw className="w-4 h-4"/>
                    </button>
                    <button onClick={handleRotateCw} className="p-2 bg-white border border-[#D8F3DC] rounded hover:bg-[#E8F3EC] text-[#1B4332] transition-colors shadow-sm" title="Rotate Right">
                      <RotateCw className="w-4 h-4"/>
                    </button>
                    
                    <div className="w-px h-6 bg-[#D8F3DC] mx-2" />
                    
                    <a href={selectedCert.documentUrl} download className="p-2 bg-[#1B4332] border border-[#1B4332] rounded hover:bg-[#2D6A4F] text-white transition-colors shadow-sm flex items-center gap-1 text-xs font-bold" title="Download PDF">
                      <Download className="w-4 h-4"/>
                      <span>Save</span>
                    </a>
                  </div>
                  
                  {/* PDF Viewer */}
                  <div className="flex-1 overflow-auto bg-[#E5E7EB] relative flex items-center justify-center p-4">
                    <div 
                      style={{ 
                        transform: `scale(${zoom}) rotate(${rotation}deg)`, 
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        width: '100%',
                        height: '100%'
                      }} 
                      className="origin-center flex items-center justify-center"
                    >
                      <iframe 
                        src={`${selectedCert.documentUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full shadow-md bg-white rounded"
                        title={selectedCert.name}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#F7F9F7]/60 border border-[#2D6A4F]/25 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4 py-12 relative overflow-hidden select-none">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#2D6A4F]/8 rounded-full filter blur-xl" />
                  <Award className="w-16 h-16 text-[#2D6A4F]" />
                  
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold tracking-tight text-[#0F2D1E]">
                      GOVERNMENT OF INDIA
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#40916C] tracking-widest mt-1">
                      Verified Digital Export Registry
                    </span>
                  </div>

                  <div className="w-full border-t border-dashed border-[#2D6A4F]/40 my-2" />

                  <div className="text-xs text-[#0F2D1E] max-w-sm leading-relaxed">
                    <p className="font-bold text-[#2D6A4F] text-sm uppercase mb-1">
                      {selectedCert.shortCode} LICENSE VALIDATED
                    </p>
                    <p className="text-[#40916C]">
                      This document verifies that Plentra Exports is fully compliant with standard trade norms and registered under regulatory schedules.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[#2D6A4F] text-xs font-semibold bg-[#F7F9F7] px-3 py-1 rounded-full mt-2 border border-[#2D6A4F]/20">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Safe & Authentic Exporter</span>
                  </div>
                </div>
              )}

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold rounded-full transition-colors"
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
