"use client";

import React, { useState, useEffect } from "react";
import { mockProducts, Product } from "@/lib/mock-db";
import { ShoppingBag, Eye, Award, CheckCircle, ShieldCheck, Globe, Star } from "lucide-react";

export default function AdminProductsCatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const getCountryFlag = (code: string) => {
    const flags: { [key: string]: string } = {
      "USA": "🇺🇸", "UAE": "🇦🇪", "UK": "🇬🇧", "Germany": "🇩🇪",
      "Saudi Arabia": "🇸🇦", "Singapore": "🇸🇬", "Japan": "🇯🇵",
      "Canada": "🇨🇦", "France": "🇫🇷", "Netherlands": "🇳🇱",
      "Vietnam": "🇻🇳", "Malaysia": "🇲🇾", "Kuwait": "🇰🇼",
      "Qatar": "🇶🇦", "China": "🇨🇳", "Australia": "🇦🇺"
    };
    return flags[code] || "🌐";
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center select-none border-b border-slate-200 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 leading-tight">Agro-Commodities Catalog</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage products categories, variants, and premium specifications indicators.</p>
        </div>
        <span className="px-3 py-1 bg-secondary text-primary border border-primary/10 rounded text-xs font-bold uppercase tracking-wider">
          Editable Studio Connected
        </span>
      </div>

      {/* Catalog Table Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-bold bg-slate-50/50">
                <th className="py-3.5 px-5 uppercase tracking-wider">Commodity</th>
                <th className="py-3.5 px-5 uppercase tracking-wider">Category</th>
                <th className="py-3.5 px-5 uppercase tracking-wider">Grade Status</th>
                <th className="py-3.5 px-5 uppercase tracking-wider">Export Settings</th>
                <th className="py-3.5 px-5 uppercase tracking-wider">Markets</th>
                <th className="py-3.5 px-5 uppercase tracking-wider text-center">Sorting Priority</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  
                  {/* Product title and small avatar image */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{p.name}</span>
                        <span className="text-[10px] text-slate-500 font-medium">/{p.slug}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category pill */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                      {p.category}
                    </span>
                  </td>

                  {/* Quality indicators */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {p.badge}
                    </span>
                  </td>

                  {/* Compliance flags */}
                  <td className="py-4 px-5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.isPremium && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Star className="w-2.5 h-2.5 fill-amber-600 text-amber-600" /> PREMIUM
                        </span>
                      )}
                      {p.isExportReady && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          <ShieldCheck className="w-2.5 h-2.5 text-blue-600" /> APEDA READY
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Country stamps */}
                  <td className="py-4 px-5">
                    <div className="flex gap-1 text-sm">
                      {p.exportDestinations.slice(0, 5).map((code, i) => (
                        <span key={i} title={code}>
                          {getCountryFlag(code)}
                        </span>
                      ))}
                      {p.exportDestinations.length > 5 && (
                        <span className="text-[9px] font-bold bg-secondary text-primary rounded px-1 flex items-center justify-center shrink-0">
                          +{p.exportDestinations.length - 5}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Priority order */}
                  <td className="py-4 px-5 text-center font-bold text-slate-800">
                    {p.order}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
