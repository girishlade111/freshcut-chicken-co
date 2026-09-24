import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  MapPin,
  Menu,
  X,
  Phone,
  MessageSquare,
  Globe,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { SHOP_CONFIG } from '../../config/shop';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCartStore } from '../../store/useCartStore';
import { usePincodeStore } from '../../store/usePincodeStore';
import { useRatesStore } from '../../store/useRatesStore';
import { Button } from '../ui/Button';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { language, setLanguage, t, languages } = useLanguage();
  const { openCart, getItemCount, getTotal } = useCartStore();
  const { currentPincode, areaName, openModal } = usePincodeStore();
  const { products } = useRatesStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const cartCount = getItemCount();
  const cartTotal = getTotal();

  // Filtered products for search
  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.nameMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', labelKey: 'navShop', defaultLabel: 'Shop' },
    { id: 'cuts', labelKey: 'navCuts', defaultLabel: 'Cuts Guide' },
    { id: 'subscribe', labelKey: 'navSubscribe', defaultLabel: 'Sunday Sub' },
    { id: 'bulk', labelKey: 'navBulk', defaultLabel: 'Bulk & Hotels' },
    { id: 'recipes', labelKey: 'navRecipes', defaultLabel: 'Recipes' },
    { id: 'about', labelKey: 'navStory', defaultLabel: 'Our Story' },
    { id: 'contact', labelKey: 'navContact', defaultLabel: 'Store & Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF6EE]/95 backdrop-blur-md border-b border-[#1B1512]/10 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2 md:gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-[#C8262B] flex items-center justify-center text-[#FBF6EE] font-serif-display font-extrabold text-xl shadow-xs group-hover:bg-[#9E191E] transition-colors relative">
                <span>FC</span>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#F2A33A] rounded-full border-2 border-[#FBF6EE]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display font-bold text-lg md:text-xl text-[#1B1512] leading-tight tracking-tight">
                  {SHOP_CONFIG.shopName}
                </span>
                <span className="text-[10px] text-[#5E524C] tracking-wider uppercase font-medium hidden sm:block">
                  {SHOP_CONFIG.city} · Artisanal Meat Co.
                </span>
              </div>
            </button>

            {/* Pincode badge on desktop */}
            <button
              onClick={openModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#1B1512]/5 hover:bg-[#1B1512]/10 rounded-xl text-xs font-medium text-[#1B1512] transition-colors cursor-pointer border border-[#1B1512]/5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8262B]" />
              <span className="max-w-[120px] truncate">{areaName || currentPincode}</span>
              <ChevronDown className="w-3 h-3 text-[#5E524C]" />
            </button>
          </div>

          {/* Desktop Search Bar with Instant Dropdown */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative">
            <div className="w-full relative">
              <Search className="w-4 h-4 text-[#5E524C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                placeholder="Search chicken, mutton, biryani cuts..."
                className="w-full bg-white/80 border border-[#1B1512]/15 rounded-xl pl-9 pr-8 py-2 text-xs text-[#1B1512] placeholder-[#5E524C]/60 focus:bg-white focus:outline-none focus:border-[#C8262B] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#5E524C]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {isSearchOpen && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-[#1B1512]/10 p-2 z-50 animate-in fade-in duration-150">
                {filteredProducts.length > 0 ? (
                  <div className="divide-y divide-[#1B1512]/5">
                    {filteredProducts.map((prod) => (
                      <button
                        key={prod.id}
                        onClick={() => {
                          onNavigate('product', prod.slug);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center justify-between p-2 hover:bg-[#FBF6EE] rounded-lg text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={prod.image}
                            alt={prod.nameEn}
                            className="w-9 h-9 object-cover rounded-lg"
                          />
                          <div>
                            <div className="text-xs font-semibold text-[#1B1512]">
                              {language === 'mr' ? prod.nameMr : prod.nameEn}
                            </div>
                            <div className="text-[11px] text-[#5E524C]">
                              {prod.piecesCountPerKg || prod.category}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-bold text-[#C8262B]">
                          ₹{prod.pricePerKg} <span className="text-[10px] font-normal text-[#5E524C]">/kg</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-[#5E524C]">
                    No cuts found for "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#1B1512]/15 text-xs font-medium text-[#1B1512] hover:bg-white transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#C8262B]" />
                <span className="uppercase font-semibold">{language}</span>
                <ChevronDown className="w-3 h-3 text-[#5E524C]" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-[#1B1512]/10 py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                        language === l.code
                          ? 'bg-[#C8262B]/10 text-[#C8262B] font-bold'
                          : 'text-[#1B1512] hover:bg-[#FBF6EE]'
                      }`}
                    >
                      <span>{l.name}</span>
                      <span className="text-[11px] opacity-75">{l.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp Quick Order Button */}
            <a
              href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                `Hello ${SHOP_CONFIG.shopName}, I would like to order fresh cuts today.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Order</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3 py-2 bg-[#1B1512] hover:bg-[#342A24] text-[#FBF6EE] rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer relative"
            >
              <ShoppingBag className="w-4 h-4 text-[#F2A33A]" />
              <span className="hidden md:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-[#C8262B] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
              {cartTotal > 0 && (
                <span className="hidden lg:inline text-xs text-[#FBF6EE]/90 pl-1 border-l border-white/20">
                  ₹{cartTotal}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#1B1512] hover:bg-[#1B1512]/5 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Secondary Navigation Bar */}
        <nav className="hidden md:flex items-center justify-start space-x-1 lg:space-x-6 py-2 border-t border-[#1B1512]/5 text-xs font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                currentView === link.id
                  ? 'text-[#C8262B] font-bold bg-[#C8262B]/10'
                  : 'text-[#5E524C] hover:text-[#1B1512] hover:bg-[#1B1512]/5'
              }`}
            >
              {t(link.labelKey as any) || link.defaultLabel}
            </button>
          ))}
          <button
            onClick={() => onNavigate('track')}
            className={`ml-auto px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-xs ${
              currentView === 'track'
                ? 'text-[#C8262B] font-bold bg-[#C8262B]/10'
                : 'text-[#5E524C] hover:text-[#1B1512]'
            }`}
          >
            {t('navTrack')}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FBF6EE] border-b border-[#1B1512]/15 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          {/* Mobile Search input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#5E524C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chicken cuts..."
              className="w-full bg-white border border-[#1B1512]/15 rounded-xl pl-9 pr-4 py-2 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left p-2.5 rounded-xl text-xs font-semibold ${
                  currentView === link.id
                    ? 'bg-[#C8262B] text-white'
                    : 'bg-white/80 text-[#1B1512] border border-[#1B1512]/10'
                }`}
              >
                {t(link.labelKey as any) || link.defaultLabel}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('track');
                setIsMobileMenuOpen(false);
              }}
              className="text-left p-2.5 rounded-xl text-xs font-semibold bg-white/80 text-[#1B1512] border border-[#1B1512]/10"
            >
              {t('navTrack')}
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setIsMobileMenuOpen(false);
              }}
              className="text-left p-2.5 rounded-xl text-xs font-semibold bg-[#1B1512] text-[#FBF6EE]"
            >
              Demo Admin Panel (1234)
            </button>
          </div>

          <div className="pt-2 border-t border-[#1B1512]/10 flex items-center justify-between text-xs text-[#5E524C]">
            <button onClick={openModal} className="flex items-center gap-1 font-medium text-[#C8262B]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location: {areaName} ({currentPincode})</span>
            </button>
            <a href={`tel:${SHOP_CONFIG.phone}`} className="flex items-center gap-1 text-[#1B1512]">
              <Phone className="w-3.5 h-3.5" />
              <span>Call Store</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
