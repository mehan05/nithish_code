"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  FileText
} from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const pathname = usePathname();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() === "") return;
    setIsSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  // Hide footer on admin pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <footer className="bg-[#0F2D1E] text-white font-sans border-t-4 border-[#2D6A4F] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 pb-12 border-b border-white/10">
          
          {/* Column 1: Rebrand Info & Leaf Icon */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-9 h-9 rounded-full bg-[#2D6A4F] flex items-center justify-center shadow-md">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">Plentra Exports</span>
            </div>
            <p className="text-sm text-white/65 leading-relaxed">
              India's premium certified exporter of organic commodities, spices, high-grade grains, coconuts, and custom cotton textiles. Delivering globally with absolute compliance.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2D6A4F] text-white transition-all duration-200" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2D6A4F] text-white transition-all duration-200" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2D6A4F] text-white transition-all duration-200" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2D6A4F] text-white transition-all duration-200" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#2D6A4F] font-serif text-lg font-semibold tracking-wide">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li><Link href="/" className="hover:text-[#2D6A4F] transition-colors">Home Page</Link></li>
              <li><Link href="/about" className="hover:text-[#2D6A4F] transition-colors">About Our Values</Link></li>
              <li><Link href="/infrastructure" className="hover:text-[#2D6A4F] transition-colors">Infrastructure Spec</Link></li>
              <li><Link href="/certifications" className="hover:text-[#2D6A4F] transition-colors">Export Certificates</Link></li>
              <li><Link href="/contact" className="hover:text-[#2D6A4F] transition-colors">Reach out / Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#2D6A4F] font-serif text-lg font-semibold tracking-wide">Products</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li><Link href="/products/premium-rice" className="hover:text-[#2D6A4F] transition-colors">Premium Rice Varieties</Link></li>
              <li><Link href="/products/indian-spices" className="hover:text-[#2D6A4F] transition-colors">Indian Spices & Aromatics</Link></li>
              <li><Link href="/products/coconut-products" className="hover:text-[#2D6A4F] transition-colors">Organic Coconut</Link></li>
              <li><Link href="/products/wild-forest-honey" className="hover:text-[#2D6A4F] transition-colors">Wild Forest Honey</Link></li>
              <li><Link href="/products/cotton-garments" className="hover:text-[#2D6A4F] transition-colors">Cotton Garments & OEM</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Inquiry */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#2D6A4F] font-serif text-lg font-semibold tracking-wide">Stay Updated</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Subscribe to receive crop updates, international logistics schedules, and custom pricing guides.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex flex-col gap-2 mt-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your business email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full h-10 pl-3 pr-10 bg-white/8 border border-white/15 focus:border-[#2D6A4F] outline-none rounded-lg text-sm text-white placeholder-white/40"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 text-[#2D6A4F] hover:text-[#A0AEC0] transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              {isSubscribed && (
                <div className="flex items-center gap-1.5 text-[#2D6A4F] text-xs mt-1 animate-fade-in">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Subscribed! Thank you.</span>
                </div>
              )}
            </form>
          </div>

          {/* Column 5: Address Information */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#2D6A4F] font-serif text-lg font-semibold tracking-wide">Contact Details</h4>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Office HQ:</p>
                  <p className="text-xs">No. 12, Export Trade Zone, Guindy Industrial Area, Chennai - 600032, India</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Mail className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Inquiries:</p>
                  <p className="text-xs">info@plentraexports.com</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Hotline:</p>
                  <p className="text-xs">+91 44 4890 1200</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Rights */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 text-xs text-white/40 gap-4">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>APEDA Approved Exporter</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>IEC License: #0325091219</span>
            </div>
          </div>
          <div>
            <p>© {new Date().getFullYear()} Plentra Exports. All rights reserved. Sourced and Packed in India.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
