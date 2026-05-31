"use client";

import React, { useState } from "react";
import { CheckCircle, Send, Mail, Briefcase, FileText, ShoppingBag } from "lucide-react";
import { saveQuote, mockProducts } from "@/lib/mock-db";

export default function InquirySection() {
  const [companyName, setCompanyName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !customerName || !email || !productName || !quantity || !country) return;

    setIsSubmitting(true);

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

      setTimeout(() => setIsSuccess(false), 8000);

    } catch (err) {
      console.error("Failed to submit inquiry:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-[#F1F5F9]/50 border-b border-[#E2E8F0]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="px-4 py-1 rounded-full bg-white text-[#1A365D] text-xs font-bold uppercase tracking-widest border border-[#718096]/30">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F172A]">
            Submit Your Bulk Inquiry
          </h2>
          <div className="w-16 h-1 bg-[#718096] rounded-full mt-2" />
          <p className="text-sm text-[#475569] max-w-lg leading-relaxed mt-1">
            Fill out the form below to receive a custom FOB or CIF pricing quote directly from our export sales desk.
          </p>
        </div>

        {/* Contact/Inquiry Form Box */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-lg shadow-[#1A365D]/5">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-8 gap-4 animate-fade-in">
              <div className="w-16 h-16 bg-[#F1F5F9] rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#718096]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#0F172A]">Inquiry Submitted Successfully</h4>
              <p className="text-sm text-[#475569] max-w-sm">
                ✓ We'll contact you within **24 hours** with customized bulk rates and delivery timelines.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Company Name *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3.5 w-4 h-4 text-[#475569]" />
                    <input
                      type="text"
                      placeholder="e.g. Al-Barakah General Trading"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full h-11 pl-10 pr-3 border border-[#E2E8F0] rounded-xl text-sm focus:border-[#718096] focus:ring-1 focus:ring-[#718096] outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Customer Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Mohammad Al-Mansoori"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full h-11 px-4.5 border border-[#E2E8F0] rounded-xl text-sm focus:border-[#718096] focus:ring-1 focus:ring-[#718096] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Business Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#475569]" />
                  <input
                    type="email"
                    placeholder="purchase@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-11 pl-10 pr-3 border border-[#E2E8F0] rounded-xl text-sm focus:border-[#718096] focus:ring-1 focus:ring-[#718096] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Country of Destination *</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full h-11 px-3 border border-[#E2E8F0] rounded-xl text-sm bg-white focus:border-[#718096] focus:ring-1 focus:ring-[#718096] outline-none"
                >
                  <option value="" disabled>Select Country</option>
                  {["Malaysia", "Bangladesh", "Sri Lanka", "Singapore", "Thailand", "Vietnam", "Australia", "United Arab Emirates", "Indonesia"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Product Needed *</label>
                  <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    className="w-full h-11 px-3 border border-[#E2E8F0] rounded-xl text-sm bg-white focus:border-[#718096] focus:ring-1 focus:ring-[#718096] outline-none"
                  >
                    <option value="" disabled>Select Commodity</option>
                    {mockProducts.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Quantity Required *</label>
                  <input
                    type="text"
                    placeholder="e.g. 100 Metric Tons"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="w-full h-11 px-4.5 border border-[#E2E8F0] rounded-xl text-sm focus:border-[#718096] focus:ring-1 focus:ring-[#718096] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Message (Optional)</label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-[#475569]" />
                  <textarea
                    rows={4}
                    placeholder="Detail your shipping destination port, packaging preferences, and loading schedules..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-3 py-3.5 border border-[#E2E8F0] rounded-xl text-sm focus:border-[#718096] focus:ring-1 focus:ring-[#718096] outline-none resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#718096] hover:bg-[#4A5568] text-white rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Your Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
