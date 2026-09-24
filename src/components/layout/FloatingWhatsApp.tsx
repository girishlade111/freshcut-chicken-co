import React from 'react';
import { MessageSquare } from 'lucide-react';
import { SHOP_CONFIG } from '../../config/shop';

export const FloatingWhatsApp: React.FC = () => {
  const message = `Hello ${SHOP_CONFIG.shopName}, I'd like to check today's fresh cuts and order.`;
  const waUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white pl-3.5 pr-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1 select-none"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] tracking-wide text-white/90 uppercase font-bold">Fast Delivery</span>
          <span className="text-xs font-bold leading-tight">Order on WhatsApp</span>
        </div>
      </a>
    </div>
  );
};
