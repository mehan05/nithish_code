// High-quality mock database and helper functions for fallback demo mode.
// Pre-populates beautiful charts, maps, and tables.

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  badge: string;
  image: string;
  description: string;
  keyFeatures: string[];
  variants: string[];
  packagingInfo: string;
  exportDestinations: string[];
  isPremium: boolean;
  isExportReady: boolean;
  order: number;
}

export interface Certification {
  id: string;
  name: string;
  shortCode: string;
  description: string;
  badgeColor: string;
  iconType: string;
  documentUrl?: string;
}

export interface QuoteSubmission {
  id: string;
  createdAt: string;
  companyName: string;
  customerName: string;
  email: string;
  productName: string;
  quantity: string;
  country: string;
  message: string;
  status: 'new' | 'reviewed' | 'responded' | 'closed';
  notes?: string;
}

export interface VisitorLog {
  id: string;
  timestamp: string;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  page: string;
}

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Fresh Red Onion",
    slug: "fresh-red-onion",
    category: "vegetables",
    badge: "Export Quality",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800",
    description: "Sourced from premier agricultural belts, our premium fresh red onions are celebrated for their strong, pungent flavor, crisp texture, and exceptionally long shelf life, perfect for culinary and industrial use globally.",
    keyFeatures: [
      "Size Range: 45mm to 65mm+",
      "Pungency: High & Intense",
      "Skin: Double/Triple Layered Skin",
      "Moisture: Dry, Cured & Well-Matured"
    ],
    variants: [
      "Fresh Red Onion (Medium 45-55mm)",
      "Fresh Red Onion (Bold 55mm+)",
      "Rose Onion (Premium Export Grade)"
    ],
    packagingInfo: "Packed in 5kg, 10kg, 20kg, or 25kg mesh/leno bags, optimized for sea freight ventilation.",
    exportDestinations: ["Malaysia", "Singapore", "United Arab Emirates", "Indonesia", "Sri Lanka"],
    isPremium: true,
    isExportReady: true,
    order: 1
  },
  {
    id: "prod-2",
    name: "Premium Turmeric Finger",
    slug: "premium-turmeric-finger",
    category: "spices",
    badge: "High Curcumin",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800",
    description: "Vibrant golden-yellow Indian turmeric finger, packed with high natural curcumin content. Meticulously cleaned, sun-dried, and polished to preserve its intense aroma and powerful health benefits.",
    keyFeatures: [
      "Curcumin Content: 3.5% to 5.5%+",
      "Moisture: Max 12% Guaranteed",
      "Foreign Matter: Max 1%",
      "Admixture: Max 2%"
    ],
    variants: [
      "Nizamabad Polished Turmeric Finger",
      "Salem Double Polished Turmeric",
      "Premium Organic Turmeric Powder"
    ],
    packagingInfo: "Available in 25kg or 50kg double-layered PP bags, or jute bags, customized with air-tight barriers to preserve curcumin.",
    exportDestinations: ["United Arab Emirates", "Vietnam", "Malaysia", "Australia", "Singapore"],
    isPremium: true,
    isExportReady: true,
    order: 2
  },
  {
    id: "prod-3",
    name: "Dry Red Chilli",
    slug: "dry-red-chilli",
    category: "spices",
    badge: "Sun Dried",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800",
    description: "Fiery, dark red, and packed with intense heat. Sourced from deep spice-growing clusters, our dry red chillies undergo uniform sun-drying and grade sorting to match international standards.",
    keyFeatures: [
      "SHU (Pungency): 15,000 to 40,000+",
      "ASTA Color Value: 60 - 100+",
      "Moisture: 10% - 12% Max",
      "Loose Seeds: Max 2%"
    ],
    variants: [
      "Sanam S4 / 334 Red Chilli (With Stem)",
      "S4 Stemless Dry Red Chilli",
      "Teja Premium Hot Chilli (High Pungency)"
    ],
    packagingInfo: "Packed in 5kg, 10kg, 15kg, or 25kg gunny/jute bags or customized PP bags, double-stitched for freshness.",
    exportDestinations: ["Vietnam", "Indonesia", "Malaysia", "Sri Lanka", "Bangladesh"],
    isPremium: true,
    isExportReady: true,
    order: 3
  },
  {
    id: "prod-4",
    name: "Fresh Garlic",
    slug: "fresh-garlic-bulbs",
    category: "spices",
    badge: "Grade-A Sorted",
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&q=80&w=800",
    description: "Plump, multi-clove fresh garlic bulbs with solid white skin and purple stripes. Sourced from high-altitude fertile farms, naturally cured and hand-sorted for maximum culinary zest.",
    keyFeatures: [
      "Size: 30mm, 40mm, 50mm+ Bulbs",
      "Firmness: Dense, Compact Cloves",
      "Shelf Life: Exceptional (Cured & Capped)",
      "Admixture: Nil"
    ],
    variants: [
      "White Garlic Bulbs (Medium 35-45mm)",
      "Premium Bold Garlic (50mm+)",
      "Dehydrated Garlic Flakes & Powder"
    ],
    packagingInfo: "Packed in 5kg, 10kg, or 20kg mesh bags, carton boxes, or customized export-ready crates.",
    exportDestinations: ["Malaysia", "Thailand", "United Arab Emirates", "Vietnam", "Singapore"],
    isPremium: false,
    isExportReady: true,
    order: 4
  },
  {
    id: "prod-5",
    name: "Natural Tamarind",
    slug: "natural-tamarind",
    category: "spices",
    badge: "Fiberless Grade",
    image: "/tamarind.jpg",
    description: "Naturally sour and tangy, our export-grade tamarind is processed to remove seeds and fibers under high-standard hygienic conditions. Perfect for international food processing.",
    keyFeatures: [
      "Seed Content: Less than 1-2% Max",
      "Fibers: Completely Hand-Stripped",
      "Color: Deep Reddish Brown",
      "Purity: 99% Minimum"
    ],
    variants: [
      "Seedless Tamarind Block (99% Pure)",
      "Tamarind with Seeds (Traditional)",
      "Tamarind Concentrate & Paste"
    ],
    packagingInfo: "Compressed into 1kg, 5kg, or 10kg blocks wrapped in food-grade polyethylene, packed in master cartons.",
    exportDestinations: ["Indonesia", "Thailand", "United Arab Emirates", "Australia", "Sri Lanka"],
    isPremium: false,
    isExportReady: true,
    order: 5
  },
  {
    id: "prod-6",
    name: "Raw Bold Peanut",
    slug: "raw-bold-peanuts",
    category: "nuts",
    badge: "Aflatoxin Tested",
    image: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&q=80&w=800",
    description: "Crispy, rich in proteins, and naturally sweet. Our hand-picked selected (HPS) raw peanuts undergo rigorous quality checks and aflatoxin testing to satisfy the most demanding import criteria.",
    keyFeatures: [
      "Count per Ounce: 38/42, 40/50, 50/60, 60/70",
      "Aflatoxin: Negative (B1, B2, G1, G2 < 4ppb)",
      "Moisture: Max 7% - 8%",
      "Split Kernels: Less than 1%"
    ],
    variants: [
      "HPS Bold Peanut Kernels",
      "HPS Java Peanut Kernels",
      "Peanuts in Shell (Premium Roast Grade)"
    ],
    packagingInfo: "Shipped in 25kg, 50kg jute bags or specialized vacuum-sealed bags to prevent moisture absorption.",
    exportDestinations: ["Indonesia", "Malaysia", "Vietnam", "Singapore", "Thailand"],
    isPremium: true,
    isExportReady: true,
    order: 6
  },
  {
    id: "prod-7",
    name: "Fresh Ginger",
    slug: "fresh-ginger-rhizomes",
    category: "spices",
    badge: "Fully Washed",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800",
    description: "Plump, fully washed fresh ginger rhizomes with smooth golden skin and crisp, fiber-rich flesh. Highly aromatic and sharp, hand-sorted for global culinary and extraction standards.",
    keyFeatures: [
      "Size: 100g, 150g, 200g+ Rhizomes",
      "Moisture: Dry Skin, No Surface Wetness",
      "Pesticide Residue: Nil (FDA/EU Compliant)",
      "Texture: Firm & Low Fiber"
    ],
    variants: [
      "Fresh Washed Ginger (Bold)",
      "Semi-Dried Ginger Rhizomes",
      "Premium Dry Ginger (Sonth)"
    ],
    packagingInfo: "Packed in 10kg, 20kg plastic mesh bags, ventilated plastic crates, or customized corrugated paper boxes.",
    exportDestinations: ["Bangladesh", "United Arab Emirates", "Australia", "Sri Lanka", "Indonesia"],
    isPremium: false,
    isExportReady: true,
    order: 7
  },
  {
    id: "prod-8",
    name: "Fresh Potato",
    slug: "fresh-table-potatoes",
    category: "vegetables",
    badge: "Cold Stored",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800",
    description: "Grown in high-mineral soils, our premium fresh table potatoes are firm, uniform, and rich in natural starch. Carefully harvested, cold-stored, and sorted to prevent blemishes.",
    keyFeatures: [
      "Size Range: 45mm to 80mm+",
      "Shape: Oval / Round Uniform",
      "Skin: Smooth, Spotless White/Red",
      "Dry Matter: High, Perfect for Culinary Use"
    ],
    variants: [
      "Jyoti Fresh Table Potatoes (Oval)",
      "Pukhraj Starch-Rich Potatoes",
      "Premium Red Skin Potatoes"
    ],
    packagingInfo: "Packed in 10kg, 25kg, or 50kg mesh leno bags, optimized for high airflow during container transport.",
    exportDestinations: ["Malaysia", "Sri Lanka", "Bangladesh", "Indonesia", "United Arab Emirates"],
    isPremium: false,
    isExportReady: true,
    order: 8
  }
];

