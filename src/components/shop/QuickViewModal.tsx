import React, { useState } from 'react';
import { X, Check, ShoppingBag, MessageSquare, Scale, ShieldCheck, Flame, Heart } from 'lucide-react';
import { Product, CutStyle, SkinOption, CleaningPreference } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useLanguage } from '../../i18n/LanguageContext';
import { SHOP_CONFIG } from '../../config/shop';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigateToFullDetail: (slug: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onNavigateToFullDetail,
}) => {
  if (!product) return null;

  const { addItem } = useCartStore();
  const { language, t } = useLanguage();

  const [weight, setWeight] = useState<number>(
    product.minWeightGrams >= 1000 ? 1000 : 500
  );
  const [cutStyle, setCutStyle] = useState<CutStyle>(
    product.availableCuts[0] || 'Curry Cut'
  );
  const [skinOption, setSkinOption] = useState<SkinOption>(
    product.skinOptions[0] || 'skinless'
  );
  const [cleaning, setCleaning] = useState<CleaningPreference>('standard_clean');
  const [specialNotes, setSpecialNotes] = useState('');
  const [added, setAdded] = useState(false);

  const isEggs = product.slug === 'farm-fresh-eggs';
  const totalPrice = isEggs
    ? product.pricePerKg
    : Math.round((product.pricePerKg * weight) / 1000);

  const handleAddToCart = () => {
    addItem(product, weight, cutStyle, skinOption, cleaning, specialNotes);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  const handleWhatsAppOrder = () => {
    const text = `Hello ${SHOP_CONFIG.shopName}, I'd like to order:\n- Item: ${product.nameEn}\n- Weight: ${weight}g\n- Cut Style: ${cutStyle}\n- Skin: ${skinOption}\n- Est. Price: ₹${totalPrice}`;
    const url = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FBF6EE] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#1B1512]/15 relative max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1B1512] flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image & Quick Badges */}
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F4ECE0] border border-[#1B1512]/10">
                <img
                  src={product.image}
                  alt={product.nameEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {product.badges.map((b, i) => (
                    <Badge key={i} variant={b.variant}>
                      {language === 'mr' ? b.labelMr : b.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Nutrition Summary Bar */}
              <div className="mt-3 p-3 bg-white/80 rounded-xl border border-[#1B1512]/5 text-xs grid grid-cols-3 text-center">
                <div>
                  <div className="font-bold text-[#1B1512]">{product.nutrition.protein}g</div>
                  <div className="text-[10px] text-[#5E524C]">Protein</div>
                </div>
                <div>
                  <div className="font-bold text-[#1B1512]">{product.nutrition.fat}g</div>
                  <div className="text-[10px] text-[#5E524C]">Fat</div>
                </div>
                <div>
                  <div className="font-bold text-[#1B1512]">{product.nutrition.energy} kcal</div>
                  <div className="text-[10px] text-[#5E524C]">Energy /100g</div>
                </div>
              </div>
            </div>

            {/* Product Details & Selectors */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#C8262B] uppercase tracking-wider">
                  {product.category}
                </span>
                <h2 className="font-serif-display font-bold text-xl md:text-2xl text-[#1B1512] leading-tight mt-0.5">
                  {language === 'mr' ? product.nameMr : product.nameEn}
                </h2>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif-display font-bold text-2xl text-[#C8262B]">
                    ₹{product.pricePerKg}
                  </span>
                  <span className="text-xs text-[#5E524C]">
                    {isEggs ? 'per 12 pack' : 'per kg (net cleaned weight)'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#5E524C] leading-relaxed">
                {language === 'mr' ? product.descriptionMr : product.descriptionEn}
              </p>

              {/* Weight Presets */}
              {!isEggs && (
                <div>
                  <label className="block text-xs font-bold text-[#1B1512] mb-1.5 flex items-center justify-between">
                    <span>Weight Preference:</span>
                    <span className="text-[#C8262B] font-semibold">
                      {weight >= 1000 ? `${weight / 1000} kg` : `${weight}g`}
                    </span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[250, 500, 750, 1000].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setWeight(w)}
                        className={`py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          weight === w
                            ? 'bg-[#C8262B] text-white border-[#C8262B]'
                            : 'bg-white text-[#1B1512] border-[#1B1512]/15 hover:border-[#C8262B]'
                        }`}
                      >
                        {w >= 1000 ? '1 kg' : `${w}g`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Cut Style Selector */}
              {product.availableCuts.length > 1 && (
                <div>
                  <label className="block text-xs font-bold text-[#1B1512] mb-1.5">
                    Select Cut Style:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.availableCuts.map((cut) => (
                      <button
                        key={cut}
                        type="button"
                        onClick={() => setCutStyle(cut)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          cutStyle === cut
                            ? 'bg-[#1B1512] text-white border-[#1B1512]'
                            : 'bg-white text-[#1B1512] border-[#1B1512]/15 hover:border-[#1B1512]'
                        }`}
                      >
                        {cut}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Skin Preference */}
              {product.skinOptions.length > 1 && (
                <div>
                  <label className="block text-xs font-bold text-[#1B1512] mb-1.5">
                    Skin Preference:
                  </label>
                  <div className="flex gap-2">
                    {product.skinOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSkinOption(opt)}
                        className={`flex-1 py-1.5 rounded-xl border text-xs font-medium capitalize transition-all cursor-pointer ${
                          skinOption === opt
                            ? 'bg-[#1B1512] text-white border-[#1B1512]'
                            : 'bg-white text-[#1B1512] border-[#1B1512]/15'
                        }`}
                      >
                        {opt.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cutting Instructions & Live Total */}
          <div className="pt-4 border-t border-[#1B1512]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-[#5E524C] uppercase font-semibold">
                Total for this cut
              </div>
              <div className="font-serif-display font-extrabold text-2xl text-[#1B1512]">
                ₹{totalPrice}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="whatsapp"
                size="md"
                onClick={handleWhatsAppOrder}
                icon={<MessageSquare className="w-4 h-4" />}
              >
                Order on WA
              </Button>

              <Button
                variant={added ? 'secondary' : 'primary'}
                size="md"
                onClick={handleAddToCart}
                icon={added ? <Check className="w-4 h-4 text-[#2F5D46]" /> : <ShoppingBag className="w-4 h-4" />}
              >
                {added ? 'Added to Bag!' : 'Add to Bag'}
              </Button>
            </div>
          </div>

          {/* Link to Full Product Detail Page */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                onClose();
                onNavigateToFullDetail(product.slug);
              }}
              className="text-xs font-semibold text-[#C8262B] hover:underline cursor-pointer"
            >
              View Full Cut Details, Recipes & Cooking Advice →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
