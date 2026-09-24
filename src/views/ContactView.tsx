import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { SHOP_CONFIG } from '../config/shop';
import { FAQS } from '../data/mockData';
import { Button } from '../components/ui/Button';

export const ContactView: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
          Direct Customer Desk
        </span>
        <h1 className="font-serif-display font-bold text-3xl md:text-5xl text-[#1B1512]">
          Store Locator & Support
        </h1>
        <p className="text-xs sm:text-sm text-[#5E524C]">
          Visit our modern walk-in butchery counter in {SHOP_CONFIG.city} or speak with our master butchers directly.
        </p>
      </div>

      {/* Store Info & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#1B1512]/10 shadow-xs space-y-6">
            <h2 className="font-serif-display font-bold text-xl text-[#1B1512]">
              Butcher Store Coordinates
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C8262B]/10 text-[#C8262B] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1B1512]">Store Address:</div>
                  <div className="text-[#5E524C] leading-relaxed mt-0.5">{SHOP_CONFIG.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2F5D46]/10 text-[#2F5D46] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1B1512]">Counter Operating Hours:</div>
                  <div className="text-[#5E524C] mt-0.5">
                    {SHOP_CONFIG.openingHours.days}: {SHOP_CONFIG.openingHours.open} - {SHOP_CONFIG.openingHours.close}
                  </div>
                  <div className="text-[11px] text-[#2F5D46] font-semibold mt-0.5">
                    Sunday Morning Express Butchery opens at 6:30 AM
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F2A33A]/15 text-[#C97B14] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1B1512]">Direct Phone & Orders:</div>
                  <a href={`tel:${SHOP_CONFIG.phone}`} className="text-[#C8262B] font-bold text-sm hover:underline">
                    {SHOP_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1B1512]">WhatsApp Help Desk:</div>
                  <a
                    href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-bold text-sm hover:underline"
                  >
                    +91 {SHOP_CONFIG.whatsappNumber}
                  </a>
                </div>
              </div>
            </div>

            {/* Serviceable Pincodes List */}
            <div className="pt-4 border-t border-[#1B1512]/10 space-y-2">
              <div className="text-xs font-bold text-[#1B1512]">Active Delivery Zones in Pune:</div>
              <div className="flex flex-wrap gap-1.5">
                {SHOP_CONFIG.deliveryAreas.map((a) => (
                  <span
                    key={a.pincode}
                    className="text-[11px] bg-[#FBF6EE] px-2.5 py-1 rounded-lg border border-[#1B1512]/5 text-[#5E524C]"
                  >
                    {a.name} ({a.pincode})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Contact Form & Map Illustration */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#1B1512]/10 shadow-xs space-y-4">
            <h2 className="font-serif-display font-bold text-xl text-[#1B1512]">
              Send Special Butchery Request
            </h2>

            {submitted ? (
              <div className="p-4 bg-[#EBF3EE] text-[#2F5D46] rounded-2xl border border-[#2F5D46]/30 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Thank you {name}! Our store manager will reply shortly on {phone}.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Kulkarni"
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">Message or Custom Cut Inquiry</label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us know what cut, quantity or questions you have..."
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  />
                </div>

                <Button fullWidth variant="primary" size="md" type="submit">
                  Send to Store Manager
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
            Customer Clarifications
          </span>
          <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-[#1B1512]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#1B1512]/10 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FBF6EE]/50 transition-colors"
                >
                  <span className="font-serif-display font-bold text-sm md:text-base text-[#1B1512]">
                    {faq.questionEn}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C8262B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#5E524C] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#5E524C] leading-relaxed border-t border-[#1B1512]/5 pt-3">
                    {faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
