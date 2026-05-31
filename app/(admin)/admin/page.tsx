"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Leaf } from "lucide-react";

// Dynamically load the AnalyticsPanel with ssr: false to prevent hydration errors during compilation
const AnalyticsPanel = dynamic(
  () => import("@/components/admin/AnalyticsPanel"),
  {
    ssr: false,
    loading: () => (
      <div className="py-20 flex flex-col items-center justify-center text-primary gap-2">
        <Leaf className="w-8 h-8 animate-spin" />
        <span className="text-xs font-semibold uppercase tracking-wider">Loading Dashboard...</span>
      </div>
    )
  }
);

export default function AdminDashboardPage() {
  return <AnalyticsPanel />;
}
