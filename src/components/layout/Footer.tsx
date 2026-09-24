import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { SHOP_CONFIG } from '../../config/shop';
import { useLanguage } from '../../i18n/LanguageContext';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1B1512] text-[#FBF6EE] pt-14 pb-20 md:pb-12 border-t-4 border-[#C8262B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Newsletter Strip */}
        <div className="bg-[#261E1A] rounded-2xl p-6 md:p-8 mb-12 border border-[#3D312A] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="flex items-center gap-2 text-[#F2A33A] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>The Sunday Meat Letter</span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif-display font-bold text-white">
              Get Sunday morning rates & secret chef cuts.
            </h3>
            <p className="text-xs text-[#FBF6EE]/70 mt-1">
              Join 3,400+ foodies in {SHOP_CONFIG.city}. Exclusive holiday recipes, Gavran stock alerts & ₹50 welcome coupon.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="bg-[#2F5D46] text-white p-3 rounded-xl text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're in! Use coupon code <b>FIRST50</b> on your first cut.</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#1B1512] border border-[#3D312A] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#FBF6EE]/40 focus:outline-none focus:border-[#F2A33A]"
                />
                <button
                  type="submit"
                  className="bg-[#C8262B] hover:bg-[#9E191E] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Trust */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C8262B] flex items-center justify-center text-white font-serif-display font-bold text-lg">
                FC
              </div>
              <span className="font-serif-display font-bold text-xl text-white">
                {SHOP_CONFIG.shopName}
              </span>
            </div>
            <p className="text-xs text-[#FBF6EE]/70 leading-relaxed max-w-sm">
              {SHOP_CONFIG.tagline} We believe good food starts with honest butchery. Sourced from cage-free bio-secure farms, custom-carved to order and rushed in chilled 0-4°C cold packs.
            </p>

            {/* FSSAI Notice */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 max-w-sm">
              <ShieldCheck className="w-6 h-6 text-[#2F5D46] shrink-0" />
              <div>
                <div className="text-[11px] font-bold text-white">
                  FSSAI License: {SHOP_CONFIG.fssaiNumber}
                </div>
                <div className="text-[10px] text-[#FBF6EE]/60">
                  {SHOP_CONFIG.fssaiNote}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-serif-display font-bold text-[#F2A33A] uppercase tracking-wider">
              Fresh Meat & Cuts
            </h4>
            <ul className="space-y-2 text-[#FBF6EE]/75">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Chicken Curry Cuts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Boneless Breast & Thigh
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Gavran Desi Chicken
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Tender Male Goat Mutton
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Pre-Marinated Kebabs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cuts')} className="hover:text-[#F2A33A] font-semibold transition-colors cursor-pointer">
                  Interactive Cuts Anatomy ✦
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Rituals */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-serif-display font-bold text-[#F2A33A] uppercase tracking-wider">
              Shop & Services
            </h4>
            <ul className="space-y-2 text-[#FBF6EE]/75">
              <li>
                <button onClick={() => onNavigate('subscribe')} className="hover:text-white transition-colors cursor-pointer">
                  Sunday Chicken Subscription
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bulk')} className="hover:text-white transition-colors cursor-pointer">
                  Hotel & Catering Wholesale
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-white transition-colors cursor-pointer">
                  Master Butcher Recipes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  Our Butchery Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Store Locator & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-white transition-colors cursor-pointer">
                  Live Order Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Store Hours & Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-serif-display font-bold text-[#F2A33A] uppercase tracking-wider">
              Butcher Store
            </h4>
            <div className="space-y-2 text-[#FBF6EE]/75">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8262B] shrink-0 mt-0.5" />
                <span>{SHOP_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F2A33A] shrink-0" />
                <span>Open {SHOP_CONFIG.openingHours.days}: {SHOP_CONFIG.openingHours.open} - {SHOP_CONFIG.openingHours.close}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2F5D46] shrink-0" />
                <a href={`tel:${SHOP_CONFIG.phone}`} className="hover:underline">
                  {SHOP_CONFIG.phone}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C8262B]/20 text-[#F2A33A] border border-[#C8262B]/40 rounded-lg font-semibold hover:bg-[#C8262B]/30 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Open Demo Admin (PIN: 1234)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pune Delivery Areas Strip */}
        <div className="pt-6 pb-6 border-t border-white/10 text-xs text-[#FBF6EE]/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-white">Serving Pune Neighborhoods:</span>
            {SHOP_CONFIG.deliveryAreas.map((area, idx) => (
              <span key={area.pincode} className="hover:text-white transition-colors">
                {area.name} ({area.pincode}){idx < SHOP_CONFIG.deliveryAreas.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Badges */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FBF6EE]/50">
          <div>
            © {new Date().getFullYear()} {SHOP_CONFIG.shopName}. Crafted for client pitch presentation.
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#FBF6EE]/40">Accepted Payments:</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/70">
              <span className="px-2 py-0.5 bg-white/10 rounded">UPI</span>
              <span className="px-2 py-0.5 bg-white/10 rounded">GPay</span>
              <span className="px-2 py-0.5 bg-white/10 rounded">PhonePe</span>
              <span className="px-2 py-0.5 bg-white/10 rounded">Cash on Delivery</span>
              <span className="px-2 py-0.5 bg-white/10 rounded">Cards</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
