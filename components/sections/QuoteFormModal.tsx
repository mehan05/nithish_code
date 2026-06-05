"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, Mail, Briefcase, FileText, Send, ShoppingBag } from "lucide-react";
import { saveQuote, mockProducts } from "@/lib/mock-db";

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
  /** When provided, the Product Category dropdown shows these variants instead of all products */
  productVariants?: string[];
}

export default function QuoteFormModal({ isOpen, onClose, initialProduct = "", productVariants }: QuoteFormModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProductName(initialProduct);
      setIsSuccess(false);
    }
  }, [isOpen, initialProduct]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !customerName || !email || !productName || !quantity || !country) return;

    setIsSubmitting(true);

    // Call local mock DB save method
    try {
      saveQuote({
        companyName,
        customerName,
        email,
        productName,
        quantity,
        country,
        message
      });

      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote',
          companyName,
          customerName,
          email,
          productName,
          quantity,
          country,
          message
        })
      });

      // Track Custom GA4-like Event if window is present
      if (typeof window !== "undefined") {
        console.log("GA4 custom event: quote_form_submit", { productName, country });
      }

      setIsSuccess(true);
      
      // Clear Form Fields
      setCompanyName("");
      setCustomerName("");
      setEmail("");
      setProductName("");
      setQuantity("");
      setCountry("");
      setMessage("");

    } catch (err) {
      console.error("Failed to submit quote request:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-border overflow-hidden animate-scale-up">
        
        {/* Header banner */}
        <div className="bg-secondary px-6 py-4 flex justify-between items-center border-b border-border/60">
          <div className="flex items-center gap-2 text-primary">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="font-serif text-lg font-bold">Request a Bulk Quote</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-primary hover:bg-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content area */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-8 gap-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-primary">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-xl font-bold text-slate-800">Inquiry Submitted Successfully</h4>
              <p className="text-sm text-muted-foreground max-w-sm">
                Thank you for your bulk inquiry. Our international export desk will review your requirements and reach out to you within **24 hours**.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-primary text-white hover:bg-accent rounded-full text-sm font-medium transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Company Name *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="e.g. Al-Barakah Corp"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full h-10 pl-9 pr-3 border border-input rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Contact Person *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Mohammad Al-Mansoori"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full h-10 px-3 border border-input rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Business Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="purchase@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-10 pl-9 pr-3 border border-input rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Country of Destination *</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full h-10 px-2.5 border border-input rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="" disabled>Select Country</option>
                  {["Malaysia", "Bangladesh", "Sri Lanka", "Singapore", "Thailand", "Vietnam", "Australia", "United Arab Emirates", "Indonesia"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    {productVariants ? "Product Variant *" : "Product Category *"}
                  </label>
                  <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    className="w-full h-10 px-2.5 border border-input rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option value="" disabled>
                      {productVariants ? "Select Variant" : "Select Commodity"}
                    </option>
                    {productVariants
                      ? productVariants.map((variant) => (
                          <option key={variant} value={variant}>
                            {variant}
                          </option>
                        ))
                      : mockProducts.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))
                    }
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Quantity Needed *</label>
                  <input
                    type="text"
                    placeholder="e.g. 50 Metric Tons"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="w-full h-10 px-3 border border-input rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Additional Message (Optional)</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <textarea
                    rows={3}
                    placeholder="Provide details about packaging specifications, shipping terms (FOB/CIF), and port of destination..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-input rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-primary text-white hover:bg-accent rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