export const mockCertifications: Certification[] = [
  {
    id: "cert-1",
    name: "Import Export Code (IEC)",
    shortCode: "IEC",
    description: "Issued by the Directorate General of Foreign Trade (DGFT), Government of India. Authorizes legal cross-border commercial transactions.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    iconType: "shield",
    documentUrl: "/plentra iec.pdf"
  },
  {
    id: "cert-2",
    name: "Goods & Services Tax (GST)",
    shortCode: "GST",
    description: "Official registration certificate enabling standardized corporate tax calculations, compliance, and custom clearances in India.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    iconType: "file"
  },
  {
    id: "cert-3",
    name: "APEDA Registration",
    shortCode: "APEDA",
    description: "Agricultural and Processed Food Products Export Development Authority. Guarantees safety, quality, and standards compliance for food exports.",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    iconType: "award",
    documentUrl: "/02 apeda.pdf"
  },
  {
    id: "cert-4",
    name: "FSSAI Central License",
    shortCode: "FSSAI",
    description: "Food Safety and Standards Authority of India central exporter registration. Confirms superior level production handling and sanitization.",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
    iconType: "check",
    documentUrl: "/fssai license central.pdf"
  },
  {
    id: "cert-5",
    name: "UDYAM (MSME Registration)",
    shortCode: "UDYAM",
    description: "Ministry of Micro, Small and Medium Enterprises, India. Recognizes Plentra as an registered, high-capacity enterprise supplier.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    iconType: "briefcase",
    documentUrl: "/udyam-msme.pdf"
  },
  {
    id: "cert-6",
    name: "Spices Board India",
    shortCode: "SPICE BOARD",
    description: "Registration and exporter certification from the Ministry of Commerce. Certifies chemical residue-free, grade-A pure spices.",
    badgeColor: "bg-red-100 text-red-800 border-red-200",
    iconType: "leaf",
    documentUrl: "/spices-board.pdf"
  },

  {
    id: "cert-8",
    name: "ICEGATE Registration",
    shortCode: "ICEGATE",
    description: "Indian Customs Electronic Commerce Gateway. Connects digital cargo clearances to accelerate international shipments.",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    iconType: "globe"
  }
];

