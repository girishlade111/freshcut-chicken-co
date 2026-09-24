import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, CutStyle, SkinOption, CleaningPreference, Coupon } from '../types';
import { SHOP_CONFIG } from '../config/shop';
import { AVAILABLE_COUPONS } from '../data/mockData';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  appliedCoupon: Coupon | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    weightGrams?: number,
    cutStyle?: CutStyle,
    skinOption?: SkinOption,
    cleaningPreference?: CleaningPreference,
    specialInstructions?: string
  ) => void;
  removeItem: (itemId: string) => void;
  updateWeight: (itemId: string, newWeightGrams: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;

  // Computed getters
  getSubtotal: () => number;
  getDiscount: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      appliedCoupon: null,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (
        product,
        weightGrams = 500,
        cutStyle = product.availableCuts[0] || 'Curry Cut',
        skinOption = product.skinOptions[0] || 'skinless',
        cleaningPreference = 'standard_clean',
        specialInstructions = ''
      ) => {
        const unitPricePerKg = product.pricePerKg;
        const calculatedPrice = Math.round((unitPricePerKg * weightGrams) / 1000);

        set((state) => {
          // Check if an identical cut config exists
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.cutStyle === cutStyle &&
              item.skinOption === skinOption &&
              item.cleaningPreference === cleaningPreference &&
              item.specialInstructions === specialInstructions
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            const existing = updated[existingIndex];
            const newWeight = existing.weightGrams + weightGrams;
            updated[existingIndex] = {
              ...existing,
              weightGrams: newWeight,
              totalPrice: Math.round((unitPricePerKg * newWeight) / 1000),
            };
            return { items: updated, isCartOpen: true };
          }

          const newItem: CartItem = {
            id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            product,
            weightGrams,
            cutStyle,
            skinOption,
            cleaningPreference,
            specialInstructions,
            unitPricePerKg,
            totalPrice: calculatedPrice,
          };

          return { items: [...state.items, newItem], isCartOpen: true };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      updateWeight: (itemId, newWeightGrams) => {
        if (newWeightGrams <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === itemId) {
              const totalPrice = Math.round((item.unitPricePerKg * newWeightGrams) / 1000);
              return { ...item, weightGrams: newWeightGrams, totalPrice };
            }
            return item;
          }),
        }));
      },

      applyCoupon: (code) => {
        const found = AVAILABLE_COUPONS.find(
          (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active
        );
        if (!found) {
          return { success: false, message: 'Invalid or expired coupon code.' };
        }
        const subtotal = get().getSubtotal();
        if (subtotal < found.minOrder) {
          return {
            success: false,
            message: `Requires minimum order of ₹${found.minOrder}.`,
          };
        }
        set({ appliedCoupon: found });
        return { success: true, message: `Coupon ${found.code} applied successfully!` };
      },

      removeCoupon: () => set({ appliedCoupon: null }),

      clearCart: () => set({ items: [], appliedCoupon: null }),

      getSubtotal: () => {
        return get().items.reduce((sum, i) => sum + i.totalPrice, 0);
      },

      getDiscount: () => {
        const { appliedCoupon } = get();
        if (!appliedCoupon) return 0;
        const subtotal = get().getSubtotal();
        if (subtotal < appliedCoupon.minOrder) return 0;
        if (appliedCoupon.discountType === 'fixed') {
          return Math.min(appliedCoupon.discountValue, subtotal);
        }
        return Math.round((subtotal * appliedCoupon.discountValue) / 100);
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        if (subtotal >= SHOP_CONFIG.freeDeliveryAbove) return 0;
        return SHOP_CONFIG.deliveryFee;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const delivery = get().getDeliveryFee();
        return Math.max(0, subtotal - discount + delivery);
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'freshcut_cart_storage',
    }
  )
);
