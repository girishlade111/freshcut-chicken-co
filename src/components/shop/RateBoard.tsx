import React from 'react';
import { TrendingUp, TrendingDown, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useRatesStore } from '../../store/useRatesStore';
import { useLanguage } from '../../i18n/LanguageContext';
import { SHOP_CONFIG } from '../../config/shop';

interface RateBoardProps {
  onSelectProduct?: (slug: string) => void;
  compact?: boolean;
}

export const RateBoard: React.FC<RateBoardProps> = ({ onSelectProduct, compact = false }) => {
  const { products, lastUpdated } = useRatesStore();
  const { language } = useLanguage();

  // Key rate products to display
  const keyRateSlugs = [
    'curry-cut-with-skin',
    'skinless-curry-cut',
    'boneless-breast',
    'country-chicken-gavran',
    'mutton-curry-cut',
    'farm-fresh-eggs',
  ];

  const rateItems = products.filter((p) => keyRateSlugs.includes(p.slug));

  return (
    <div className={`bg-[#F4ECE0] rounded-2xl border border-[#1B1512]/15 shadow-sm overflow-hidden ${compact ? 'p-4' : 'p-6 md:p-8'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[#1B1512]/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2F5D46] animate-pulse" />
            <h3 className="font-serif-display font-bold text-lg md:text-xl text-[#1B1512]">
              {language === 'mr' ? 'आजचे अधिकृत थेट दरपत्रक' : "Today's Wholesale Mandi & Butcher Rate Board"}
            </h3>
          </div>
          <p className="text-xs text-[#5E524C] mt-0.5">
            Fair farmer-benchmarked rates updated daily. 100% transparent pricing per kilogram.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1512]/80 bg-white/80 px-3 py-1.5 rounded-xl border border-[#1B1512]/10 w-fit">
          <Clock className="w-3.5 h-3.5 text-[#C8262B]" />
          <span>{lastUpdated}</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1B1512]/10 text-[11px] uppercase tracking-wider text-[#5E524C]">
              <th className="pb-3 font-bold">Cut / Variety</th>
              <th className="pb-3 font-bold text-right">Today's Rate</th>
              <th className="pb-3 font-bold text-right">vs Yesterday</th>
              <th className="pb-3 font-bold text-center">Status</th>
              <th className="pb-3 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1B1512]/5 text-xs md:text-sm">
            {rateItems.map((item) => {
              const diff = item.pricePerKg - item.previousPricePerKg;
              const hasChanged = diff !== 0;
              const isUp = diff > 0;
              const isEggs = item.slug === 'farm-fresh-eggs';

              return (
                <tr key={item.id} className="hover:bg-white/50 transition-colors group">
                  <td className="py-3.5 pr-2">
                    <div className="font-bold text-[#1B1512]">
                      {language === 'mr' ? item.nameMr : item.nameEn}
                    </div>
                    <div className="text-[11px] text-[#5E524C]">
                      {language === 'mr' ? item.nameEn : item.nameMr}
                    </div>
                  </td>

                  <td className="py-3.5 text-right font-serif-display font-extrabold text-base md:text-lg text-[#1B1512]">
                    ₹{item.pricePerKg}
                    <span className="text-[10px] font-sans font-normal text-[#5E524C] ml-1">
                      {isEggs ? '/ 12 pcs' : '/ kg'}
                    </span>
                  </td>

                  <td className="py-3.5 text-right">
                    {hasChanged ? (
                      <span
                        className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                          isUp ? 'text-[#C8262B]' : 'text-[#2F5D46]'
                        }`}
                      >
                        {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        <span>{isUp ? `+₹${diff}` : `-₹${Math.abs(diff)}`}</span>
                      </span>
                    ) : (
                      <span className="text-xs text-[#5E524C] font-medium">— Stable</span>
                    )}
                  </td>

                  <td className="py-3.5 text-center">
                    {item.stockStatus === 'in_stock' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3EE] text-[#2F5D46] border border-[#2F5D46]/20">
                        Fresh In-Stock
                      </span>
                    )}
                    {item.stockStatus === 'limited_today' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F2A33A]/20 text-[#8F5608] border border-[#F2A33A]/30">
                        Limited Today
                      </span>
                    )}
                    {item.stockStatus === 'sold_out' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-600">
                        Sold Out
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onSelectProduct && onSelectProduct(item.slug)}
                      disabled={item.stockStatus === 'sold_out'}
                      className="px-3 py-1 bg-[#1B1512] hover:bg-[#C8262B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Select Cut
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-[#1B1512]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5E524C]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#2F5D46]" />
          <span>FSSAI verified weighing scales calibrated every morning. No weight loss during cleaning.</span>
        </div>
        <span className="italic">Net raw cleaned weight supplied</span>
      </div>
    </div>
  );
};
