"use client";

import React, { useState, useEffect } from "react";
import { getQuotes, updateQuoteStatus, QuoteSubmission } from "@/lib/mock-db";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  X,
  FileSpreadsheet,
  Save,
  MessageSquare,
  AlertCircle
} from "lucide-react";

export default function QuotesManagementPage() {
  const [quotes, setQuotes] = useState<QuoteSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteSubmission | null>(null);
  
  // Edit notes state
  const [activeNotes, setActiveNotes] = useState("");
  const [activeStatus, setActiveStatus] = useState<QuoteSubmission['status']>("new");

  useEffect(() => {
    setQuotes(getQuotes());
  }, []);

  const refreshQuotes = () => {
    setQuotes(getQuotes());
  };

  // Filter quotes
  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch = q.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenDetails = (quote: QuoteSubmission) => {
    setSelectedQuote(quote);
    setActiveNotes(quote.notes || "");
    setActiveStatus(quote.status);
  };

  const handleSaveDetails = () => {
    if (!selectedQuote) return;
    const updated = updateQuoteStatus(selectedQuote.id, activeStatus, activeNotes);
    if (updated) {
      setSelectedQuote(updated);
      refreshQuotes();
    }
  };

  const getCountryFlag = (name: string) => {
    const flags: { [key: string]: string } = {
      "Malaysia": "🇲🇾",
      "Bangladesh": "🇧🇩",
      "Sri Lanka": "🇱🇰",
      "Singapore": "🇸🇬",
      "Thailand": "🇹🇭",
      "Vietnam": "🇻🇳",
      "Australia": "🇦🇺",
      "United Arab Emirates": "🇦🇪",
      "Indonesia": "🇮🇩"
    };
    return flags[name] || "🌐";
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Date", "Company Name", "Customer Name", "Email", "Product Name", "Quantity", "Destination Country", "Status", "Admin Notes"];
    const rows = filteredQuotes.map(q => [
      q.id,
      q.createdAt,
      `"${q.companyName.replace(/"/g, '""')}"`,
      `"${q.customerName.replace(/"/g, '""')}"`,
      q.email,
      q.productName,
      `"${q.quantity.replace(/"/g, '""')}"`,
      `"${(q.country || 'N/A').replace(/"/g, '""')}"`,
      q.status,
      `"${(q.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Plentra_Quotes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">New</span>;
      case "reviewed":
        return <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 border border-amber-200">Reviewed</span>;
      case "responded":
        return <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">Responded</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">Closed</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header bar */}
      <div className="flex justify-between items-center select-none border-b border-slate-200 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 leading-tight">Quote Inquiries Desk</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage, review, status track and export bulk commodity quote requests.</p>
        </div>
        
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-accent text-white text-xs font-bold rounded-full shadow transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Export to CSV
        </button>
      </div>

      {/* Filters Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm items-center">
        
        {/* Search */}
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search quotes by Company, Customer Name or Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-3 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        {/* Status selection */}
        <div className="md:col-span-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-10 px-2.5 border border-slate-200 bg-white rounded-xl text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New (Unread)</option>
            <option value="reviewed">Reviewed</option>
            <option value="responded">Responded</option>
            <option value="closed">Closed / Dealt</option>
          </select>
        </div>

      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-bold bg-slate-50/50">
                <th className="py-3.5 px-5 uppercase tracking-wider">Date Received</th>
                <th className="py-3.5 px-5 uppercase tracking-wider">Company</th>
                <th className="py-3.5 px-5 uppercase tracking-wider">Destination Country</th>
                <th className="py-3.5 px-5 uppercase tracking-wider">Product Name</th>
                <th className="py-3.5 px-5 uppercase tracking-wider">Qty Req</th>
                <th className="py-3.5 px-5 uppercase tracking-wider">Status</th>
                <th className="py-3.5 px-5 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-medium bg-slate-50/20">
                    No quote requests match your query filter.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => (
                   <tr key={q.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-5 text-slate-600 font-medium">
                      {new Date(q.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{q.companyName}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{q.customerName} ({q.email})</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <span className="text-base leading-none">{getCountryFlag(q.country)}</span>
                        <span>{q.country || "N/A"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-semibold text-slate-800">{q.productName}</td>
                    <td className="py-4 px-5 text-slate-600 font-medium">{q.quantity}</td>
                    <td className="py-4 px-5">{getStatusBadge(q.status)}</td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleOpenDetails(q)}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-secondary text-primary hover:bg-primary hover:text-white text-[10px] font-bold uppercase rounded-full transition-all shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage / View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Side-Drawer / Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg h-screen bg-white shadow-2xl p-6 flex flex-col justify-between border-l border-slate-200 animate-slide-in">
            
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between border-b border-slate-100 pb-4 mb-4 select-none">
              <div className="flex items-center gap-2 text-primary">
                <MessageSquare className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-slate-900">Manage Quote Details</h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content body scroll */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-5 text-xs text-slate-700">
              
              {/* Profile Summary */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Inquiry ID: {selectedQuote.id}</span>
                  {getStatusBadge(selectedQuote.status)}
                </div>
                
                <h4 className="font-serif text-lg font-bold text-slate-900 mt-1">{selectedQuote.companyName}</h4>
                <div className="flex flex-col text-[11px] text-slate-500">
                  <span>Contact: **{selectedQuote.customerName}**</span>
                  <span>Email: <a href={`mailto:${selectedQuote.email}`} className="text-primary underline">{selectedQuote.email}</a></span>
                  <span>Received: {new Date(selectedQuote.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Inquiry Specifications */}
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-slate-800 uppercase tracking-wide">Commodity Requirements:</span>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Product Demanded:</span>
                    <strong className="text-slate-900 font-semibold">{selectedQuote.productName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quantity Needed:</span>
                    <strong className="text-slate-900 font-semibold">{selectedQuote.quantity}</strong>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-2">
                    <span className="text-slate-500">Target Country:</span>
                    <strong className="text-slate-900 font-semibold flex items-center gap-1">
                      <span>{getCountryFlag(selectedQuote.country)}</span>
                      <span>{selectedQuote.country || "N/A"}</span>
                    </strong>
                  </div>
                </div>
              </div>

              {/* Core Message */}
              {selectedQuote.message && (
                <div className="flex flex-col gap-1.5">
                  <span className="font-bold text-slate-800 uppercase tracking-wide">Customer Notes / Message:</span>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">
                    {selectedQuote.message}
                  </div>
                </div>
              )}

              {/* Status Update Select */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-800 uppercase tracking-wide">Inquiry Status:</label>
                <select
                  value={activeStatus}
                  onChange={(e) => setActiveStatus(e.target.value as QuoteSubmission['status'])}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="new">New (Unread)</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="responded">Responded</option>
                  <option value="closed">Closed / Deal Finalized</option>
                </select>
              </div>

              {/* Internal Notes textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-800 uppercase tracking-wide">Internal Admin Notes:</label>
                <textarea
                  rows={4}
                  placeholder="Type internal tariff updates, shipment ports details, packing guidelines or draft pricing details..."
                  value={activeNotes}
                  onChange={(e) => setActiveNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                />
              </div>

            </div>

            {/* Actions button footer */}
            <div className="shrink-0 border-t border-slate-100 pt-4 flex gap-2">
              <button
                onClick={() => setSelectedQuote(null)}
                className="flex-1 h-11 border border-slate-200 text-slate-700 font-semibold rounded-full text-xs hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDetails}
                className="flex-1 h-11 bg-primary hover:bg-accent text-white font-semibold rounded-full text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
