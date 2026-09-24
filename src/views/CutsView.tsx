import React from 'react';
import { CutsDiagramHotspots } from '../components/shop/CutsDiagramHotspots';
import { ChefHat, Flame, HelpCircle, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from '../components/ui/Button';

interface CutsViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const CutsView: React.FC<CutsViewProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const dishGuide = [
    {
      dish: 'Dum Biryani',
      bestCut: 'Chicken Biryani Cut (Leg & Thigh Pieces)',
      why: 'Thigh and drumstick meat contains more collagen and dark muscle fiber that stays extremely juicy during 45 mins of slow dum cooking, absorbing saffron and spice aromatics without drying out.',
      portion: 'Approx. 500g bone-in meat per 500g Basmati rice',
    },
    {
      dish: 'Kolhapuri Tambda / Pandhra Rassa',
      bestCut: 'Curry Cut with Skin & Bone',
      why: 'The bone marrow and skin fats melt into the stock broth, creating that iconic deep red lipid layer (tarri) that defines authentic Maharashtrian curry.',
      portion: '750g - 1kg for a family of 4',
    },
    {
      dish: 'Butter Chicken & Tikka',
      bestCut: 'Tender Boneless Breast or Thigh Fillet',
      why: 'Quick uniform marination in dahi and mustard oil. Cooks under 12 minutes in oven or pan so meat stays soft and buttery.',
      portion: '500g boneless serves 3-4',
    },
    {
      dish: 'Sukka / Dry Masala Fry',
      bestCut: 'Small Curry Cut Pieces',
      why: 'Smaller surface area means roasted onion-coconut masala coats every millimeter of the meat with intense smoky flavor.',
      portion: '500g serves 2-3 with bhakri',
    },
    {
      dish: 'Nutritious Bone Broth & Soup',
      bestCut: 'Chicken Soup Bones & Wing Tips',
      why: 'Rich in gelatin, glucosamine, and bone marrow. Simmer for 2 hours with black pepper, ginger, and turmeric for immunity boosting soup.',
      portion: '500g bones yields 1.5L rich broth',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 space-y-16">
      {/* Editorial Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-[#EBF3EE] text-[#2F5D46] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <ChefHat className="w-4 h-4" />
          <span>Butcher Craft & Anatomy Knowledge</span>
        </div>
        <h1 className="font-serif-display font-extrabold text-3xl md:text-5xl text-[#1B1512]">
          Know Your Cuts, Master Your Cook.
        </h1>
        <p className="text-xs sm:text-sm text-[#5E524C] leading-relaxed">
          Great cooking starts at the butcher block. The difference between a tough curry and a fall-off-the-bone feast is selecting the right muscle group. Explore our interactive cut diagram below.
        </p>
      </div>

      {/* Interactive Anatomy Hotspots */}
      <CutsDiagramHotspots onNavigateToDetail={(slug) => onNavigate('product', slug)} />

      {/* Culinary Pairing Matrix */}
      <div className="space-y-6">
        <div className="border-b border-[#1B1512]/10 pb-4">
          <span className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
            Which Cut for Which Dish?
          </span>
          <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-[#1B1512] mt-0.5">
            The Indian Chef's Meat Pairing Guide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dishGuide.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#1B1512]/10 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#C8262B]/30 transition-colors"
            >
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
                  {item.dish}
                </div>
                <h3 className="font-serif-display font-bold text-lg text-[#1B1512]">
                  {item.bestCut}
                </h3>
                <p className="text-xs text-[#5E524C] leading-relaxed">
                  {item.why}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1B1512]/5 text-[11px] text-[#2F5D46] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{item.portion}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sourcing & Butchery Wisdom */}
      <div className="bg-[#1B1512] text-[#FBF6EE] rounded-3xl p-8 md:p-12 border border-[#342A24] space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-[#F2A33A] uppercase tracking-widest">
            Behind the Cleaver
          </span>
          <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-white mt-1">
            4 Golden Rules of Buying & Storing Fresh Meat
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="space-y-2 bg-[#261E1A] p-5 rounded-2xl border border-[#3D312A]">
            <div className="font-bold text-sm text-[#F2A33A]">1. The Color Test</div>
            <p className="text-[#FBF6EE]/75 leading-relaxed">
              Fresh chicken is pale pink to light rose with white cartilage. Never gray or translucent. Our meat arrives untouched by ice-melt wash.
            </p>
          </div>

          <div className="space-y-2 bg-[#261E1A] p-5 rounded-2xl border border-[#3D312A]">
            <div className="font-bold text-sm text-[#F2A33A]">2. The Smell Test</div>
            <p className="text-[#FBF6EE]/75 leading-relaxed">
              Quality raw poultry should smell clean and neutral, with zero ammonia or sour odor. You can immediately cook it without lemon/vinegar masking.
            </p>
          </div>

          <div className="space-y-2 bg-[#261E1A] p-5 rounded-2xl border border-[#3D312A]">
            <div className="font-bold text-sm text-[#F2A33A]">3. Never Re-Freeze</div>
            <p className="text-[#FBF6EE]/75 leading-relaxed">
              Because our cuts have never been frozen, you can store them in the coldest zone of your refrigerator (0-4°C) for 48 hours without any quality loss.
            </p>
          </div>

          <div className="space-y-2 bg-[#261E1A] p-5 rounded-2xl border border-[#3D312A]">
            <div className="font-bold text-sm text-[#F2A33A]">4. Net Weight Honesty</div>
            <p className="text-[#FBF6EE]/75 leading-relaxed">
              Traditional butchers weigh before cleaning (losing 25-30% weight). At FreshCut, what you order is the 100% net consumable weight in the box.
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Button variant="primary" size="lg" onClick={() => onNavigate('shop')}>
            Order Today's Fresh Cuts
          </Button>
        </div>
      </div>
    </div>
  );
};
