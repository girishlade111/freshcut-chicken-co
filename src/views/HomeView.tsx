import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Clock,
  Truck,
  Snowflake,
  Flame,
  CheckCircle2,
  Calendar,
  Star,
  ChevronRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';
import { IMAGES } from '../config/images';
import { useLanguage } from '../i18n/LanguageContext';
import { useRatesStore } from '../store/useRatesStore';
import { usePincodeStore } from '../store/usePincodeStore';
import { RECIPES, REVIEWS } from '../data/mockData';
import { RateBoard } from '../components/shop/RateBoard';
import { ProductCard } from '../components/shop/ProductCard';
import { CutsDiagramHotspots } from '../components/shop/CutsDiagramHotspots';
import { Button } from '../components/ui/Button';
import { Stamp } from '../components/ui/Stamp';
import { Marquee } from '../components/ui/Marquee';
import { Product } from '../types';

interface HomeViewProps {
  onNavigate: (view: string, param?: string) => void;
  onQuickView: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onQuickView }) => {
  const { language, t } = useLanguage();
  const { products } = useRatesStore();
  const { currentPincode, areaName, openModal } = usePincodeStore();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Categories config
  const categories = [
    { id: 'chicken', label: 'Fresh Chicken', labelMr: 'ताजे चिकन', count: '10 cuts', image: IMAGES.categoryChicken },
    { id: 'country', label: 'Gavran Country', labelMr: 'गावरान गावठी', count: 'Free range', image: IMAGES.categoryCountry },
    { id: 'mutton', label: 'Tender Mutton', labelMr: 'बोकडाचे मटण', count: 'Prime cuts', image: IMAGES.categoryMutton },
    { id: 'eggs', label: 'Farm Fresh Eggs', labelMr: 'फार्म अंडी', count: 'Daily batch', image: IMAGES.categoryEggs },
    { id: 'marinated', label: 'Marinated Ready-to-Cook', labelMr: 'मॅरीनेटेड कबाब', count: '15-min prep', image: IMAGES.categoryMarinated },
    { id: 'combos', label: 'Sunday Combos', labelMr: 'संडे महाकॉम्बो', count: 'Save up to ₹80', image: IMAGES.categoryCombos },
  ];

  // Bestsellers & Fresh Today grids
  const bestsellers = products.filter((p) =>
    p.badges.some((b) => b.variant === 'bestseller')
  ).slice(0, 4);

  const freshToday = products.filter((p) =>
    p.badges.some((b) => b.variant === 'fresh' || b.variant === 'chef_special')
  ).slice(0, 6);

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* 1. Editorial Hero Section */}
      <section className="relative overflow-hidden pt-6 md:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust stamp chip */}
              <div className="inline-flex items-center gap-2 bg-[#EBF3EE] border border-[#2F5D46]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#2F5D46]">
                <span className="w-2 h-2 rounded-full bg-[#2F5D46] animate-pulse" />
                <span>Zero Frozen Inventory · Never Chemically Washed</span>
              </div>

              {/* Main Display Headline */}
              <h1 className="font-serif-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1B1512] leading-[1.08] tracking-tight">
                {language === 'mr' ? (
                  <>
                    मागणीनंतरच ताजे कटिंग.{' '}
                    <span className="italic text-[#C8262B]">चहा थंड व्हायच्या आत</span> तुमच्या दारात.
                  </>
                ) : (
                  <>
                    Cut fresh to order.{' '}
                    <span className="italic text-[#C8262B]">At your door</span> before the chai gets cold.
                  </>
                )}
              </h1>

              {/* Subcopy */}
              <p className="text-base sm:text-lg text-[#5E524C] leading-relaxed max-w-xl">
                {t('heroSub')}
              </p>

              {/* Pincode & Express Delivery Status Bar */}
              <div className="bg-[#F4ECE0] p-3.5 rounded-2xl border border-[#1B1512]/10 flex flex-wrap items-center justify-between gap-3 max-w-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C8262B] text-white flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1B1512]">
                      60-Min Express In {areaName || SHOP_CONFIG.city}
                    </div>
                    <div className="text-[11px] text-[#5E524C]">
                      Chilled 0-4°C Cold Chain to PIN {currentPincode}
                    </div>
                  </div>
                </div>

                <button
                  onClick={openModal}
                  className="text-xs font-bold text-[#C8262B] hover:underline cursor-pointer"
                >
                  Change PIN →
                </button>
              </div>

              {/* Dual Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('shop')}
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {t('shopFreshCuts')}
                </Button>

                <a
                  href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Hello ${SHOP_CONFIG.shopName}, I'd like to place an order for fresh chicken/mutton today.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-base font-bold rounded-xl shadow-sm transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#1B1512]/10 text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#1B1512]">
                  <ShieldCheck className="w-4 h-4 text-[#2F5D46]" />
                  <span>FSSAI Certified</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-[#1B1512]">
                  <Snowflake className="w-4 h-4 text-[#2F5D46]" />
                  <span>Never Frozen</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-[#1B1512]">
                  <Clock className="w-4 h-4 text-[#2F5D46]" />
                  <span>Cut to Order</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-[#1B1512]">
                  <Award className="w-4 h-4 text-[#2F5D46]" />
                  <span>Antibiotic-Free</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual with Rubber Stamp and Today's Rate Teaser */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#1B1512] shadow-2xl bg-[#1B1512]">
                <img
                  src={IMAGES.heroButcher}
                  alt="Fresh Raw Chicken Cuts on Butcher Block"
                  className="w-full aspect-4/5 object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Floating Rubber Stamp Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <Stamp text="FRESH TODAY" subtext="CUT AT 6 AM" color="saffron" rotation={12} size="md" />
                </div>

                {/* Bottom Floating Live Rates Mini-Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#1B1512]/15 shadow-xl text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-[#1B1512]">
                    <span className="flex items-center gap-1.5 text-[#C8262B]">
                      <span className="w-2 h-2 rounded-full bg-[#C8262B] animate-ping" />
                      <span>Today's Morning Rates</span>
                    </span>
                    <span className="text-[#5E524C] font-normal text-[11px]">7:30 AM Mandi</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-[#FBF6EE] p-2 rounded-xl border border-[#1B1512]/5">
                      <div className="text-[10px] text-[#5E524C]">Curry Cut (Skin-on)</div>
                      <div className="font-serif-display font-extrabold text-sm text-[#1B1512]">
                        ₹210 <span className="font-sans font-normal text-[10px]">/kg</span>
                      </div>
                    </div>
                    <div className="bg-[#FBF6EE] p-2 rounded-xl border border-[#1B1512]/5">
                      <div className="text-[10px] text-[#5E524C]">Boneless Breast</div>
                      <div className="font-serif-display font-extrabold text-sm text-[#1B1512]">
                        ₹380 <span className="font-sans font-normal text-[10px]">/kg</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const el = document.getElementById('rates-board-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-center text-[11px] font-bold text-[#C8262B] hover:underline pt-1 cursor-pointer"
                  >
                    View All Live Rates & Stocks →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Strip */}
      <Marquee />

      {/* 2. Today's Rate Board Section */}
      <section id="rates-board-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <RateBoard
          onSelectProduct={(slug) => onNavigate('product', slug)}
        />
      </section>

      {/* 3. Category Tiles with Hover Effects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
              {t('categoriesTitle')}
            </span>
            <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-[#1B1512] mt-0.5">
              Curated for the Indian Kitchen
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#1B1512] hover:text-[#C8262B] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop', cat.id)}
              className="group bg-white rounded-2xl p-3 border border-[#1B1512]/10 shadow-xs hover:shadow-md hover:border-[#C8262B]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-[#F4ECE0] mb-2.5">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-serif-display font-bold text-sm text-[#1B1512] group-hover:text-[#C8262B] transition-colors leading-tight">
                  {language === 'mr' ? cat.labelMr : cat.label}
                </h3>
                <span className="text-[10px] text-[#5E524C] mt-0.5 block">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Freshly Cut Today & Bestsellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#1B1512]/10 pb-4">
          <div>
            <span className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
              {t('bestsellersTitle')}
            </span>
            <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-[#1B1512] mt-0.5">
              Morning Arrivals & Top Cuts
            </h2>
          </div>
          <Button variant="outline" size="sm" onClick={() => onNavigate('shop')}>
            See Entire Counter ({products.length} cuts)
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {freshToday.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onNavigateToDetail={(slug) => onNavigate('product', slug)}
            />
          ))}
        </div>
      </section>

      {/* 5. Signature Interactive Cuts Guide Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <CutsDiagramHotspots
          onNavigateToDetail={(slug) => onNavigate('product', slug)}
        />
      </section>

      {/* 6. Farm to Your Door 4-Hour Timeline */}
      <section className="bg-[#1B1512] text-[#FBF6EE] py-14 md:py-20 rounded-3xl max-w-7xl mx-auto px-6 md:px-12 border border-[#3D312A] relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-[#F2A33A] uppercase tracking-widest">
            {t('farmToDoorTitle')}
          </span>
          <h2 className="font-serif-display font-bold text-3xl md:text-4xl text-white">
            How We Beat the Wet Market & Supermarkets
          </h2>
          <p className="text-xs md:text-sm text-[#FBF6EE]/75 leading-relaxed">
            Supermarket chicken sits in gas-flushed trays for 4 to 6 days. Wet markets lack cold chains and expose meat to dust and heat. FreshCut operates on a just-in-time cold butcher model.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {[
            {
              step: '01',
              time: '05:00 AM',
              title: 'Ethically Sourced',
              desc: 'From bio-secure poultry partners within 60km. Zero antibiotic residues.',
            },
            {
              step: '02',
              time: '06:00 AM',
              title: 'RO Purification',
              desc: 'Cavity scrubbed & washed with cold RO purified water. Zero chlorinated odor.',
            },
            {
              step: '03',
              time: 'On Order',
              title: 'Precision Carving',
              desc: 'Master butchers cut strictly upon receiving your order on color-coded boards.',
            },
            {
              step: '04',
              time: 'Immediate',
              title: 'Chilled Pack 0-4°C',
              desc: 'Sealed with food-grade moisture pads and reusable ice-gel pouches.',
            },
            {
              step: '05',
              time: '45-60 Mins',
              title: 'At Your Doorstep',
              desc: 'Express delivery riders ensure meat arrives ice-cold and ready for the pan.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#261E1A] p-5 rounded-2xl border border-[#3D312A] relative flex flex-col justify-between hover:border-[#F2A33A]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif-display font-bold text-2xl text-[#C8262B]">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-bold text-[#F2A33A] bg-white/5 px-2 py-0.5 rounded">
                    {item.time}
                  </span>
                </div>
                <h3 className="font-serif-display font-bold text-base text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#FBF6EE]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Hygiene & Quality: Cleanliness Protocol & Live Cam */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#F4ECE0] rounded-3xl p-6 md:p-10 border border-[#1B1512]/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
                {t('hygieneTitle')}
              </span>
              <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-[#1B1512]">
                A Butcher Shop You Would Happily Invite Your Mother To
              </h2>
              <p className="text-xs sm:text-sm text-[#5E524C] leading-relaxed">
                Most meat shops in India carry a heavy odor because bacteria multiplies rapidly at room temperature. At FreshCut, our entire prep facility operates at a constant 8°C with HEPA air filters.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Stainless steel surgical cutting stations sanitized every 45 minutes.',
                  'Cold RO water washing prevents bacterial proliferation.',
                  'Daily laboratory swabs for Salmonella and E. Coli.',
                  'FSSAI central testing standards with digital batch logs.',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#1B1512]">
                    <CheckCircle2 className="w-4 h-4 text-[#2F5D46] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Button variant="secondary" size="md" onClick={() => onNavigate('about')}>
                  Read Our Hygiene Blueprint & Certifications
                </Button>
              </div>
            </div>

            {/* Live Prep Station Cam visual */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#1B1512] shadow-xl bg-black aspect-16/10">
                <img
                  src={IMAGES.hygieneShopCam}
                  alt="Hygienic Clean Room Preparation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#C8262B] animate-ping" />
                  <span>PREP ROOM CAM · CHILLED AT 8°C</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold text-[#1B1512]">
                  STATION SANITIZED: 12 MINS AGO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Sunday Chicken Subscription Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#C8262B] text-white rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3 z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('sundayPlanTitle')}</span>
            </div>
            <h2 className="font-serif-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Never Wait in Line on Sunday Morning Again.
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Set your weekly standing order: choose your favourite cut (Curry Cut, Boneless or Gavran), pick your delivery slot between 7:30 AM and 10:30 AM, and enjoy guaranteed 10% lower prices every weekend. Pause or cancel anytime in 1 tap.
            </p>
            <div className="pt-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => onNavigate('subscribe')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Set Up Sunday Order (10% Off)
              </Button>
            </div>
          </div>

          <div className="shrink-0 bg-white text-[#1B1512] rounded-2xl p-6 shadow-2xl max-w-xs w-full text-center space-y-3 z-10">
            <div className="text-xs uppercase font-bold text-[#5E524C] tracking-wider">
              Sunday Standing Plan
            </div>
            <div className="font-serif-display font-bold text-3xl text-[#C8262B]">
              ₹189 <span className="text-xs font-sans text-[#5E524C]">/kg</span>
            </div>
            <p className="text-[11px] text-[#5E524C]">
              Includes 1 kg fresh curry cut + 6 farm eggs + priority 8:00 AM delivery slot.
            </p>
            <Button
              fullWidth
              variant="primary"
              size="sm"
              onClick={() => onNavigate('subscribe')}
            >
              Start Subscription
            </Button>
          </div>
        </div>
      </section>

      {/* 9. Chef Recipes Highlights with 1-Click Bundle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#1B1512]/10 pb-4">
          <div>
            <span className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
              {t('recipesTitle')}
            </span>
            <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-[#1B1512] mt-0.5">
              Cook Authentic Regional Curries & Kebabs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('recipes')}
            className="text-xs font-bold text-[#1B1512] hover:text-[#C8262B] flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All 6 Recipes</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECIPES.slice(0, 3).map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onNavigate('recipes', recipe.slug)}
              className="group bg-white rounded-2xl border border-[#1B1512]/10 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#F4ECE0]">
                <img
                  src={recipe.image}
                  alt={recipe.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#5E524C] mb-1.5">
                    <span className="text-[#C8262B]">{recipe.difficulty}</span>
                    <span>·</span>
                    <span>{recipe.prepTime} Prep</span>
                    <span>·</span>
                    <span>{recipe.servings}</span>
                  </div>

                  <h3 className="font-serif-display font-bold text-lg text-[#1B1512] group-hover:text-[#C8262B] transition-colors leading-snug">
                    {language === 'mr' ? recipe.titleMr : recipe.titleEn}
                  </h3>
                  <p className="text-xs text-[#5E524C] line-clamp-2 mt-1.5">
                    {recipe.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1B1512]/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C8262B]">
                    View Recipe & Ingredients →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Verified Customer Reviews Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#F2A33A]/20 text-[#8F5608] px-3 py-1 rounded-full text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-[#8F5608]" />
            <span>4.9 / 5 on Google Reviews ({SHOP_CONFIG.socials.totalReviews}+ ratings)</span>
          </div>
          <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-[#1B1512]">
            {t('reviewsTitle')}
          </h2>
          <p className="text-xs text-[#5E524C]">
            Real feedback from meat enthusiasts, home cooks, and nutritionists across {SHOP_CONFIG.city}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-5 border border-[#1B1512]/10 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center gap-1 text-[#F2A33A] mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#1B1512] italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#1B1512]/5">
                <div className="font-bold text-xs text-[#1B1512]">{rev.customerName}</div>
                <div className="text-[11px] text-[#5E524C]">{rev.location}</div>
                {rev.dishPrepared && (
                  <div className="text-[10px] text-[#2F5D46] font-semibold mt-0.5">
                    Prepared: {rev.dishPrepared}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Final CTA WhatsApp Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1B1512] text-[#FBF6EE] rounded-3xl p-8 md:p-12 text-center space-y-4 border border-[#342A24] relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#F2A33A] uppercase tracking-widest">
              Ready for Lunch or Dinner?
            </span>
            <h2 className="font-serif-display font-bold text-3xl md:text-4xl text-white">
              Order on WhatsApp or Shop Online in 60 Seconds
            </h2>
            <p className="text-xs sm:text-sm text-[#FBF6EE]/75">
              Call us directly at <a href={`tel:${SHOP_CONFIG.phone}`} className="underline font-bold text-white">{SHOP_CONFIG.phone}</a> or send your cut preferences on WhatsApp for instant confirmation.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('shop')}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Shop Online
              </Button>
              <a
                href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  `Hello ${SHOP_CONFIG.shopName}, I'm looking to order fresh cuts for today.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