// Helper to seed sample data in LocalStorage if it is empty (running in client browser)
export function seedLocalStorage() {
  if (typeof window === 'undefined') return;

  const currentQuotes = localStorage.getItem('plentra_quotes');
  if (!currentQuotes) {
    const sampleQuotes: QuoteSubmission[] = [
      {
        id: "q-1",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        companyName: "Al-Barakah General Trading LLC",
        customerName: "Mohammad Al-Mansoori",
        email: "purchase@albarakah.ae",
        productName: "Fresh Red Onion",
        quantity: "50 Metric Tons (Bold 55mm+)",
        country: "United Arab Emirates",
        message: "Requesting a bulk price quote and delivery timeline for Dubai Port Jebel Ali. We require standard 25kg mesh bags.",
        status: "new",
        notes: "Pending tariff checks for Port Jebel Ali."
      },
      {
        id: "q-2",
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        companyName: "EuroFood Import Ltd",
        customerName: "Hans Fischer",
        email: "h.fischer@eurofood.com",
        productName: "Premium Turmeric Finger",
        quantity: "15 Metric Tons",
        country: "Australia",
        message: "Interested in pure turmeric powder and Salem turmeric double polished. Please share latest lab analysis reports.",
        status: "reviewed",
        notes: "Shared the APEDA curcumin reports via email."
      },
      {
        id: "q-3",
        createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
        companyName: "Global Foods Co Ltd",
        customerName: "Tan Seng",
        email: "seng@globalfoods.com.sg",
        productName: "Raw Bold Peanut",
        quantity: "20 Metric Tons",
        country: "Singapore",
        message: "Requesting price per MT and container capacity limits. We require aflatoxin negative test reports.",
        status: "responded",
        notes: "Responded with FSSAI & Phyto certifications."
      },
      {
        id: "q-4",
        createdAt: new Date(Date.now() - 3600000 * 120).toISOString(),
        companyName: "Nusantara Spices",
        customerName: "Budi Santoso",
        email: "budi@nusantara.id",
        productName: "Dry Red Chilli",
        quantity: "40 Metric Tons",
        country: "Indonesia",
        message: "Would like to receive samples of your Teja Dry Red Chilli. Please quote CIF Jakarta port rates.",
        status: "closed",
        notes: "Deal finalized. Production scheduled for next month."
      }
    ];
    localStorage.setItem('plentra_quotes', JSON.stringify(sampleQuotes));
  }

  const currentVisitors = localStorage.getItem('plentra_visitors');
  if (!currentVisitors) {
    const sampleVisitors: VisitorLog[] = [];
    const countries = [
      { name: "Malaysia", code: "MY", cities: ["Kuala Lumpur", "Penang", "Johor Bahru"] },
      { name: "Bangladesh", code: "BD", cities: ["Dhaka", "Chittagong", "Sylhet"] },
      { name: "Sri Lanka", code: "LK", cities: ["Colombo", "Kandy", "Galle"] },
      { name: "Singapore", code: "SG", cities: ["Singapore"] },
      { name: "Thailand", code: "TH", cities: ["Bangkok", "Phuket", "Chiang Mai"] },
      { name: "Vietnam", code: "VN", cities: ["Ho Chi Minh City", "Hanoi", "Da Nang"] },
      { name: "Australia", code: "AU", cities: ["Sydney", "Melbourne", "Brisbane"] },
      { name: "United Arab Emirates", code: "AE", cities: ["Dubai", "Abu Dhabi", "Sharjah"] },
      { name: "Indonesia", code: "ID", cities: ["Jakarta", "Surabaya", "Bali"] }
    ];

    // Seed 120 visits scattered over the last 30 days
    const ipPrefixes = ["104.244.42.", "198.51.100.", "203.0.113.", "185.190.140.", "91.198.174."];
    for (let i = 0; i < 120; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const hoursAgo = Math.floor(Math.random() * 24);
      const date = new Date(Date.now() - (daysAgo * 24 + hoursAgo) * 3600000);
      
      const countryObj = countries[Math.floor(Math.random() * countries.length)];
      const city = countryObj.cities[Math.floor(Math.random() * countryObj.cities.length)];
      const ip = `${ipPrefixes[Math.floor(Math.random() * ipPrefixes.length)]}${Math.floor(Math.random() * 254) + 1}`;
      const page = ["/", "/products", "/about", "/infrastructure", "/certifications", `/products/fresh-red-onion`, `/products/premium-turmeric-finger`][Math.floor(Math.random() * 7)];

      sampleVisitors.push({
        id: `v-${i}`,
        timestamp: date.toISOString(),
        ip,
        country: countryObj.name,
        countryCode: countryObj.code,
        city,
        page
      });
    }

    // Ensure we sort chronologically
    sampleVisitors.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    localStorage.setItem('plentra_visitors', JSON.stringify(sampleVisitors));
  }
}

