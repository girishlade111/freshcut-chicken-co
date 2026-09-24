import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Clock, ChefHat, Check, ArrowRight, Sparkles } from 'lucide-react';
import { CUT_HOTSPOTS } from '../../data/mockData';
import { CutHotspot } from '../../types';
import { useRatesStore } from '../../store/useRatesStore';
import { useCartStore } from '../../store/useCartStore';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const CutsDiagramHotspots: React.FC<{
  onNavigateToDetail?: (slug: string) => void;
}> = ({ onNavigateToDetail }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<CutHotspot>(CUT_HOTSPOTS[0]);
  const [added, setAdded] = useState(false);
  const { language } = useLanguage();
  const { products } = useRatesStore();
  const { addItem } = useCartStore();

  const linkedProduct = products.find((p) => p.id === selectedHotspot.linkedProductId);

  const handleAddToCart = () => {
    if (linkedProduct) {
      addItem(linkedProduct, 500);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }
  };

  return (
    <div className="bg-[#FBF6EE] rounded-3xl border border-[#1B1512]/15 overflow-hidden shadow-md">
      {/* Editorial Header */}
      <div className="p-6 md:p-8 bg-[#1B1512] text-[#FBF6EE] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#F2A33A] text-xs font-bold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Master Butcher Anatomy Guide</span>
          </div>
          <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-white">
            {language === 'mr' ? 'चिकन कट्स मार्गदर्शक' : 'Interactive Chicken Anatomy & Cuts Guide'}
          </h2>
          <p className="text-xs text-[#FBF6EE]/75 mt-1 max-w-xl">
            Tap on any hotspot to discover the right cut for your culinary dish, cooking times, and butcher texture notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#F2A33A] font-semibold bg-[#261E1A] px-3 py-1.5 rounded-xl border border-[#3D312A]">
            8 Artisan Cuts Mapped
          </span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Center: Interactive SVG Anatomy Diagram */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-lg aspect-4/3 bg-[#F4ECE0] rounded-2xl border border-[#1B1512]/10 p-4 shadow-inner flex items-center justify-center">
            {/* Background Chicken Silhouette SVG with warm butcher style */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full text-[#1B1512] opacity-85 select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Chicken Contour Outline */}
              <path
                d="M320,180 C320,150 340,110 380,100 C410,90 440,110 450,140 C460,130 480,130 490,145 C480,165 495,175 480,195 C460,190 440,195 435,210 C460,240 520,270 560,260 C610,250 660,200 690,160 C710,210 700,280 660,330 C620,380 570,410 520,430 C480,445 440,450 400,440 C350,430 300,400 270,360 C240,320 230,260 250,220 C270,180 300,180 320,180 Z"
                fill="#E8DDD0"
                stroke="#1B1512"
                strokeWidth="4"
              />

              {/* Comb & Wattle */}
              <path
                d="M440,95 Q450,75 465,85 Q475,70 485,90 Q495,75 500,105 Q470,120 440,95 Z"
                fill="#C8262B"
              />
              <path
                d="M485,190 C495,205 490,225 475,220 C465,215 475,195 485,190 Z"
                fill="#C8262B"
              />
              {/* Beak */}
              <polygon points="500,150 540,165 500,175" fill="#F2A33A" />
              {/* Eye */}
              <circle cx="465" cy="145" r="5" fill="#1B1512" />

              {/* Wing Boundary */}
              <path
                d="M340,250 C380,240 430,270 420,330 C410,370 360,390 320,370 C300,340 300,280 340,250 Z"
                fill="#DFD2C2"
                stroke="#1B1512"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />

              {/* Thigh & Drumstick Outline */}
              <path
                d="M440,330 C480,330 520,370 510,420 C500,450 460,470 430,460 C410,430 410,360 440,330 Z"
                fill="#D8C9B7"
                stroke="#1B1512"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <path
                d="M440,460 L445,540 M465,455 L475,540"
                stroke="#1B1512"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Tail Feathers */}
              <path
                d="M270,220 C240,180 200,160 170,190 C150,220 180,260 230,280 M260,200 C230,150 180,120 140,150 C120,190 160,230 210,250 M280,240 C240,220 190,230 170,260 C160,290 190,310 240,310"
                stroke="#1B1512"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* Hotspot Markers placed over SVG */}
            {CUT_HOTSPOTS.map((hotspot) => {
              const isSelected = selectedHotspot.id === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => setSelectedHotspot(hotspot)}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer transition-all duration-300 z-20 group`}
                >
                  <div
                    className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform ${
                      isSelected
                        ? 'bg-[#C8262B] text-white scale-125 ring-4 ring-[#C8262B]/30'
                        : 'bg-[#1B1512] text-[#FBF6EE] group-hover:scale-110 group-hover:bg-[#C8262B]'
                    }`}
                  >
                    ✦
                  </div>
                  <span
                    className={`absolute top-full mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-sm pointer-events-none transition-all ${
                      isSelected
                        ? 'bg-[#1B1512] text-white opacity-100 scale-100'
                        : 'bg-white text-[#1B1512] opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {language === 'mr' ? hotspot.titleMr.split(' ')[0] : hotspot.titleEn.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Hotspots Quick Switcher Chips on Mobile */}
          <div className="flex flex-wrap gap-1.5 justify-center mt-4">
            {CUT_HOTSPOTS.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedHotspot(h)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  selectedHotspot.id === h.id
                    ? 'bg-[#C8262B] text-white'
                    : 'bg-white border border-[#1B1512]/15 text-[#5E524C] hover:bg-[#1B1512]/5'
                }`}
              >
                {language === 'mr' ? h.titleMr.split(' ')[0] : h.titleEn.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Selected Cut Detail Card */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHotspot.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl p-6 md:p-7 border border-[#1B1512]/15 shadow-sm space-y-5"
            >
              {/* Header of selected cut */}
              <div className="border-b border-[#1B1512]/10 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#C8262B] uppercase tracking-wider">
                    {selectedHotspot.part}
                  </span>
                  <span className="font-serif-display font-extrabold text-xl text-[#1B1512]">
                    ₹{selectedHotspot.pricePerKg} <span className="text-xs font-sans text-[#5E524C]">/kg</span>
                  </span>
                </div>
                <h3 className="font-serif-display font-bold text-2xl text-[#1B1512] mt-1">
                  {language === 'mr' ? selectedHotspot.titleMr : selectedHotspot.titleEn}
                </h3>
                <p className="text-xs text-[#5E524C] mt-2 leading-relaxed">
                  {selectedHotspot.description}
                </p>
              </div>

              {/* Texture & Cooking specs */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <ChefHat className="w-4 h-4 text-[#C8262B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1B1512]">Butcher Texture: </span>
                    <span className="text-[#5E524C]">{selectedHotspot.texture}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#F2A33A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1B1512]">Ideal Cooking Time: </span>
                    <span className="text-[#5E524C]">{selectedHotspot.cookingTime}</span>
                  </div>
                </div>

                {/* Best for tags */}
                <div className="pt-1">
                  <div className="font-bold text-[#1B1512] mb-1.5">Best Prepared As:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedHotspot.bestFor.map((dish, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#EBF3EE] text-[#2F5D46] border border-[#2F5D46]/20 font-semibold text-[11px]"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions: Add to cart & view product */}
              <div className="pt-4 border-t border-[#1B1512]/10 flex flex-col sm:flex-row items-center gap-2.5">
                <Button
                  fullWidth
                  variant={added ? 'secondary' : 'primary'}
                  size="md"
                  onClick={handleAddToCart}
                  icon={added ? <Check className="w-4 h-4 text-[#2F5D46]" /> : <ShoppingBag className="w-4 h-4" />}
                >
                  {added ? 'Added 500g to Bag' : 'Add 500g to Cart (₹' + Math.round(selectedHotspot.pricePerKg / 2) + ')'}
                </Button>

                {linkedProduct && onNavigateToDetail && (
                  <button
                    onClick={() => onNavigateToDetail(linkedProduct.slug)}
                    className="text-xs font-semibold text-[#1B1512] hover:text-[#C8262B] transition-colors py-2 shrink-0 cursor-pointer"
                  >
                    Full Details →
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
