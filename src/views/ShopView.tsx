import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, X, Tag } from 'lucide-react';
import { useRatesStore } from '../store/useRatesStore';
import { useLanguage } from '../i18n/LanguageContext';
import { ProductCard } from '../components/shop/ProductCard';
import { Product } from '../types';

interface ShopViewProps {
  initialCategory?: string;
  onNavigate: (view: string, param?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  initialCategory = 'all',
  onNavigate,
  onQuickView,
}) => {
  const { products } = useRatesStore();
  const { language, t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');
  const [selectedCutFilter, setSelectedCutFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Cuts', labelMr: 'सर्व कट्स' },
    { id: 'chicken', label: 'Fresh Chicken', labelMr: 'ताजे चिकन' },
    { id: 'country', label: 'Country / Gavran', labelMr: 'गावरान चिकन' },
    { id: 'mutton', label: 'Mutton / Goat', labelMr: 'बोकडाचे मटण' },
    { id: 'eggs', label: 'Eggs', labelMr: 'अंडी' },
    { id: 'marinated', label: 'Marinated', labelMr: 'मॅरीनेटेड' },
    { id: 'combos', label: 'Sunday Combos', labelMr: 'संडे कॉम्बो' },
  ];

  const cutStyles = [
    'all',
    'Curry Cut',
    'Boneless',
    'Biryani Cut',
    'Keema / Mince',
    'Drumsticks',
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category match
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        // Cut style match
        if (selectedCutFilter !== 'all' && !p.availableCuts.includes(selectedCutFilter as any))
          return false;
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName =
            p.nameEn.toLowerCase().includes(q) || p.nameMr.toLowerCase().includes(q);
          const matchDesc = p.descriptionEn.toLowerCase().includes(q);
          if (!matchName && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.pricePerKg - b.pricePerKg;
        if (sortBy === 'price_desc') return b.pricePerKg - a.pricePerKg;
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedCutFilter, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#1B1512]/10 pb-6">
        <span className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
          The Butcher Counter
        </span>
        <h1 className="font-serif-display font-bold text-3xl md:text-4xl text-[#1B1512] mt-1">
          {language === 'mr' ? 'सर्व ताजे कट्स आणि दर' : 'Fresh Cleaned Cuts & Live Rates'}
        </h1>
        <p className="text-xs sm:text-sm text-[#5E524C] mt-1 max-w-2xl">
          Every cut is weighed after thorough cleaning so you never pay for feathers or excess fat. Carved fresh only upon order confirmation.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1B1512] text-white shadow-xs'
                  : 'bg-white border border-[#1B1512]/15 text-[#5E524C] hover:bg-[#1B1512]/5'
              }`}
            >
              {language === 'mr' ? cat.labelMr : cat.label}
            </button>
          ))}
        </div>

        {/* Search, Cut Filter & Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#5E524C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chicken breast, mutton raan, biryani cuts..."
              className="w-full bg-white border border-[#1B1512]/15 rounded-xl pl-10 pr-8 py-2.5 text-xs text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5E524C]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cut style filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCutFilter}
              onChange={(e) => setSelectedCutFilter(e.target.value)}
              className="w-full bg-white border border-[#1B1512]/15 rounded-xl px-3 py-2.5 text-xs text-[#1B1512] focus:outline-none focus:border-[#C8262B] cursor-pointer"
            >
              <option value="all">All Cut Preparations</option>
              {cutStyles
                .filter((c) => c !== 'all')
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-white border border-[#1B1512]/15 rounded-xl px-3 py-2.5 text-xs text-[#1B1512] focus:outline-none focus:border-[#C8262B] cursor-pointer"
            >
              <option value="featured">Sort: Butcher Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Counter & Active Filters Display */}
      <div className="flex items-center justify-between text-xs text-[#5E524C]">
        <div>
          Showing <b>{filteredProducts.length}</b> premium cuts
        </div>
        {(selectedCategory !== 'all' || selectedCutFilter !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCutFilter('all');
              setSearchQuery('');
            }}
            className="text-[#C8262B] font-semibold hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onNavigateToDetail={(slug) => onNavigate('product', slug)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#1B1512]/10 space-y-3">
          <h3 className="font-serif-display font-bold text-xl text-[#1B1512]">
            No Cuts Matching Your Filter
          </h3>
          <p className="text-xs text-[#5E524C]">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCutFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#1B1512] text-white text-xs font-semibold rounded-xl"
          >
            View All Cuts
          </button>
        </div>
      )}
    </div>
  );
};