// Quote submission methods
export function getQuotes(): QuoteSubmission[] {
  if (typeof window === 'undefined') return [];
  seedLocalStorage();
  const q = localStorage.getItem('plentra_quotes');
  return q ? JSON.parse(q) : [];
}

export function saveQuote(quote: Omit<QuoteSubmission, 'id' | 'createdAt' | 'status'>): QuoteSubmission {
  const quotes = getQuotes();
  const newQuote: QuoteSubmission = {
    ...quote,
    id: `q-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new'
  };
  quotes.unshift(newQuote); // Put new items at the top
  if (typeof window !== 'undefined') {
    localStorage.setItem('plentra_quotes', JSON.stringify(quotes));
  }
  return newQuote;
}

export function updateQuoteStatus(id: string, status: QuoteSubmission['status'], notes?: string): QuoteSubmission | null {
  const quotes = getQuotes();
  const idx = quotes.findIndex(q => q.id === id);
  if (idx === -1) return null;
  quotes[idx].status = status;
  if (notes !== undefined) {
    quotes[idx].notes = notes;
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('plentra_quotes', JSON.stringify(quotes));
  }
  return quotes[idx];
}

// Visitor logs methods
export function getVisitors(): VisitorLog[] {
  if (typeof window === 'undefined') return [];
  seedLocalStorage();
  const v = localStorage.getItem('plentra_visitors');
  return v ? JSON.parse(v) : [];
}

export function trackVisitor(ip: string, country: string, countryCode: string, city: string, page: string): VisitorLog {
  const visitors = getVisitors();
  const newVisit: VisitorLog = {
    id: `v-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString(),
    ip,
    country,
    countryCode,
    city,
    page
  };
  visitors.push(newVisit);
  if (typeof window !== 'undefined') {
    localStorage.setItem('plentra_visitors', JSON.stringify(visitors));
  }
  return newVisit;
}
