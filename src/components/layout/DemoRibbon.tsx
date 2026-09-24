import React, { useState } from 'react';
import { Sparkles, X, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import { SHOP_CONFIG } from '../../config/shop';

interface DemoRibbonProps {
  onNavigateToAdmin: () => void;
}

export const DemoRibbon: React.FC<DemoRibbonProps> = ({ onNavigateToAdmin }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#C8262B] text-white text-xs px-3 py-1.5 flex items-center justify-between shadow-xs z-50">
      <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="bg-white/20 text-white font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase">
          Client Pitch Demo
        </span>
        <span className="hidden sm:inline font-medium">
          Sample data & mocked storage. Rebrandable in minutes via <code className="bg-black/20 px-1 py-0.5 rounded text-[11px]">/src/config/shop.ts</code>.
        </span>
        <span className="sm:hidden font-medium">Demo Mode (FSSAI: {SHOP_CONFIG.fssaiNumber})</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onNavigateToAdmin}
          className="flex items-center gap-1 bg-white text-[#C8262B] font-bold px-2 py-0.5 rounded text-[11px] hover:bg-[#FBF6EE] transition-all cursor-pointer shadow-xs"
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span>Demo Admin Panel</span>
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-white/20 rounded cursor-pointer"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
