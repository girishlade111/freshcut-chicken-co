import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  MessageSquare,
  ShieldCheck,
  Check,
  Flame,
  Scale,
  Clock,
  Heart,
  ChevronRight,
  Info,
  Sparkles,
} from 'lucide-react';
import { Product, CutStyle, SkinOption, CleaningPreference } from '../types';
import { useRatesStore } from '../store/useRatesStore';
import { useCartStore } from '../store/useCartStore';
import { useLanguage } from '../i18n/LanguageContext';
import { SHOP_CONFIG } from '../config/shop';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProductCard } from '../components/shop/ProductCard';

interface ProductDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  slug,
  onNavigate,
  onQuickView,
}) => {
  const { products } = useRatesStore();
  const { addItem, openCart } = useCartStore();
  const { language } = useLanguage();

  const product = products.find((p) => p.slug === slug) || products[0];

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
  const [instructions, setInstructions] = useState('');
  const [added, setAdded] = useState(false);

  const isEggs = product.slug === 'farm-fresh-eggs';
  const estimatedPrice = isEggs
    ? product.pricePerKg
    : Math.round((product.pricePerKg * weight) / 1000);

  const handleAddToCart = () => {
    addItem(product, weight, cutStyle, skinOption, cleaning, instructions);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 600);
  };

  const handleWhatsAppOrder = () => {
    const text = `Hello ${SHOP_CONFIG.shopName}, I'd like to order:\n- Item: ${product.nameEn}\n- Weight: ${weight}g\n- Cut Style: ${cutStyle}\n- Skin: ${skinOption}\n- Cleaning: ${cleaning}\n- Notes: ${instructions || 'None'}\n- Est. Price: ₹${estimatedPrice}`;
    const url = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#5E524C]">
        <button onClick={() => onNavigate('home')} className="hover:underline cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => onNavigate('shop')} className="hover:underline cursor-pointer">
          Shop Cuts
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="font-bold text-[#1B1512]">{product.nameEn}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Image & Nutrition */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative rounded-3xl overflow-hidden bg-[#F4ECE0] border border-[#1B1512]/15 shadow-sm aspect-4/3">
            <img
              src={product.image}
              alt={product.nameEn}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
              {product.badges.map((b, idx) => (
                <Badge key={idx} variant={b.variant} size="md">
                  {language === 'mr' ? b.labelMr : b.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sourcing Transparency Card */}
          <div className="bg-[#EBF3EE] rounded-2xl p-5 border border-[#2F5D46]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2F5D46] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Bio-Secure Sourcing Guarantee</span>
            </div>
            <p className="text-xs text-[#1B1512] leading-relaxed">
              Sourced from bio-secure farms within 60km of Pune. Raised on 100% vegetarian feed without synthetic growth promoters, steroids, or antibiotic residue. Certified laboratory tested daily.
            </p>
          </div>

          {/* Nutrition Panel */}
          <div className="bg-white rounded-2xl p-5 border border-[#1B1512]/10 space-y-3">
            <h3 className="font-serif-display font-bold text-sm text-[#1B1512]">
              Nutrition Facts (Approx. per 100g raw)
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-[#FBF6EE] p-2.5 rounded-xl border border-[#1B1512]/5">
                <div className="font-serif-display font-bold text-base text-[#1B1512]">
                  {product.nutrition.protein}g
                </div>
                <div className="text-[10px] text-[#5E524C]">Protein</div>
              </div>
              <div className="bg-[#FBF6EE] p-2.5 rounded-xl border border-[#1B1512]/5">
                <div className="font-serif-display font-bold text-base text-[#1B1512]">
                  {product.nutrition.fat}g
                </div>
                <div className="text-[10px] text-[#5E524C]">Fat</div>
              </div>
              <div className="bg-[#FBF6EE] p-2.5 rounded-xl border border-[#1B1512]/5">
                <div className="font-serif-display font-bold text-base text-[#1B1512]">
                  {product.nutrition.energy}
                </div>
                <div className="text-[10px] text-[#5E524C]">kcal Energy</div>
              </div>
              <div className="bg-[#FBF6EE] p-2.5 rounded-xl border border-[#1B1512]/5">
                <div className="font-serif-display font-bold text-base text-[#1B1512]">
                  0g
                </div>
                <div className="text-[10px] text-[#5E524C]">Carbs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customization, Cut Preferences & Add to Cart */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
              {product.category}
            </div>
            <h1 className="font-serif-display font-bold text-3xl md:text-4xl text-[#1B1512] mt-1 leading-tight">
              {language === 'mr' ? product.nameMr : product.nameEn}
            </h1>
            <div className="text-xs text-[#5E524C] mt-0.5">
              {language === 'mr' ? product.nameEn : product.nameMr}
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-2.5 mt-3 pt-3 border-t border-[#1B1512]/10">
              <span className="font-serif-display font-extrabold text-3xl text-[#C8262B]">
                ₹{estimatedPrice}
              </span>
              {!isEggs && (
                <span className="text-xs text-[#5E524C]">
                  (Wholesale Live Rate: ₹{product.pricePerKg} / kg net weight)
                </span>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#5E524C] leading-relaxed">
            {language === 'mr' ? product.descriptionMr : product.descriptionEn}
          </p>

          {/* 1. Weight Selection */}
          {!isEggs && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#1B1512]">
                <span className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#C8262B]" />
                  <span>Choose Net Pack Weight:</span>
                </span>
                <span className="text-[#C8262B]">
                  {weight >= 1000 ? `${weight / 1000} kg` : `${weight}g`}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[250, 500, 750, 1000].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeight(w)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      weight === w
                        ? 'bg-[#C8262B] text-white border-[#C8262B] shadow-xs'
                        : 'bg-white text-[#1B1512] border-[#1B1512]/15 hover:border-[#1B1512]/40'
                    }`}
                  >
                    {w >= 1000 ? '1 kg' : `${w}g`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Cut Style Selection */}
          {product.availableCuts.length > 1 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1B1512]">
                Butcher Cutting Style:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.availableCuts.map((cut) => (
                  <button
                    key={cut}
                    type="button"
                    onClick={() => setCutStyle(cut)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      cutStyle === cut
                        ? 'bg-[#1B1512] text-white border-[#1B1512] font-semibold'
                        : 'bg-white text-[#1B1512] border-[#1B1512]/15 hover:border-[#1B1512]'
                    }`}
                  >
                    <div>{cut}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Skin Preference */}
          {product.skinOptions.length > 1 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1B1512]">
                Skin Preference:
              </label>
              <div className="flex gap-2">
                {product.skinOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSkinOption(opt)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-semibold capitalize transition-all cursor-pointer ${
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

          {/* 4. Special Instructions */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1B1512]">
              Special Cutting Instructions for the Butcher:
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Cut into 16 medium curry pieces, don't pack liver"
              className="w-full bg-white border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-xs text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
            />
          </div>

          {/* Cooking Tips */}
          {product.cookingTips && (
            <div className="bg-[#F4ECE0] p-4 rounded-2xl border border-[#1B1512]/10 space-y-1.5 text-xs text-[#5E524C]">
              <div className="font-bold text-[#1B1512] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#C8262B]" />
                <span>Butcher's Kitchen Tips:</span>
              </div>
              <p className="leading-relaxed">{product.cookingTips}</p>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#1B1512]/10 flex flex-col sm:flex-row gap-3">
            <Button
              fullWidth
              variant={added ? 'secondary' : 'primary'}
              size="lg"
              onClick={handleAddToCart}
              icon={added ? <Check className="w-5 h-5 text-[#2F5D46]" /> : <ShoppingBag className="w-5 h-5" />}
            >
              {added ? 'Added to Bag!' : `Add to Bag · ₹${estimatedPrice}`}
            </Button>

            <Button
              fullWidth
              variant="whatsapp"
              size="lg"
              onClick={handleWhatsAppOrder}
              icon={<MessageSquare className="w-5 h-5" />}
            >
              Order on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Related Cuts Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#1B1512]/10 space-y-6">
          <h3 className="font-serif-display font-bold text-2xl text-[#1B1512]">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={onQuickView}
                onNavigateToDetail={(s) => onNavigate('product', s)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
