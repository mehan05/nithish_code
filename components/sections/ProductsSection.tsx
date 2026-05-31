"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { mockProducts } from "@/lib/mock-db";

export default function ProductsSection() {
  const triggerQuote = (productName: string) => {
    if (typeof window !== "undefined" && (window as any).openQuoteModal) {
      (window as any).openQuoteModal(productName);
    }
  };

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
    <section className="py-20 bg-white border-b border-[#D8F3DC]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="px-4 py-1 rounded-full bg-[#F7F9F7] text-[#1B4332] text-xs font-bold uppercase tracking-widest border border-[#2D6A4F]/30">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F2D1E]">
            Premium Agro-Commodities We Export
          </h2>
          <div className="w-16 h-1 bg-[#2D6A4F] rounded-full mt-2" />
          <p className="text-sm text-[#40916C] max-w-xl leading-relaxed mt-1">
            Carefully curated, certified, and premium graded products sourced directly from selected farming clusters across India.
          </p>
        </div>

        {/* 3-Column Card Grid - Shows all 8 products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#D8F3DC] overflow-hidden hover:border-[#2D6A4F]/40 transition-all duration-300 group flex flex-col hover:shadow-xl"
            >
              <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col">
                {/* Product Image Panel */}
                <div className="relative h-56 w-full overflow-hidden bg-[#F7F9F7]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-[#1B4332] rounded-full shadow border border-[#2D6A4F]/20">
                    {product.badge}
                  </span>
                </div>

                {/* Product Content Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#2D6A4F] mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#0F2D1E] group-hover:text-[#1B4332] transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#40916C] leading-relaxed mb-4 flex-1">
                    {product.description}
                  </p>

                  {/* Variants List */}
                  <div className="border-t border-[#D8F3DC] pt-4 mb-4">
                    <span className="text-[10px] font-bold text-[#0F2D1E] uppercase tracking-wide block mb-2">
                      Key Variants Sourced:
                    </span>
                    <ul className="flex flex-col gap-1.5 text-xs text-[#40916C]">
                      {product.variants.slice(0, 3).map((variant, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                          <span>{variant}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Destinations */}
                  <div className="border-t border-[#D8F3DC] pt-4 mb-5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#0F2D1E] uppercase tracking-wide">
                      Major Destinations:
                    </span>
                    <div className="flex gap-1.5 text-base">
                      {product.exportDestinations.slice(0, 4).map((dest, i) => (
                        <span key={i} title={dest} className="cursor-help">
                          {getCountryFlag(dest)}
                        </span>
                      ))}
                      {product.exportDestinations.length > 4 && (
                        <span className="text-[10px] font-bold bg-[#F7F9F7] text-[#1B4332] rounded px-1.5 py-0.5 flex items-center justify-center shrink-0">
                          +{product.exportDestinations.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              {/* Button Action CTA */}
              <div className="px-6 pb-6 pt-0 flex gap-2 shrink-0 mt-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerQuote(product.name);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#2D6A4F] hover:bg-[#2D6A4F] text-white text-xs font-semibold rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  Get Quote
                </button>
                <Link
                  href={`/products/${product.slug}`}
                  className="py-2.5 px-4 border border-[#D8F3DC] text-[#1B4332] text-[11px] font-semibold rounded-full hover:bg-[#F7F9F7] hover:border-[#1B4332]/30 transition-colors flex items-center justify-center gap-1"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all products link */}
        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D6A4F] hover:text-[#2D6A4F] group"
          >
            Explore Full Product Catalog
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
