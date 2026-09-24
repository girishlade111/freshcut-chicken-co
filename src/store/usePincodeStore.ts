import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SHOP_CONFIG } from '../config/shop';

interface PincodeState {
  currentPincode: string;
  isServiceable: boolean;
  areaName: string;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  checkPincode: (pin: string) => { serviceable: boolean; area?: string; message: string };
  setPincode: (pin: string) => void;
}

export const usePincodeStore = create<PincodeState>()(
  persist(
    (set) => ({
      currentPincode: '411004',
      isServiceable: true,
      areaName: 'Deccan & Shivaji Nagar',
      isModalOpen: false,

      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),

      checkPincode: (pin: string) => {
        const cleanPin = pin.trim();
        const found = SHOP_CONFIG.deliveryAreas.find((a) => a.pincode === cleanPin);
        if (found) {
          set({ currentPincode: cleanPin, isServiceable: true, areaName: found.name, isModalOpen: false });
          return { serviceable: true, area: found.name, message: `Delivering fresh to ${found.name} in ~${found.deliveryTimeMins} mins!` };
        } else if (SHOP_CONFIG.serviceablePincodes.includes(cleanPin)) {
          set({ currentPincode: cleanPin, isServiceable: true, areaName: `${SHOP_CONFIG.city} Area`, isModalOpen: false });
          return { serviceable: true, area: `${SHOP_CONFIG.city} Area`, message: `Standard delivery available to ${cleanPin}.` };
        } else {
          return { serviceable: false, message: `Sorry, we haven't opened cold delivery to ${cleanPin} yet. We are expanding soon!` };
        }
      },

      setPincode: (pin: string) => {
        const cleanPin = pin.trim();
        const found = SHOP_CONFIG.deliveryAreas.find((a) => a.pincode === cleanPin);
        if (found) {
          set({ currentPincode: cleanPin, isServiceable: true, areaName: found.name });
        } else {
          set({ currentPincode: cleanPin, isServiceable: SHOP_CONFIG.serviceablePincodes.includes(cleanPin), areaName: cleanPin });
        }
      },
    }),
    {
      name: 'freshcut_pincode_storage',
    }
  )
);
