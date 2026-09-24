import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';

export interface RateItem {
  id: string;
  nameEn: string;
  nameMr: string;
  category: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  stockStatus: 'in_stock' | 'sold_out' | 'limited_today';
}

interface RatesState {
  products: Product[];
  lastUpdated: string;
  updateProductRate: (productId: string, newPricePerKg: number) => void;
  updateStockStatus: (productId: string, status: 'in_stock' | 'sold_out' | 'limited_today') => void;
  resetToDefaults: () => void;
  getProduct: (idOrSlug: string) => Product | undefined;
}

export const useRatesStore = create<RatesState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      lastUpdated: 'Today at 7:30 AM',

      updateProductRate: (productId: string, newPricePerKg: number) => {
        set((state) => {
          const updated = state.products.map((p) => {
            if (p.id === productId) {
              return {
                ...p,
                previousPricePerKg: p.pricePerKg,
                pricePerKg: newPricePerKg,
              };
            }
            return p;
          });

          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return {
            products: updated,
            lastUpdated: `Today at ${timeStr}`,
          };
        });
      },

      updateStockStatus: (productId: string, status: 'in_stock' | 'sold_out' | 'limited_today') => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, stockStatus: status } : p
          ),
        }));
      },

      resetToDefaults: () => {
        set({
          products: INITIAL_PRODUCTS,
          lastUpdated: 'Today at 7:30 AM',
        });
      },

      getProduct: (idOrSlug: string) => {
        return get().products.find(
          (p) => p.id === idOrSlug || p.slug === idOrSlug
        );
      },
    }),
    {
      name: 'freshcut_rates_inventory',
    }
  )
);
