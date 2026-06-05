"use client";

import React, { use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useSearchParams, useRouter } from "next/navigation";
import { mockProducts, Product } from "@/lib/mock-db";
import { Check, ArrowLeft, Send, Container, ShieldCheck, Globe, Star } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find 3 related products
  const relatedProducts = mockProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const triggerQuote = () => {
    if (typeof window !== "undefined" && (window as any).openQuoteModal) {
      // Pass product.variants so the form shows subcategories for this specific product
      (window as any).openQuoteModal(product.name, product.variants);
    }
  };

  // Auto-trigger quote modal when arriving via ?quote=true (e.g. from product listing "Get Quote" button)
  useEffect(() => {
    if (searchParams.get("quote") === "true") {
      // Small delay to ensure PublicShell has registered window.openQuoteModal
      const timer = setTimeout(() => {
        triggerQuote();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchParams, slug]);

  const getCountryFlag = (code: string) => {
    const flags: { [key: string]: string } = {
      "USA": "🇺🇸", "UAE": "🇦🇪", "UK": "🇬🇧", "Germany": "🇩🇪",
      "Saudi Arabia": "🇸🇦", "Singapore": "🇸🇬", "Japan": "🇯🇵",
      "Canada": "🇨🇦", "France": "🇫🇷", "Netherlands": "🇳🇱",
      "Vietnam": "🇻🇳", "Malaysia": "🇲🇾", "Kuwait": "🇰🇼",
      "Qatar": "🇶🇦", "China": "🇨🇳", "Australia": "🇦🇺",
      "Bangladesh": "🇧🇩", "Sri Lanka": "🇱🇰", "Thailand": "🇹🇭",
      "Indonesia": "🇮🇩"
    };
    return flags[code] || "🌐";
  };

  return (
    <div className="flex-1 bg-background py-12">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Catalog</span>
        </Link>

        {/* Product Detail Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          
          {/* Left Column: Big Product Image */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border bg-slate-100 shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Quick specifications badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-secondary/40 border border-primary/10 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-5 h-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-800 uppercase">APEDA Ready</span>
              </div>
              <div className="bg-secondary/40 border border-primary/10 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <Container className="w-5 h-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-800 uppercase">FCL / LCL</span>
              </div>
              <div className="bg-secondary/40 border border-primary/10 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <Globe className="w-5 h-5 text-primary mb-1" />
                <span className="text-[10px] font-bold text-slate-800 uppercase">CIF Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions and quick actions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Product Badges & Name */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded">
                  {product.badge}
                </span>
                <span className="px-3 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider rounded">
                  Premium Quality
                </span>
                <span className="px-3 py-0.5 bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-bold uppercase tracking-wider rounded">
                  Export Ready
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                {product.name}
              </h1>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Specifications bullet lists split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-border/60 py-6">
              
              {/* Key specifications */}
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-3">
                  Product Specifications:
                </span>
                <ul className="flex flex-col gap-2 text-xs text-slate-700">
                  {product.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sourced variants list */}
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-3">
                  Sourced Varieties:
                </span>
                <ul className="flex flex-col gap-2 text-xs text-slate-700">
                  {product.variants.map((v, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Star className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5 fill-primary" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Packaging and shipping info */}
            <div className="flex flex-col gap-2.5">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-1">
                  Packaging Options:
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.packagingInfo}
                </p>
              </div>

              <div className="mt-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-2">
                  Key Export Markets:
                </span>
                <div className="flex flex-wrap gap-2 items-center">
                  {product.exportDestinations.map((dest, i) => (
                    <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-border text-xs text-slate-700 font-medium">
                      <span>{getCountryFlag(dest)}</span>
                      <span>{dest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA action trigger */}
            <div className="pt-4">
              <button
                onClick={triggerQuote}
                className="w-full sm:w-auto h-12 bg-primary hover:bg-accent text-white font-bold rounded-full px-8 flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                Request Custom Bulk Quote
              </button>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        <div className="border-t border-border/80 pt-16">
          <h2 className="font-serif text-2xl font-bold text-slate-900 text-center lg:text-left mb-10">
            Other Premium Commodities Sourced
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white border border-border/80 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 group flex flex-col hover:shadow-md"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-primary">
                      {rel.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-primary transition-colors mt-0.5">
                      {rel.name}
                    </h3>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={() => router.push(`/products/${rel.slug}?quote=true`)}
                      className="flex-1 py-1.5 bg-primary text-white text-[11px] font-bold rounded-full hover:bg-accent transition-colors"
                    >
                      Quote
                    </button>
                    <Link
                      href={`/products/${rel.slug}`}
                      className="py-1.5 px-3 border border-border text-slate-700 text-[11px] font-bold rounded-full hover:bg-secondary hover:text-primary transition-colors text-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
