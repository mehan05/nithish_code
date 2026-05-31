import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CertificationsSection from "@/components/sections/CertificationsSection";
import InfrastructureSection from "@/components/sections/InfrastructureSection";
import BrochureSection from "@/components/sections/BrochureSection";
import InquirySection from "@/components/sections/InquirySection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 5.1 Hero Section */}
      <HeroSection />

      {/* 5.2 Products Grid Section */}
      <ProductsSection />

      {/* 5.3 Why Choose Us Section */}
      <WhyChooseUs />

      {/* 5.4 Certifications Section */}
      <CertificationsSection />

      {/* 5.5 Infrastructure Section */}
      <InfrastructureSection />

      {/* 5.6 Brochure Section */}
      <BrochureSection />

      {/* 5.7 Get In Touch / Inline Inquiry Form */}
      <InquirySection />
    </div>
  );
}
