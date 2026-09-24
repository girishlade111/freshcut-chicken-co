import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Egg,
  ShieldCheck,
  PauseCircle,
  PlayCircle,
  XCircle,
} from 'lucide-react';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
import { useLanguage } from '../i18n/LanguageContext';
import { SHOP_CONFIG } from '../config/shop';
import { Button } from '../components/ui/Button';
import { CutStyle, SkinOption } from '../types';

interface SubscribeViewProps {
  onNavigate: (view: string) => void;
}

export const SubscribeView: React.FC<SubscribeViewProps> = ({ onNavigate }) => {
  const { subscriptions, addSubscription, toggleSubscription, removeSubscription } =
    useSubscriptionStore();
  const { language } = useLanguage();

  const [selectedPlanKey, setSelectedPlanKey] = useState<
    'curry_cut_1kg' | 'boneless_breast_500g' | 'gavran_country_1kg'
  >('curry_cut_1kg');
  const [frequency, setFrequency] = useState<'Weekly' | 'Bi-Weekly'>('Weekly');
  const [slot, setSlot] = useState<string>('07:30 AM - 09:00 AM');
  const [eggsAddon, setEggsAddon] = useState<number>(6); // 0, 6, 12
  const [spiceAddon, setSpiceAddon] = useState<boolean>(true);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Pricing calculation
  const planOptions: Record<
    string,
    {
      titleEn: string;
      titleMr: string;
      productId: string;
      weightGrams: number;
      cutStyle: CutStyle;
      skinOption: SkinOption;
      price: number;
      normalPrice: number;
    }
  > = {
    curry_cut_1kg: {
      titleEn: '1kg Chicken Curry Cut (Fresh)',
      titleMr: '१ किलो ताजे चिकन करी कट',
      productId: 'prod-1',
      weightGrams: 1000,
      cutStyle: 'Curry Cut',
      skinOption: 'with_skin',
      price: 195,
      normalPrice: 220,
    },
    boneless_breast_500g: {
      titleEn: '500g Tender Boneless Breast',
      titleMr: '५०० ग्रॅम बोनलेस ब्रेस्ट फिलेट',
      productId: 'prod-2',
      weightGrams: 500,
      cutStyle: 'Boneless Cubes',
      skinOption: 'skinless',
      price: 175,
      normalPrice: 195,
    },
    gavran_country_1kg: {
      titleEn: '1kg Gavran Desi Free-Range',
      titleMr: '१ किलो अस्सल गावरान कोंबडी',
      productId: 'prod-3',
      weightGrams: 1000,
      cutStyle: 'Curry Cut',
      skinOption: 'with_skin',
      price: 395,
      normalPrice: 440,
    },
  };

  const currentOption = planOptions[selectedPlanKey];
  const basePrice = currentOption.price;
  const eggsPrice = eggsAddon === 12 ? 80 : eggsAddon === 6 ? 45 : 0;
  const spicePrice = spiceAddon ? 30 : 0;
  const totalPricePerDelivery = basePrice + eggsPrice + spicePrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return;

    addSubscription({
      titleEn: currentOption.titleEn,
      titleMr: currentOption.titleMr,
      frequency,
      preferredDay: 'Sunday',
      preferredSlot: slot,
      productId: currentOption.productId,
      weightGrams: currentOption.weightGrams,
      cutStyle: currentOption.cutStyle,
      skinOption: currentOption.skinOption,
      pricePerDelivery: totalPricePerDelivery,
      discountPercentage: 10,
    });

    setIsSuccess(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 space-y-12">
      {/* Hero Header */}
      <div className="bg-[#C8262B] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="max-w-xl space-y-3 z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>The Sunday Meat Ritual</span>
          </div>
          <h1 className="font-serif-display font-bold text-3xl md:text-5xl leading-tight">
            Sunday Lunch, Guaranteed.
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Never wake up to long wet market queues or out-of-stock messages. Reserve your weekly Sunday butcher slot. Arrives chilled between 7:30 AM and 10:30 AM with a guaranteed 10% subscriber discount.
          </p>
        </div>

        <div className="shrink-0 bg-white text-[#1B1512] rounded-2xl p-6 shadow-2xl max-w-xs w-full text-center space-y-2 z-10">
          <div className="text-xs uppercase font-bold text-[#5E524C]">Subscriber Perk</div>
          <div className="font-serif-display font-extrabold text-3xl text-[#2F5D46]">
            10% OFF
          </div>
          <p className="text-[11px] text-[#5E524C]">
            + Zero delivery charges on all standing weekend subscriptions.
          </p>
        </div>
      </div>

      {/* Subscription Customizer Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-[#1B1512]/10 shadow-xs space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Select Cut */}
            <div className="space-y-3">
              <label className="block font-serif-display font-bold text-lg text-[#1B1512]">
                1. Choose Your Standing Cut:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(planOptions).map(([key, info]) => {
                  const isSelected = selectedPlanKey === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedPlanKey(key as any)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#C8262B] bg-[#C8262B]/5 shadow-xs'
                          : 'border-[#1B1512]/15 bg-white hover:border-[#1B1512]/30'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#1B1512] mb-1">
                          {language === 'mr' ? info.titleMr : info.titleEn}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#1B1512]/5 flex items-baseline justify-between">
                        <span className="text-xs line-through text-[#5E524C]">
                          ₹{info.normalPrice}
                        </span>
                        <span className="font-serif-display font-bold text-lg text-[#C8262B]">
                          ₹{info.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Frequency & Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1B1512]">
                  2. Frequency:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('Weekly')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                      frequency === 'Weekly'
                        ? 'bg-[#1B1512] text-white border-[#1B1512]'
                        : 'bg-white text-[#1B1512] border-[#1B1512]/15'
                    }`}
                  >
                    Every Sunday
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('Bi-Weekly')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                      frequency === 'Bi-Weekly'
                        ? 'bg-[#1B1512] text-white border-[#1B1512]'
                        : 'bg-white text-[#1B1512] border-[#1B1512]/15'
                    }`}
                  >
                    Alternate Sundays
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1B1512]">
                  3. Sunday Delivery Window:
                </label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3 py-2 text-xs font-semibold text-[#1B1512] focus:outline-none focus:border-[#C8262B] cursor-pointer"
                >
                  <option value="07:30 AM - 09:00 AM">07:30 AM - 09:00 AM (Early Prep)</option>
                  <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM (Brunch Time)</option>
                  <option value="10:30 AM - 12:00 PM">10:30 AM - 12:00 PM (Lunch Ready)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Addons */}
            <div className="space-y-3 pt-2">
              <label className="block font-serif-display font-bold text-base text-[#1B1512]">
                4. Add-On Fresh Staples:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#FBF6EE] border border-[#1B1512]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Egg className="w-5 h-5 text-[#F2A33A]" />
                    <div>
                      <div className="text-xs font-bold text-[#1B1512]">Farm Fresh Eggs</div>
                      <div className="text-[10px] text-[#5E524C]">Daily brown shell batch</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[0, 6, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setEggsAddon(num)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                          eggsAddon === num
                            ? 'bg-[#C8262B] text-white'
                            : 'bg-white text-[#1B1512] border border-[#1B1512]/10'
                        }`}
                      >
                        {num === 0 ? 'None' : `${num} pcs`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FBF6EE] border border-[#1B1512]/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#1B1512]">
                      Biryani Khada Masala Pouch (+₹30)
                    </div>
                    <div className="text-[10px] text-[#5E524C]">
                      Star anise, shahi jeera, mace & green cardamom
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={spiceAddon}
                    onChange={(e) => setSpiceAddon(e.target.checked)}
                    className="w-4 h-4 text-[#C8262B] rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Contact & Address */}
            <div className="space-y-3 pt-2">
              <label className="block font-serif-display font-bold text-base text-[#1B1512]">
                5. Delivery Details:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-xs text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                />
                <input
                  type="tel"
                  required
                  placeholder="10-digit Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-xs text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                />
                <input
                  type="text"
                  required
                  placeholder="Street Address, Building, Flat No"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="sm:col-span-2 bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-xs text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                />
              </div>
            </div>

            <Button fullWidth variant="primary" size="lg" type="submit">
              Activate Sunday Subscription (₹{totalPricePerDelivery} / delivery)
            </Button>
          </form>

          {isSuccess && (
            <div className="p-4 bg-[#EBF3EE] border border-[#2F5D46]/30 rounded-2xl flex items-center gap-3 text-xs text-[#2F5D46]">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <b>Subscription Confirmed!</b> Your first Sunday box will be delivered this coming Sunday at {slot}. You can pause or cancel below at any time.
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary & Active Subscriptions List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#F4ECE0] rounded-3xl p-6 border border-[#1B1512]/15 space-y-4">
            <h3 className="font-serif-display font-bold text-lg text-[#1B1512]">
              Subscription Summary
            </h3>
            <div className="space-y-2 text-xs text-[#5E524C]">
              <div className="flex justify-between">
                <span>Selected Cut:</span>
                <span className="font-bold text-[#1B1512]">
                  {currentOption.titleEn}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span className="font-semibold capitalize text-[#1B1512]">
                  {frequency} on Sunday
                </span>
              </div>
              <div className="flex justify-between">
                <span>Time Slot:</span>
                <span className="font-semibold text-[#1B1512]">{slot}</span>
              </div>
              {eggsAddon > 0 && (
                <div className="flex justify-between text-[#2F5D46]">
                  <span>Farm Eggs (+{eggsAddon} pcs):</span>
                  <span className="font-semibold">+₹{eggsPrice}</span>
                </div>
              )}
              {spiceAddon && (
                <div className="flex justify-between text-[#2F5D46]">
                  <span>Biryani Masala:</span>
                  <span className="font-semibold">+₹30</span>
                </div>
              )}
              <div className="flex justify-between text-[#2F5D46]">
                <span>Subscriber Delivery Fee:</span>
                <span className="font-bold">FREE (Saved ₹30)</span>
              </div>
              <div className="pt-3 border-t border-[#1B1512]/10 flex justify-between items-baseline text-sm font-bold text-[#1B1512]">
                <span>Per Sunday Total:</span>
                <span className="font-serif-display text-2xl text-[#C8262B]">
                  ₹{totalPricePerDelivery}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#5E524C] pt-2 space-y-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2F5D46]" />
                <span>Zero commitments. Pause before Saturday 6 PM anytime.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D46]" />
                <span>Pay weekly on delivery via Cash or UPI.</span>
              </div>
            </div>
          </div>

          {/* Existing Active Subscriptions */}
          {subscriptions.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-[#1B1512]/10 space-y-4">
              <h3 className="font-serif-display font-bold text-base text-[#1B1512]">
                Your Active Standing Orders ({subscriptions.length})
              </h3>
              <div className="space-y-3">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-2xl bg-[#FBF6EE] border border-[#1B1512]/10 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-[#1B1512]">
                          {language === 'mr' ? sub.titleMr : sub.titleEn}
                        </span>
                        <div className="text-[11px] text-[#5E524C]">
                          {sub.frequency} · {sub.preferredSlot}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          sub.active
                            ? 'bg-[#EBF3EE] text-[#2F5D46]'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sub.active ? 'ACTIVE' : 'PAUSED'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1B1512]/5 text-[11px]">
                      <span className="font-bold text-[#C8262B]">
                        ₹{sub.pricePerDelivery} / delivery
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggleSubscription(sub.id)}
                          className="text-[#5E524C] hover:text-[#1B1512] font-semibold cursor-pointer"
                        >
                          {sub.active ? 'Pause' : 'Resume'}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSubscription(sub.id)}
                          className="text-[#C8262B] hover:underline cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
