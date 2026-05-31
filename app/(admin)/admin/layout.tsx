"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  ShoppingBag,
  LogOut,
  Leaf,
  Menu,
  X,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Authenticate and protect admin routes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("plentra_admin_auth");
      if (auth !== "true") {
        setIsAuthenticated(false);
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-primary">
          <Leaf className="w-8 h-8 animate-spin" />
          <span className="text-xs font-semibold uppercase tracking-wider">Validating Session...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null; // Redirecting to login...
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("plentra_admin_auth");
    }
    router.push("/login");
  };

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Inquiries / Quotes", href: "/admin/quotes", icon: MessageSquare },
    { label: "Visitor Geographics", href: "/admin/visitors", icon: Users },
    { label: "Products Catalog", href: "/admin/products", icon: ShoppingBag }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* Desktop Sidebar Panel */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col py-6 select-none shrink-0">
        
        {/* Sidebar Logo */}
        <div className="px-6 flex items-center gap-2 text-primary mb-8 pb-4 border-b border-slate-100">
          <Leaf className="w-5 h-5 shrink-0" />
          <span className="font-serif text-lg font-bold">Plentra Admin</span>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-1 px-3 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors",
                  isActive
                    ? "bg-secondary text-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions (Logout and site view) */}
        <div className="px-3 border-t border-slate-100 pt-4 flex flex-col gap-1 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Visit Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main page content layout with header */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile header bar */}
        <header className="lg:hidden h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2 text-primary">
            <Leaf className="w-5 h-5" />
            <span className="font-serif text-base font-bold">Plentra Admin</span>
          </div>
          
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-1.5 text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

      {/* Mobile Drawer Panel */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity duration-300",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileOpen(false)}
      >
        <div
          className={cn(
            "fixed top-0 left-0 z-50 h-full w-4/5 max-w-xs bg-white shadow-xl flex flex-col p-5 transition-transform duration-300 transform",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2 text-primary">
              <Leaf className="w-5 h-5 animate-pulse" />
              <span className="font-serif text-base font-bold">Plentra Admin</span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-slate-100 pt-4 flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Visit Live Site</span>
            </Link>
            <button
              onClick={() => {
                setIsMobileOpen(false);
                handleLogout();
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
