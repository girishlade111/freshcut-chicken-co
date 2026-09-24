import React, { useState } from 'react';
import { Plus, Eye, Check, Sparkles, Scale } from 'lucide-react';
import { Product, CutStyle, SkinOption } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useLanguage } from '../../i18n/LanguageContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onNavigateToDetail: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onNavigateToDetail,
}) => {
  const { addItem } = useCartStore();
  const { language } = useLanguage();

  const [selectedWeight, setSelectedWeight] = useState<number>(
    product.minWeightGrams >= 1000 ? 1000 : 500
  );
  const [justAdded, setJustAdded] = useState(false);

  // Price estimate for chosen weight
  const isEggs = product.slug === 'farm-fresh-eggs';
  const estimatedPrice = isEggs
    ? product.pricePerKg
    : Math.round((product.pricePerKg * selectedWeight) / 1000);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(
      product,
      selectedWeight,
      product.availableCuts[0] || 'Curry Cut',
      product.skinOptions[0] || 'skinless'
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const isSoldOut = product.stockStatus === 'sold_out';

  return (
    <div className="group bg-white rounded-2xl border border-[#1B1512]/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Area */}
      <div
        onClick={() => onNavigateToDetail(product.slug)}
        className="relative aspect-4/3 overflow-hidden bg-[#F4ECE0] cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.badges.map((b, i) => (
            <Badge key={i} variant={b.variant}>
              {language === 'mr' ? b.labelMr : b.label}
            </Badge>
          ))}
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-2.5 right-2.5 p-2 bg-[#FBF6EE]/90 hover:bg-white text-[#1B1512] rounded-xl shadow-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>

        {isSoldOut && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm tracking-wider uppercase">
            Sold Out for Today
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Piece info */}
          <div className="flex items-center justify-between text-[11px] text-[#5E524C] font-medium mb-1">
            <span className="uppercase tracking-wider">{product.category}</span>
            {product.piecesCountPerKg && <span>{product.piecesCountPerKg}</span>}
          </div>

          {/* Title */}
          <h3
            onClick={() => onNavigateToDetail(product.slug)}
            className="font-serif-display font-bold text-base text-[#1B1512] group-hover:text-[#C8262B] transition-colors line-clamp-1 cursor-pointer"
          >
            {language === 'mr' ? product.nameMr : product.nameEn}
          </h3>
          <p className="text-xs text-[#5E524C] line-clamp-2 mt-1 leading-relaxed">
            {language === 'mr' ? product.descriptionMr : product.descriptionEn}
          </p>
        </div>

        {/* Weight Selector Chips */}
        {!isEggs && (
          <div className="mt-3 pt-3 border-t border-[#1B1512]/5">
            <div className="flex items-center justify-between text-[11px] text-[#5E524C] mb-1.5 font-medium">
              <span className="flex items-center gap-1">
                <Scale className="w-3 h-3 text-[#C8262B]" />
                <span>Select Weight:</span>
              </span>
              <span className="font-bold text-[#1B1512]">
                {selectedWeight >= 1000 ? `${selectedWeight / 1000} kg` : `${selectedWeight} g`}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {[250, 500, 1000].map((w) => {
                const isSelected = selectedWeight === w;
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWeight(w);
                    }}
                    className={`py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#C8262B] bg-[#C8262B]/10 text-[#C8262B]'
                        : 'border-[#1B1512]/15 bg-white text-[#5E524C] hover:border-[#1B1512]/30'
                    }`}
                  >
                    {w >= 1000 ? '1 kg' : `${w}g`}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price & Add to Cart Button */}
        <div className="mt-4 pt-3 border-t border-[#1B1512]/10 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-[#5E524C] uppercase tracking-wider">
              Estimated Price
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif-display font-extrabold text-lg text-[#1B1512]">
                ₹{estimatedPrice}
              </span>
              {!isEggs && (
                <span className="text-[11px] text-[#5E524C]">
                  (₹{product.pricePerKg}/kg)
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            variant={justAdded ? 'secondary' : 'primary'}
            disabled={isSoldOut}
            onClick={handleQuickAdd}
            icon={justAdded ? <Check className="w-3.5 h-3.5 text-[#2F5D46]" /> : <Plus className="w-3.5 h-3.5" />}
          >
            {justAdded ? 'Added' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};
