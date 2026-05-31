"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/mock-db";

interface ProductVariantsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductVariantsModal({
  product,
  isOpen,
  onClose,
}: ProductVariantsModalProps) {
  const router = useRouter();
  const [hoveredVariant, setHoveredVariant] = useState<number | null>(null);

  if (!isOpen || !product) return null;

  // A set of placeholder images to demonstrate the hover effect changing the central image
  const placeholderImages = [
    product.image,
    "https://images.unsplash.com/photo-1595039648937-29e248b64e0a?auto=format&fit=crop&q=80&w=800", // Generic grain/spice 1
    "https://images.unsplash.com/photo-1627308595229-7830f5c9281e?auto=format&fit=crop&q=80&w=800", // Generic grain/spice 2
    "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=800", // Generic grain/spice 3
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800", // Generic grain/spice 4
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"  // Generic grain/spice 5
  ];

  const currentImage = 
    hoveredVariant !== null && hoveredVariant < placeholderImages.length
      ? placeholderImages[hoveredVariant]
      : product.image;

  const handleVariantClick = (variantName: string) => {
    // Redirect to the product details page
    router.push(`/products/${product.slug}?variant=${encodeURIComponent(variantName)}`);
    onClose();
  };

  // Capitalize category
  const titleCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full h-full max-w-[1400px] max-h-[900px] md:h-[85vh] md:w-[90vw] md:rounded-3xl bg-[#F8F6F0] shadow-2xl overflow-hidden flex flex-col animate-scale-up border border-border/50">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-[#715E2C] hover:text-white bg-white/50 hover:bg-[#715E2C] rounded-full transition-colors shadow-sm"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex-1 w-full h-full relative p-8 md:p-12 overflow-hidden">
          
          {/* Top Left Title */}
          <div className="absolute top-12 left-12 z-20 max-w-sm pointer-events-none">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#715E2C] leading-[1.1] tracking-tight">
              Our {titleCategory} Varieties
            </h2>
          </div>

          {/* Center Interactive Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* The Central Image */}
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-[350px] shadow-2xl transition-all duration-500 ease-in-out transform">
              <img 
                src={currentImage} 
                alt="Product Variant" 
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Orbiting Variant Buttons */}
            {product.variants.map((variant, index) => {
              // Pre-calculated scattered positions around the center image 
              // simulating the design in Image 2
              const positions = [
                { top: "45%", left: "15%", transform: "translateY(-50%)" }, // Left
                { top: "20%", right: "20%" }, // Top Right
                { bottom: "30%", right: "12%" }, // Bottom Right
                { bottom: "10%", left: "25%" }, // Bottom Left
                { top: "15%", left: "40%" }, // Top center-ish
                { bottom: "15%", right: "40%" } // Bottom center-ish
              ];
              
              const pos = positions[index % positions.length];

              return (
                <button
                  key={index}
                  onMouseEnter={() => setHoveredVariant(index)}
                  onMouseLeave={() => setHoveredVariant(null)}
                  onClick={() => handleVariantClick(variant)}
                  className={`absolute z-20 px-6 py-3 md:px-8 md:py-3 rounded-full border-[1.5px] transition-all duration-300 text-sm md:text-lg font-medium whitespace-nowrap shadow-sm hover:scale-105 hover:shadow-lg
                    ${hoveredVariant === index 
                      ? 'bg-[#715E2C] text-white border-[#715E2C]' 
                      : 'bg-[#FAF8F5] text-[#715E2C] border-[#BCAE88]'
                    }`}
                  style={pos}
                >
                  {variant}
                </button>
              );
            })}

          </div>

        </div>
      </div>
    </div>
  );
}
