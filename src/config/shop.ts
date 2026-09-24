/**
 * Brand Configuration for FreshCut Chicken Co.
 * Every page and component reads from here so rebranding for a client takes minutes.
 */

export interface DeliveryArea {
  name: string;
  pincode: string;
  deliveryTimeMins: number;
  expressAvailable: boolean;
}

export interface ShopConfig {
  shopName: string;
  shortName: string;
  tagline: string;
  subtitle: string;
  city: string;
  state: string;
  phone: string;
  whatsappNumber: string; // international format without + for wa.me links
  email: string;
  address: string;
  landmark: string;
  openingHours: {
    days: string;
    open: string;
    close: string;
    expressCutoff: string;
  };
  currency: {
    symbol: string;
    code: string;
  };
  fssaiNumber: string; // Clearly a placeholder
  fssaiNote: string;
  freeDeliveryAbove: number;
  deliveryFee: number;
  minOrder: number;
  expressDeliveryFee: number;
  categoriesEnabled: {
    chicken: boolean;
    country: boolean;
    mutton: boolean;
    eggs: boolean;
    marinated: boolean;
    combos: boolean;
  };
  languages: Array<{
    code: 'en' | 'mr' | 'hi';
    name: string;
    nativeName: string;
  }>;
  serviceablePincodes: string[];
  deliveryAreas: DeliveryArea[];
  socials: {
    instagram: string;
    facebook: string;
    googleRating: number;
    totalReviews: number;
  };
}

export const SHOP_CONFIG: ShopConfig = {
  shopName: "FreshCut Chicken Co.",
  shortName: "FreshCut",
  tagline: "Cut fresh. At your door before the chai gets cold.",
  subtitle: "Artisanal, 100% antibiotic-residue-free chicken, country cuts, tender mutton & farm-fresh eggs cut to order.",
  city: "Pune",
  state: "Maharashtra",
  phone: "+91 98200 12345",
  whatsappNumber: "919820012345",
  email: "care@freshcutdemo.in",
  address: "Shop 4 & 5, Greenfield Plaza, Near Shivaji Park, Pune",
  landmark: "Opposite Joggers Garden",
  openingHours: {
    days: "All 7 Days",
    open: "07:00 AM",
    close: "09:00 PM",
    expressCutoff: "08:00 PM",
  },
  currency: {
    symbol: "₹",
    code: "INR",
  },
  fssaiNumber: "DEMO-00000000000000",
  fssaiNote: "Demo License — Sample data for client pitch demonstration.",
  freeDeliveryAbove: 499,
  deliveryFee: 30,
  minOrder: 199,
  expressDeliveryFee: 49,
  categoriesEnabled: {
    chicken: true,
    country: true,
    mutton: true,
    eggs: true,
    marinated: true,
    combos: true,
  },
  languages: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  ],
  serviceablePincodes: [
    "411001", "411004", "411007", "411016", "411038", "411045", "411057", "411028"
  ],
  deliveryAreas: [
    { name: "Kothrud & Karve Nagar", pincode: "411038", deliveryTimeMins: 45, expressAvailable: true },
    { name: "Deccan & Shivaji Nagar", pincode: "411004", deliveryTimeMins: 35, expressAvailable: true },
    { name: "Aundh & Baner", pincode: "411007", deliveryTimeMins: 50, expressAvailable: true },
    { name: "Model Colony & SB Road", pincode: "411016", deliveryTimeMins: 40, expressAvailable: true },
    { name: "Camp & Koregaon Park", pincode: "411001", deliveryTimeMins: 60, expressAvailable: false },
    { name: "Wakad & Hinjawadi Ph-1", pincode: "411057", deliveryTimeMins: 60, expressAvailable: true },
  ],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    googleRating: 4.9,
    totalReviews: 842,
  },
};
