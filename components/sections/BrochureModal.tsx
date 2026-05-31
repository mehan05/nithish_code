"use client";

import React, { useState } from "react";
import { X, Download, FileText, Loader2, ExternalLink } from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// PDF URL — swap for your actual hosted PDF later.
// Using a reliable CORS-free public PDF served via Google Docs Viewer.
const PDF_URL =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const GDOCS_VIEWER = `https://docs.google.com/viewer?url=${encodeURIComponent(PDF_URL)}&embedded=true`;

export default function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (typeof window !== "undefined") {
      console.log("GA4 custom event: brochure_download");
    }
    window.open(PDF_URL, "_blank");
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col animate-scale-up">

        {/* Modal Header */}
        <div className="bg-secondary px-6 py-4 flex justify-between items-center border-b border-border/60 shrink-0">
          <div className="flex items-center gap-2 text-primary">
            <FileText className="w-5 h-5" />
            <h3 className="font-serif text-lg font-bold">
              Plentra Exports — Corporate Profile 2026
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 border border-primary text-primary hover:bg-primary hover:text-white text-xs font-semibold rounded-full transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in Tab
            </a>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-primary hover:bg-accent text-white text-xs font-semibold rounded-full shadow transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Preview Pane */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden">

          {/* Loading spinner overlay */}
          {loading && !error && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-100">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm font-medium text-muted-foreground">
                Loading PDF preview…
              </p>
            </div>
          )}

          {/* Error fallback */}
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 gap-5 bg-white">
              <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <div className="flex flex-col gap-2 max-w-sm">
                <h4 className="text-xl font-bold text-slate-900">
                  Preview Unavailable
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your browser couldn&apos;t render the inline PDF preview. You can open it in a new tab or download it directly.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap justify-center">
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-primary text-primary hover:bg-secondary rounded-full text-sm font-semibold transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </a>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white hover:bg-accent rounded-full text-sm font-semibold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Brochure
                </button>
              </div>
            </div>
          ) : (
            /* Google Docs Viewer iframe — most reliable cross-browser PDF embed */
            <iframe
              src={GDOCS_VIEWER}
              title="Plentra Exports Corporate Brochure"
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              allow="fullscreen"
            />
          )}
        </div>

      </div>
    </div>
  );
}
