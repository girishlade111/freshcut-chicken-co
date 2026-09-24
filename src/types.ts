export type CategoryType = 'chicken' | 'country' | 'mutton' | 'eggs' | 'marinated' | 'combos';

export type CutStyle =
  | 'Curry Cut'
  | 'Small Pieces'
  | 'Biryani Cut'
  | 'Boneless Cubes'
  | 'Whole'
  | 'Keema / Mince'
  | 'Strips';

export type SkinOption = 'with_skin' | 'skinless' | 'not_applicable';

export type CleaningPreference = 'standard_clean' | 'fat_trimmed' | 'extra_washed';

export interface NutritionFacts {
  protein: number; // in grams
  fat: number; // in grams
  energy: number; // in kcal
  carbs: number; // in grams
}

export interface ProductBadge {
  label: string;
  labelMr: string;
  variant: 'fresh' | 'bestseller' | 'antibiotic_free' | 'chef_special' | 'limited';
}

export interface Product {
  id: string;
  slug: string;
  nameEn: string;
  nameMr: string;
  nameHi: string;
  category: CategoryType;
  descriptionEn: string;
  descriptionMr: string;
  pricePerKg: number;
  previousPricePerKg: number;
  minWeightGrams: number;
  availableCuts: CutStyle[];
  skinOptions: SkinOption[];
  badges: ProductBadge[];
  nutrition: NutritionFacts;
  stockStatus: 'in_stock' | 'sold_out' | 'limited_today';
  image: string;
  rating: number;
  reviewsCount: number;
  piecesCountPerKg?: string;
  servingSuggestion?: string;
  cookingTips?: string;
  isReadyToCook?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  weightGrams: number;
  cutStyle: CutStyle;
  skinOption: SkinOption;
  cleaningPreference: CleaningPreference;
  specialInstructions?: string;
  unitPricePerKg: number;
  totalPrice: number;
}

export type OrderStatus = 'confirmed' | 'cutting' | 'out_for_delivery' | 'delivered';

export interface OrderItem {
  productId: string;
  productName: string;
  weightGrams: number;
  cutStyle: string;
  skinOption: string;
  specialInstructions?: string;
  price: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  pincode: string;
  city: string;
}

export interface Order {
  id: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'upi' | 'card';
  deliverySlot: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  isExpress?: boolean;
}

export interface CutHotspot {
  id: string;
  titleEn: string;
  titleMr: string;
  part: string;
  texture: string;
  bestFor: string[];
  cookingTime: string;
  pricePerKg: number;
  linkedProductId: string;
  x: number; // percentage in SVG coordinate
  y: number; // percentage in SVG coordinate
  description: string;
}

export interface RecipeIngredient {
  nameEn: string;
  nameMr: string;
  amount: string;
  linkedProductId?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  titleEn: string;
  titleMr: string;
  tagline: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Chef Level';
  servings: string;
  image: string;
  descriptionEn: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  chefTip: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  description: string;
  active: boolean;
}

export interface DeliverySlot {
  id: string;
  title: string;
  timeWindow: string;
  isExpress?: boolean;
  available: boolean;
  capacityStatus: 'available' | 'filling_fast' | 'full';
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  verifiedOrder: boolean;
  comment: string;
  location: string;
  dishPrepared?: string;
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionMr: string;
  answerEn: string;
  answerMr: string;
  category: 'Freshness' | 'Delivery' | 'Hygiene' | 'Ordering';
}

export interface SubscriptionPlan {
  id: string;
  titleEn: string;
  titleMr: string;
  frequency: 'Weekly' | 'Bi-Weekly';
  preferredDay: string;
  preferredSlot: string;
  productId: string;
  weightGrams: number;
  cutStyle: CutStyle;
  skinOption: SkinOption;
  pricePerDelivery: number;
  discountPercentage: number;
  active: boolean;
}
