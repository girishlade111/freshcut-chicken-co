import React from 'react';
import { Home, Store, TrendingUp, ShoppingBag, PhoneCall } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { SHOP_CONFIG } from '../../config/shop';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenRates: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenRates,
}) => {
  const { openCart, getItemCount } = useCartStore();
  const cartCount = getItemCount();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF6EE]/95 backdrop-blur-md border-t border-[#1B1512]/10 py-1.5 px-3 flex items-center justify-around shadow-lg">
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg cursor-pointer ${
          currentView === 'home' ? 'text-[#C8262B] font-bold' : 'text-[#5E524C]'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => onNavigate('shop')}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg cursor-pointer ${
          currentView === 'shop' ? 'text-[#C8262B] font-bold' : 'text-[#5E524C]'
        }`}
      >
        <Store className="w-5 h-5" />
        <span className="text-[10px]">Shop Cuts</span>
      </button>

      <button
        onClick={onOpenRates}
        className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[#5E524C] hover:text-[#C8262B] cursor-pointer"
      >
        <TrendingUp className="w-5 h-5" />
        <span className="text-[10px]">Rates</span>
      </button>

      <button
        onClick={openCart}
        className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[#5E524C] relative cursor-pointer"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-1 w-4 h-4 bg-[#C8262B] text-white rounded-full flex items-center justify-center text-[9px] font-bold">
            {cartCount}
          </span>
        )}
        <span className="text-[10px]">Cart</span>
      </button>

      <a
        href={`tel:${SHOP_CONFIG.phone}`}
        className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[#25D366] font-semibold cursor-pointer"
      >
        <PhoneCall className="w-5 h-5" />
        <span className="text-[10px]">Call Shop</span>
      </a>
    </div>
  );
};
