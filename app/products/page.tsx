"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockProducts, Product } from "@/lib/mock-db";
import { Search, Filter, Check, ArrowRight } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const categories = ["all", "spices", "vegetables", "nuts"];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.variants.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
    <div className="flex-1 bg-background">
      
      {/* Banner / Header */}
      <div className="bg-secondary/40 border-b border-border/50 py-16 text-center">
        <div className="container mx-auto px-4">
          <span className="px-3.5 py-1 bg-white text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/10">
            Export Catalog
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Our Premium Agricultural Portfolio
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-2 leading-relaxed">
            Direct farmer procurement. Graded, certified, and standard packed matching international import-export schedules.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-border/60">
          
          {/* Categories selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-all ${
                  selectedCategory === cat
                    ? "bg-primary border-primary text-white shadow-sm"
                    : "bg-white border-border text-slate-700 hover:border-primary/20 hover:bg-secondary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search field */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-3 bg-white border border-input rounded-full text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

        </div>

        {/* Catalog List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-border/80">
            <h3 className="font-serif text-lg font-bold text-slate-800">No Commodities Found</h3>
            <p className="text-xs text-muted-foreground mt-1">Try resetting your filter parameters or search queries.</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="mt-4 px-5 py-2 bg-primary hover:bg-accent text-white text-xs font-semibold rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-border/80 overflow-hidden hover:border-primary/30 transition-all duration-300 group flex flex-col hover:shadow-lg"
              >
                <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col">
                  {/* Visual Cover */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-primary rounded-full shadow border border-primary/10">
                      {product.badge}
                    </span>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-primary mb-1">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                      {product.description}
                    </p>

                    {/* Variants */}
                    <div className="border-t border-border/60 pt-4 mb-4">
                      <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wide block mb-2">
                        Key Variants Sourced:
                      </span>
                      <ul className="flex flex-col gap-1.5 text-xs text-slate-700">
                        {product.variants.slice(0, 3).map((variant, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{variant}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Destination list */}
                    <div className="border-t border-border/60 pt-4 mb-5 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wide">
                        Major Destinations:
                      </span>
                      <div className="flex gap-1.5 text-base">
                        {product.exportDestinations.slice(0, 5).map((dest, i) => (
                          <span key={i} title={dest}>
                            {getCountryFlag(dest)}
                          </span>
                        ))}
                        {product.exportDestinations.length > 5 && (
                          <span className="text-[10px] font-bold bg-secondary text-primary rounded px-1.5 py-0.5 flex items-center justify-center shrink-0">
                            +{product.exportDestinations.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Actions CTAs */}
                <div className="px-6 pb-6 pt-0 flex gap-2 mt-auto">
                  <button
                    onClick={() => router.push(`/products/${product.slug}?quote=true`)}
                    className="flex-1 py-2.5 px-4 bg-primary text-white text-xs font-semibold rounded-full hover:bg-accent transition-colors flex items-center justify-center gap-1.5"
                  >
                    Get Quote
                  </button>
                  <Link
                    href={`/products/${product.slug}`}
                    className="py-2.5 px-4 border border-border text-slate-800 text-xs font-semibold rounded-full hover:bg-secondary hover:text-primary transition-colors flex items-center justify-center gap-1"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
