import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SubscriptionPlan, CutStyle, SkinOption } from '../types';

interface SubscriptionState {
  subscriptions: SubscriptionPlan[];
  addSubscription: (plan: Omit<SubscriptionPlan, 'id' | 'active'>) => SubscriptionPlan;
  toggleSubscription: (id: string) => void;
  removeSubscription: (id: string) => void;
}

const DEFAULT_SUBSCRIPTION: SubscriptionPlan = {
  id: 'sub-sunday-family',
  titleEn: 'Sunday Family Chicken Feast',
  titleMr: 'रविवार फॅमिली चिकन बेत',
  frequency: 'Weekly',
  preferredDay: 'Sunday',
  preferredSlot: '08:30 AM - 10:30 AM',
  productId: 'prod-1',
  weightGrams: 1000,
  cutStyle: 'Curry Cut' as CutStyle,
  skinOption: 'with_skin' as SkinOption,
  pricePerDelivery: 189, // 10% discount from 210
  discountPercentage: 10,
  active: true,
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      subscriptions: [DEFAULT_SUBSCRIPTION],

      addSubscription: (planData) => {
        const newSub: SubscriptionPlan = {
          ...planData,
          id: `sub-${Date.now()}`,
          active: true,
        };
        set((state) => ({
          subscriptions: [newSub, ...state.subscriptions],
        }));
        return newSub;
      },

      toggleSubscription: (id) => {
        set((state) => ({
          subscriptions: state.subscriptions.map((s) =>
            s.id === id ? { ...s, active: !s.active } : s
          ),
        }));
      },

      removeSubscription: (id) => {
        set((state) => ({
          subscriptions: state.subscriptions.filter((s) => s.id !== id),
        }));
      },
    }),
    {
      name: 'freshcut_subscriptions',
    }
  )
);
