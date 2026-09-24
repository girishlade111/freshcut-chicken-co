import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useOrdersStore } from '../store/useOrdersStore';
import { usePincodeStore } from '../store/usePincodeStore';
import { SHOP_CONFIG } from '../config/shop';
import { Button } from '../components/ui/Button';
import { OrderItem } from '../types';

interface CheckoutViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onNavigate }) => {
  const {
    items,
    getSubtotal,
    getDiscount,
    getDeliveryFee,
    getTotal,
    appliedCoupon,
    clearCart,
  } = useCartStore();

  const { addOrder } = useOrdersStore();
  const { currentPincode, isServiceable, areaName } = usePincodeStore();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincodeInput, setPincodeInput] = useState(currentPincode);
  const [deliverySlot, setDeliverySlot] = useState('Express 45-60 Minutes');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('upi');
  const [instructions, setInstructions] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#1B1512]/5 flex items-center justify-center mx-auto text-[#1B1512]/40">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif-display font-bold text-2xl text-[#1B1512]">
          Your Fresh Meat Bag is Empty
        </h2>
        <p className="text-xs text-[#5E524C]">
          Please select some fresh cuts from the counter before proceeding to checkout.
        </p>
        <Button variant="primary" size="md" onClick={() => onNavigate('shop')}>
          Browse Cuts Counter
        </Button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Please complete your name, phone number, and address.');
      return;
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    setTimeout(() => {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C8262B', '#F2A33A', '#2F5D46', '#FBF6EE'],
        });
      } catch (err) {
        // silent fallback
      }

      const orderItems: OrderItem[] = items.map((it) => ({
        productId: it.product.id,
        productName: it.product.nameEn,
        weightGrams: it.weightGrams,
        cutStyle: it.cutStyle,
        skinOption: it.skinOption,
        specialInstructions: it.specialInstructions,
        price: it.totalPrice,
      }));

      const newOrder = addOrder({
        customer: {
          name: customerName,
          phone,
          address,
          landmark,
          pincode: pincodeInput,
          city: SHOP_CONFIG.city,
        },
        items: orderItems,
        subtotal,
        discount,
        deliveryFee,
        total,
        paymentMethod,
        deliverySlot,
        status: 'confirmed',
        notes: instructions,
        isExpress: deliverySlot.includes('Express'),
      });

      clearCart();
      setIsProcessing(false);
      onNavigate('confirmation', newOrder.id);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#1B1512]/10 pb-4">
        <span className="text-xs font-bold text-[#C8262B] uppercase tracking-wider">
          Express Cold-Chain Checkout
        </span>
        <h1 className="font-serif-display font-bold text-3xl text-[#1B1512] mt-0.5">
          Delivery Details & Payment
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Customer & Address Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Details */}
            <div className="bg-white rounded-3xl p-6 border border-[#1B1512]/10 shadow-xs space-y-4">
              <h2 className="font-serif-display font-bold text-lg text-[#1B1512] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1B1512] text-white flex items-center justify-center text-xs">
                  1
                </span>
                <span>Customer Contact</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Deshmukh"
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2.5 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">
                    Mobile Number (for delivery tracking) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit mobile number"
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2.5 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-3xl p-6 border border-[#1B1512]/10 shadow-xs space-y-4">
              <h2 className="font-serif-display font-bold text-lg text-[#1B1512] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1B1512] text-white flex items-center justify-center text-xs">
                  2
                </span>
                <span>Delivery Address in {SHOP_CONFIG.city}</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">
                    House / Flat No., Wing, Building Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat 402, Shivam Heights, Prabhat Road Lane 4"
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2.5 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#1B1512] mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Opposite Kamla Nehru Park"
                      className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2.5 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#1B1512] mb-1">Pincode *</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2.5 text-[#1B1512] font-semibold focus:outline-none focus:border-[#C8262B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1B1512] mb-1">
                    Special Delivery Note / Door Instructions:
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Ring bell twice, leave on shoe rack, call when arriving"
                    className="w-full bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3.5 py-2 text-[#1B1512] focus:outline-none focus:border-[#C8262B]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Window Selection */}
            <div className="bg-white rounded-3xl p-6 border border-[#1B1512]/10 shadow-xs space-y-4">
              <h2 className="font-serif-display font-bold text-lg text-[#1B1512] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1B1512] text-white flex items-center justify-center text-xs">
                  3
                </span>
                <span>Select Delivery Slot</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { title: 'Express 45-60 Minutes', note: 'Freshly cut & dispatched immediately' },
                  { title: 'Today: 12:30 PM - 01:30 PM', note: 'Pre-lunch slot' },
                  { title: 'Today: 05:30 PM - 07:00 PM', note: 'Evening dinner prep' },
                  { title: 'Tomorrow: 07:30 AM - 09:00 AM', note: 'Early morning butchery' },
                ].map((s) => {
                  const isSelected = deliverySlot === s.title;
                  return (
                    <div
                      key={s.title}
                      onClick={() => setDeliverySlot(s.title)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C8262B] bg-[#C8262B]/5 shadow-xs font-semibold'
                          : 'border-[#1B1512]/15 bg-[#FBF6EE]/50 hover:border-[#1B1512]/30'
                      }`}
                    >
                      <div className="font-bold text-[#1B1512]">{s.title}</div>
                      <div className="text-[11px] text-[#5E524C] mt-0.5">{s.note}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl p-6 border border-[#1B1512]/10 shadow-xs space-y-4">
              <h2 className="font-serif-display font-bold text-lg text-[#1B1512] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1B1512] text-white flex items-center justify-center text-xs">
                  4
                </span>
                <span>Payment Method</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#C8262B] bg-[#C8262B]/5'
                      : 'border-[#1B1512]/15 bg-white'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#2F5D46] mb-2" />
                  <div className="font-bold text-[#1B1512]">UPI / QR Code</div>
                  <div className="text-[11px] text-[#5E524C]">GPay, PhonePe, Paytm</div>
                </div>

                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#C8262B] bg-[#C8262B]/5'
                      : 'border-[#1B1512]/15 bg-white'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#C8262B] mb-2" />
                  <div className="font-bold text-[#1B1512]">Cash on Delivery</div>
                  <div className="text-[11px] text-[#5E524C]">Pay upon arrival at door</div>
                </div>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#C8262B] bg-[#C8262B]/5'
                      : 'border-[#1B1512]/15 bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#1B1512] mb-2" />
                  <div className="font-bold text-[#1B1512]">Debit / Credit Card</div>
                  <div className="text-[11px] text-[#5E524C]">Visa, RuPay, Master</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary & Placement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F4ECE0] rounded-3xl p-6 border border-[#1B1512]/15 space-y-5 sticky top-24">
              <h3 className="font-serif-display font-bold text-xl text-[#1B1512]">
                Order Items ({items.length})
              </h3>

              {/* Items List */}
              <div className="divide-y divide-[#1B1512]/10 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-[#1B1512]">{item.product.nameEn}</div>
                      <div className="text-[11px] text-[#5E524C]">
                        {item.weightGrams >= 1000 ? `${item.weightGrams / 1000}kg` : `${item.weightGrams}g`} · {item.cutStyle} ({item.skinOption.replace('_', ' ')})
                      </div>
                    </div>
                    <div className="font-serif-display font-bold text-[#1B1512]">
                      ₹{item.totalPrice}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#1B1512]/10 text-xs text-[#5E524C]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1B1512]">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2F5D46]">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Cold-Chain Delivery</span>
                  <span className="font-semibold text-[#1B1512]">
                    {deliveryFee === 0 ? <span className="text-[#2F5D46]">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#1B1512]/10 flex justify-between items-baseline text-base font-bold text-[#1B1512]">
                  <span>Total Amount</span>
                  <span className="font-serif-display text-2xl text-[#C8262B]">
                    ₹{total}
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-[#F4DCD0] text-[#9E191E] border border-[#C8262B]/20 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <Button
                fullWidth
                variant="primary"
                size="lg"
                type="submit"
                disabled={isProcessing}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                {isProcessing ? 'Carving & Booking Order...' : `Place Order · ₹${total}`}
              </Button>

              <div className="text-[11px] text-[#5E524C] space-y-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2F5D46]" />
                  <span>100% Satisfaction Guarantee: If not fresh, replaced free.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#2F5D46]" />
                  <span>Sealed in temperature insulated cold pouch with ice gel.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
