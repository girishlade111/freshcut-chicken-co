import React from 'react';
import { ShieldCheck, Snowflake, Award, Heart, CheckCircle2, MapPin } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';
import { IMAGES } from '../config/images';
import { Button } from '../components/ui/Button';

export const AboutView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-[#EBF3EE] text-[#2F5D46] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>Our Butchery Heritage & Standards</span>
        </div>
        <h1 className="font-serif-display font-extrabold text-3xl md:text-5xl text-[#1B1512] leading-tight">
          Where Honest Butchery Meets Modern Cold-Chain Science.
        </h1>
        <p className="text-xs sm:text-sm text-[#5E524C] leading-relaxed">
          {SHOP_CONFIG.shopName} was started in {SHOP_CONFIG.city} with one simple observation: fresh meat in Indian wet markets is often exposed to open heat, flies, and uncalibrated weighing scales. We set out to build a modern butcher counter worthy of the food you cook for the people you love.
        </p>
      </div>

      {/* Story & Visual split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#5E524C] leading-relaxed">
          <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-[#1B1512]">
            Never Stored. Never Chemically Washed.
          </h2>
          <p>
            Unlike supermarket packaged poultry that sits in gas-flushed trays for 5 to 7 days, we never keep pre-cut meat in inventory. When your order is placed, an artisan butcher selects a bird, washes it with chilled RO water at 4°C, and hand-carves it to your exact specification.
          </p>
          <p>
            Our poultry is sourced exclusively from certified bio-secure farms in Baramati and Saswad, raised on natural grain feed with zero antibiotics, growth hormones, or chemical feeds.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FBF6EE] rounded-xl border border-[#1B1512]/10 font-bold text-[#1B1512]">
              100% Net Weight Supplied
            </div>
            <div className="p-3 bg-[#FBF6EE] rounded-xl border border-[#1B1512]/10 font-bold text-[#1B1512]">
              Zero Chemical Preservatives
            </div>
            <div className="p-3 bg-[#FBF6EE] rounded-xl border border-[#1B1512]/10 font-bold text-[#1B1512]">
              FSSAI Tested Daily
            </div>
            <div className="p-3 bg-[#FBF6EE] rounded-xl border border-[#1B1512]/10 font-bold text-[#1B1512]">
              Chilled 0-4°C Cold Chain
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border-2 border-[#1B1512] shadow-xl aspect-4/3">
            <img
              src={IMAGES.heroButcher}
              alt="Artisanal butchery station"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="bg-[#1B1512] text-[#FBF6EE] rounded-3xl p-8 md:p-12 border border-[#342A24] space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#F2A33A] uppercase tracking-widest">
            The FreshCut Standard
          </span>
          <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-white">
            Our Four Non-Negotiables
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="bg-[#261E1A] p-5 rounded-2xl border border-[#3D312A] space-y-2">
            <div className="text-sm font-bold text-[#F2A33A]">1. Bio-Secure Farms</div>
            <p className="text-[#FBF6EE]/75 leading-relaxed">
              Birds are raised in airy, cage-free shelters with natural light, clean drinking water, and strictly vegetarian nutrition.
            </p>
          </div>

          <div className="bg-[#261E1A] p-5 rounded-2xl border border-[#3D312A] space-y-2">
            <div className="text-sm font-bold text-[#F2A33A]">2. Calibrated Weighing</div>
            <p className="text-[#FBF6EE]/75 leading-relaxed">
              We weigh strictly after deskinning and thorough washing. If you order 1 kg, you receive 1,000 grams of clean meat for your pot.
            </p>
          </div>

          <div className="bg-[#261E1A] p-5 rounded-2xl border border-[#3D312A] space-y-2">
            <div className="text-sm font-bold text-[#F2A33A]">3. Cold RO Water</div>
            <p className="text-[#FBF6EE]/75 leading-relaxed">
              We never use municipal tap water with chlorine. Only reverse-osmosis purified water chilled to 4°C touches our butchery line.
            </p>
          </div>

          <div className="bg-[#261E1A] p-5 rounded-2xl border border-[#3D312A] space-y-2">
            <div className="text-sm font-bold text-[#F2A33A]">4. Express Transit</div>
            <p className="text-[#FBF6EE]/75 leading-relaxed">
              Dispatched with food-grade gel ice in double-sealed thermal bags so meat temperature never rises above 4°C during transit.
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Button variant="primary" size="lg" onClick={() => onNavigate('shop')}>
            Taste the FreshCut Difference
          </Button>
        </div>
      </div>
    </div>
  );
};
