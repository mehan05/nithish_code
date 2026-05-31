"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If already authenticated, skip login and redirect
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("plentra_admin_auth");
      if (auth === "true") {
        router.push("/admin");
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulated short latency for premium feel
    setTimeout(() => {
      if (email === "admin@plentraexports.com" && password === "admin123") {
        if (typeof window !== "undefined") {
          localStorage.setItem("plentra_admin_auth", "true");
        }
        router.push("/admin");
      } else {
        setError("Invalid email address or password.");
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      
      {/* Background circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl" />

      {/* Login Box */}
      <div className="relative w-full max-w-md bg-white border border-border rounded-2xl shadow-xl p-8 overflow-hidden">
        
        {/* Banner border top */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />

        {/* Logo and titles */}
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mb-2 shadow-sm">
            <Leaf className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Plentra Exports Admin Portal
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in with administrative credentials to access quotes and analytics.
          </p>
        </div>

        {/* Form panel */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Error alert */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="admin@plentraexports.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 pl-10 pr-3 border border-input rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-11 pl-10 pr-3 border border-input rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          {/* Tips box for demonstration */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[10px] text-slate-500 leading-normal flex flex-col gap-0.5">
            <span className="font-bold uppercase text-slate-700">Demo Access Credentials:</span>
            <span>Username: <strong className="text-primary select-all">admin@plentraexports.com</strong></span>
            <span>Password: <strong className="text-primary select-all">admin123</strong></span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-primary text-white hover:bg-accent rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
