"use client";

import React, { useState, useEffect } from "react";
import { getVisitors, VisitorLog } from "@/lib/mock-db";
import { Users, Globe, Search, Filter, Compass, Clock, MapPin } from "lucide-react";

export default function VisitorsGeographyPage() {
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");

  useEffect(() => {
    setVisitors(getVisitors());
  }, []);

  // Calculate country breakdowns
  const getCountryStats = () => {
    const map: { [key: string]: { visits: number; lastVisit: string; countryCode: string } } = {};
    
    visitors.forEach((v) => {
      if (!map[v.country]) {
        map[v.country] = { visits: 0, lastVisit: v.timestamp, countryCode: v.countryCode };
      }
      map[v.country].visits += 1;
      if (new Date(v.timestamp).getTime() > new Date(map[v.country].lastVisit).getTime()) {
        map[v.country].lastVisit = v.timestamp;
      }
    });

    return Object.keys(map)
      .map((name) => ({
        name,
        visits: map[name].visits,
        lastVisit: map[name].lastVisit,
        countryCode: map[name].countryCode
      }))
      .sort((a, b) => b.visits - a.visits);
  };

  const countryStats = getCountryStats();
  const uniqueCountries = Array.from(new Set(visitors.map((v) => v.country))).sort();

  // Filter logs for the timeline
  const filteredVisitors = visitors
    .filter((v) => {
      const matchesSearch = v.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.page.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = countryFilter === "all" || v.country === countryFilter;
      return matchesSearch && matchesCountry;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Latest first

  const getCountryFlag = (code: string) => {
    const flags: { [key: string]: string } = {
      "US": "🇺🇸", "AE": "🇦🇪", "GB": "🇬🇧", "DE": "🇩🇪", "SG": "🇸🇬",
      "SA": "🇸🇦", "JP": "🇯🇵", "AU": "🇦🇺", "IN": "🇮🇳", "CA": "🇨🇦",
      "FR": "🇫🇷", "NL": "🇳🇱", "VN": "🇻🇳", "MY": "🇲🇾", "KW": "🇰🇼",
      "QA": "🇶🇦", "CN": "🇨🇳"
    };
    return flags[code] || "🌐";
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex justify-between items-center select-none border-b border-slate-200 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 leading-tight">Visitor Geographics</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Track visitor geolocations, cities, and page traffic patterns.</p>
        </div>
      </div>

      {/* Grid of Geographics summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left side: Country Breakdowns Table */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">Top Export Hub Markets</h3>
            
            <div className="flex flex-col gap-3.5">
              {countryStats.slice(0, 7).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <span className="text-lg">{getCountryFlag(item.countryCode)}</span>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-slate-800">{item.visits} visits</span>
                    <span className="text-[9px] text-muted-foreground">
                      Active: {new Date(item.lastVisit).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Interactive Visitor Log Timeline */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Filters inside logs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm items-center">
            
            <div className="md:col-span-7 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search logs by City, IP, or Page..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>

            <div className="md:col-span-5 flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full h-10 px-2.5 border border-slate-200 bg-white rounded-xl text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="all">All Countries</option>
                {uniqueCountries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Logs table list */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center select-none bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Live Geographics Logs</h3>
              <span className="text-[10px] text-muted-foreground font-semibold">Showing {filteredVisitors.length} sessions</span>
            </div>

            <div className="overflow-y-auto max-h-[360px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/10">
                    <th className="py-2.5 px-5 uppercase tracking-wider">Timestamp</th>
                    <th className="py-2.5 px-5 uppercase tracking-wider">Geography</th>
                    <th className="py-2.5 px-5 uppercase tracking-wider">Anonymous IP</th>
                    <th className="py-2.5 px-5 uppercase tracking-wider">Page Visited</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitors.slice(0, 30).map((v) => (
                    <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-5 text-slate-500 font-medium whitespace-nowrap">
                        {new Date(v.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <span>{getCountryFlag(v.countryCode)}</span>
                          <span>{v.city}, {v.country}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 font-mono text-slate-500 font-medium">{v.ip}</td>
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-secondary text-primary font-mono text-[10px] border border-primary/5">
                          {v.page}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
