"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X, Download, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenQuoteModal: () => void;
  onOpenBrochureModal: () => void;
}

export default function Navbar({ onOpenQuoteModal, onOpenBrochureModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Infrastructure", href: "/infrastructure" },
    { label: "Certifications", href: "/certifications" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Skip showing navbar on admin route paths
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/96 backdrop-blur-md border-b border-[#C8D8CC] py-3 shadow-md shadow-[#1B4332]/8"
            : "bg-white py-4 border-b border-[#C8D8CC]/60"
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#1B4332] flex items-center justify-center transition-all duration-300 group-hover:rotate-12 shadow-sm">
              <Leaf className="w-5 h-5 text-[#C8942A] fill-[#C8942A]/30" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-[#1B4332] leading-tight">
                Plentra Exports
              </span>
              <span className="text-[10px] tracking-wider text-[#C8942A] uppercase leading-none font-sans font-semibold">
                Agricultural B2B Exporter
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#1B4332] relative py-1",
                    isActive
                      ? "text-[#1B4332] font-semibold"
                      : "text-[#4E6355]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C8942A] rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenBrochureModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#1B4332] text-[#1B4332] hover:bg-[#EAF2EC] text-sm font-medium rounded-full transition-all hover:-translate-y-0.5 duration-200"
            >
              <Download className="w-4 h-4" />
              Brochure
            </button>
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#C8942A] hover:bg-[#A87820] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#4E6355] hover:text-[#1B4332] hover:bg-[#EAF2EC] rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={cn(
            "fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-white shadow-2xl flex flex-col p-6 transition-transform duration-300 transform ease-in-out border-l border-[#C8D8CC]",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-[#C8D8CC] pb-4 mb-6">
            <Link href="/" className="flex items-center gap-2" onClick={handleLinkClick}>
              <div className="w-8 h-8 rounded-full bg-[#1B4332] flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#C8942A]" />
              </div>
              <span className="font-serif text-lg font-bold text-[#1B4332]">Plentra Exports</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-[#4E6355] hover:text-[#1B4332] hover:bg-[#EAF2EC] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 mb-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "text-base font-medium py-2 px-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-[#EAF2EC] text-[#1B4332] font-semibold border-l-2 border-[#C8942A]"
                      : "text-[#4E6355] hover:bg-[#EAF2EC] hover:text-[#1B4332]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBrochureModal();
              }}
              className="flex w-full items-center justify-center gap-2 px-4 py-3 border-2 border-[#1B4332] text-[#1B4332] hover:bg-[#EAF2EC] text-base font-medium rounded-full transition-colors"
            >
              <Download className="w-5 h-5" />
              Brochure
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-[#C8942A] hover:bg-[#A87820] text-white text-base font-semibold rounded-full transition-colors shadow-md"
            >
              <MessageSquare className="w-5 h-5" />
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
