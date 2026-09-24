import React, { useState } from 'react';
import { Building2, MessageSquare, Truck, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';
import { Button } from '../components/ui/Button';

export const BulkOrdersView: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('Restaurant / Cafe');
  const [estimatedDailyVolume, setEstimatedDailyVolume] = useState('10 - 25 kg/day');
  const [requiredCuts, setRequiredCuts] = useState<string[]>(['Boneless Breast Cubes', 'Curry Cut']);
  const [submitted, setSubmitted] = useState(false);

  const cutOptions = [
    'Whole Dressed Birds (1.2 - 1.4kg)',
    'Curry Cut (Medium 16 pcs)',
    'Boneless Breast Cubes (for Tikka/Curry)',
    'Boneless Thigh Fillets (for Burgers/Shawarma)',
    'Chicken Keema (Fine Mince)',
    'Chicken Soup Bones / Winglets',
    'Tender Goat Mutton Curry Cut',
  ];

  const toggleCut = (cut: string) => {
    if (requiredCuts.includes(cut)) {
      setRequiredCuts(requiredCuts.filter((c) => c !== cut));
    } else {
      setRequiredCuts([...requiredCuts, cut]);
    }
  };

  const handleWhatsAppQuote = () => {
    const text = `*B2B Wholesale Inquiry - ${SHOP_CONFIG.shopName}*\n\n- Business: ${businessName || 'N/A'}\n- Contact: ${contactPerson || 'N/A'}\n- Phone: ${phone || 'N/A'}\n- Type: ${businessType}\n- Estimated Volume: ${estimatedDailyVolume}\n- Required Cuts: ${requiredCuts.join(', ')}\n\nPlease share your commercial rate sheet and delivery schedule.`;
    const url = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 space-y-12">
      {/* Header */}
      <div className="bg-[#1B1512] text-[#FBF6EE] rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-[#342A24]">
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#F2A33A]/20 text-[#F2A33A] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Commercial B2B & Horeca Supply</span>
          </div>
          <h1 className="font-serif-display font-bold text-3xl md:text-5xl text-white">
            Wholesale Meat Supply for Pune's Finest Kitchens
          </h1>
          <p className="text-xs sm:text-sm text-[#FBF6EE]/75 leading-relaxed">
            Supplying leading restaurants, cloud kitchens, caterers, and gym meal-prep services with standardized, temperature-controlled butchery daily.
          </p>
        </div>

        <div className="shrink-0 bg-[#261E1A] p-6 rounded-2xl border border-[#3D312A] text-xs space-y-2 max-w-xs w-full">
          <div className="font-bold text-[#F2A33A] text-sm">Wholesale Promises:</div>
          <ul className="space-y-1.5 text-[#FBF6EE]/80">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D46]" />
              <span>Daily 6:00 AM delivery</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D46]" />
              <span>Zero water retention / injection</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D46]" />
              <span>GST invoice with FSSAI batch logs</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D46]" />
              <span>Custom portion sizes per specification</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Form and Pricing Tier Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Wholesale Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-[#1B1512]/10 shadow-xs space-y-6">
          <h2 className="font-serif-display font-bold text-xl text-[#1B1512]">
            Request Commercial Quote & Trial Sample
          </h2>

          {submitted ? (
            <div className="p-6 bg-[#EBF3EE] border border-[#2F5D46]/30 rounded-2xl text-xs text-[#2F5D46] space-y-2">
              <div className="font-bold text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Inquiry Received!</span>
              </div>
              <p>
                Our commercial supply team will contact {contactPerson || 'you'} at {phone} within 2 business hours with wholesale pricing tiers and sample box availability.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">Business / Brand Name:</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Spice Route Biryani, Cloud Nine Kitchen"
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">Contact Person:</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Chef / Kitchen Manager Name"
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">Mobile / WhatsApp Number:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">Business Type:</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  >
                    <option value="Restaurant / Cafe">Restaurant / Dine-In Cafe</option>
                    <option value="Cloud Kitchen / Dark Kitchen">Cloud Kitchen / Dark Kitchen</option>
                    <option value="Catering / Event Services">Catering / Event Services</option>
                    <option value="Gym Meal Prep / Nutritionist">Gym Meal Prep / Nutritionist</option>
                    <option value="Corporate Cafeteria">Corporate Cafeteria</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1B1512] mb-1">Estimated Daily Requirement:</label>
                <div className="grid grid-cols-4 gap-2">
                  {['5 - 10 kg', '10 - 25 kg', '25 - 50 kg', '50+ kg'].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setEstimatedDailyVolume(vol)}
                      className={`py-2 rounded-xl border font-bold cursor-pointer ${
                        estimatedDailyVolume === vol
                          ? 'bg-[#1B1512] text-white border-[#1B1512]'
                          : 'bg-white text-[#1B1512] border-[#1B1512]/15'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1B1512] mb-1.5">Required Cuts & Preparations:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cutOptions.map((cut) => {
                    const isChecked = requiredCuts.includes(cut);
                    return (
                      <div
                        key={cut}
                        onClick={() => toggleCut(cut)}
                        className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#C8262B]/10 border-[#C8262B] text-[#C8262B] font-semibold'
                            : 'bg-white border-[#1B1512]/15 text-[#5E524C]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 text-[#C8262B] pointer-events-none"
                        />
                        <span>{cut}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button fullWidth variant="primary" size="md" type="submit">
                  Submit Bulk Quote Request
                </Button>
                <Button
                  fullWidth
                  variant="whatsapp"
                  size="md"
                  type="button"
                  onClick={handleWhatsAppQuote}
                  icon={<MessageSquare className="w-4 h-4" />}
                >
                  Direct WhatsApp B2B Desk
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Commercial Wholesale Tiers Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F4ECE0] rounded-3xl p-6 border border-[#1B1512]/15 space-y-4">
            <h3 className="font-serif-display font-bold text-lg text-[#1B1512]">
              Standard B2B Wholesale Tiers
            </h3>
            <div className="space-y-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-[#1B1512]/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1B1512]">Tier 1: 5 - 15 kg / day</div>
                  <div className="text-[11px] text-[#5E524C]">Ideal for small cafes & meal preps</div>
                </div>
                <div className="font-serif-display font-bold text-base text-[#C8262B]">
                  12% OFF Retail
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#1B1512]/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1B1512]">Tier 2: 15 - 40 kg / day</div>
                  <div className="text-[11px] text-[#5E524C]">Cloud kitchens & busy restaurants</div>
                </div>
                <div className="font-serif-display font-bold text-base text-[#C8262B]">
                  18% OFF Retail
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#1B1512]/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1B1512]">Tier 3: 40+ kg / day</div>
                  <div className="text-[11px] text-[#5E524C]">Catering contractors & institutions</div>
                </div>
                <div className="font-serif-display font-bold text-base text-[#C8262B]">
                  Custom Contract
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#5E524C] space-y-1.5 border-t border-[#1B1512]/10">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#2F5D46]" />
                <span>Dedicated refrigerated van routes across Pune city.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#2F5D46]" />
                <span>Electronic weighbridge calibration slip provided with every crate.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
