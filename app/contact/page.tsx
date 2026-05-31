"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, Send, ShieldCheck, Clock } from "lucide-react";
import { saveQuote, mockProducts } from "@/lib/mock-db";

export default function ContactPage() {
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
    <div className="flex-1 bg-background">
      
      {/* Banner */}
      <div className="bg-secondary/40 border-b border-border/50 py-16 text-center">
        <div className="container mx-auto px-4">
          <span className="px-3.5 py-1 bg-white text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/10">
            Reach Out
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Contact Our Export Desk
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-2 leading-relaxed">
            Get direct assistance with custom pricing, sea container loading timelines, and phytosanitary certificates.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        
        {/* Contact Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left panel: Info Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="font-serif text-2xl font-bold text-slate-900 leading-snug">
              Establish Direct Sourcing Connections
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We respond to all verified bulk inquiry requests within **24 hours**. Please fill in your precise shipping port details to help our desk calculate exact FOB or CIF rates.
            </p>

            {/* List with icons */}
            <div className="flex flex-col gap-5 text-sm text-slate-700 mt-2">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Office HQ Address:</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    No. 12, Export Trade Zone, Guindy Industrial Area, Chennai - 600032, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Processing Silos & Warehouse:</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Plot 48B, Maritime Industrial Corridor, Near Tuticorin Port Access Road, Tuticorin - 628008, India
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Inquiry Email Hotlines:</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    info@plentraexports.com | sales@plentraexports.com
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Direct Support Hotline:</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    +91 44 4890 1200 | +91 44 4890 1201
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Desk Business Hours:</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Monday - Saturday (09:00 AM to 06:00 PM IST)
                  </p>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-100/80 text-emerald-800 text-xs font-bold self-start mt-2">
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>IEC & APEDA Authorized Registration: #0325091219</span>
            </div>
          </div>

          {/* Right panel: Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-border subtle-shadow">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-8 gap-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-primary">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-xl font-bold text-slate-800">Inquiry Submitted Successfully</h4>
                <p className="text-sm text-muted-foreground max-w-sm">
                  ✓ We'll contact you within **24 hours** with customized rates and transport specifications.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Company Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Al-Barakah General Trading"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full h-11 px-4.5 border border-input rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Customer Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Mohammad Al-Mansoori"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full h-11 px-4.5 border border-input rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Business Email *</label>
                  <input
                    type="email"
                    placeholder="purchase@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-11 px-4.5 border border-input rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Country of Destination *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full h-11 px-3 border border-input rounded-xl text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
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
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Product Needed *</label>
                    <select
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                      className="w-full h-11 px-3 border border-input rounded-xl text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
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
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Quantity Required *</label>
                    <input
                      type="text"
                      placeholder="e.g. 100 Metric Tons"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                      className="w-full h-11 px-4.5 border border-input rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Message (Optional)</label>
                  <textarea
                    rows={4}
                    placeholder="Detail your shipping destination port, packaging preferences, and loading schedules..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3.5 border border-input rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary text-white hover:bg-accent rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
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

      </div>
    </div>
  );
}
