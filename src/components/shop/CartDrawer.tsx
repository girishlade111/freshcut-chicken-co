import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { SHOP_CONFIG } from '../../config/shop';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '../ui/Button';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateToCheckout }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateWeight,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getDeliveryFee,
    getTotal,
    clearCart,
  } = useCartStore();

  const { language, t } = useLanguage();
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  const neededForFreeDelivery = Math.max(0, SHOP_CONFIG.freeDeliveryAbove - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / SHOP_CONFIG.freeDeliveryAbove) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    setCouponFeedback(res);
    if (res.success) setCouponCodeInput('');
  };

  const handleWhatsAppCartOrder = () => {
    if (items.length === 0) return;
    const itemLines = items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.product.nameEn} - ${i.weightGrams}g (${i.cutStyle}, ${i.skinOption.replace('_', ' ')}) = ₹${i.totalPrice}`
      )
      .join('\n');

    const msg = `*New Order - ${SHOP_CONFIG.shopName}*\n\n${itemLines}\n\n*Subtotal:* ₹${subtotal}\n*Delivery:* ₹${deliveryFee}\n*Total:* ₹${total}\n\nPlease confirm availability and delivery slot.`;
    const waUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF6EE] shadow-2xl flex flex-col border-l border-[#1B1512]/15 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#1B1512]/10 bg-white/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C8262B]" />
              <h2 className="font-serif-display font-bold text-lg text-[#1B1512]">
                Your Fresh Meat Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-xl hover:bg-[#1B1512]/5 text-[#1B1512] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="bg-[#F4ECE0] px-4 py-3 border-b border-[#1B1512]/10">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              {neededForFreeDelivery === 0 ? (
                <span className="text-[#2F5D46] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Free Delivery Unlocked!</span>
                </span>
              ) : (
                <span className="text-[#1B1512]">
                  Add <b>₹{neededForFreeDelivery}</b> more for FREE delivery
                </span>
              )}
              <span className="text-[#5E524C]">{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full bg-[#1B1512]/10 h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${freeDeliveryProgress}%` }}
                className="h-full bg-[#2F5D46] rounded-full transition-all duration-300"
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#1B1512]/5 flex items-center justify-center text-[#1B1512]/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display font-bold text-lg text-[#1B1512]">
                  {t('cartEmpty')}
                </h3>
                <p className="text-xs text-[#5E524C] max-w-xs">
                  {t('cartEmptyPrompt')}
                </p>
                <Button variant="primary" size="sm" onClick={closeCart}>
                  Explore Fresh Cuts
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#1B1512]/10 shadow-xs flex gap-3 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.nameEn}
                    className="w-16 h-16 object-cover rounded-xl bg-[#F4ECE0] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif-display font-bold text-sm text-[#1B1512] truncate">
                        {language === 'mr' ? item.product.nameMr : item.product.nameEn}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#5E524C] hover:text-[#C8262B] p-0.5 cursor-pointer shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#5E524C] mt-0.5 space-x-1 truncate">
                      <span className="font-medium text-[#1B1512]">{item.cutStyle}</span>
                      <span>·</span>
                      <span className="capitalize">{item.skinOption.replace('_', ' ')}</span>
                    </div>

                    {/* Weight Controls and Price */}
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#1B1512]/5">
                      <div className="flex items-center border border-[#1B1512]/15 rounded-lg overflow-hidden bg-[#FBF6EE]">
                        <button
                          onClick={() => updateWeight(item.id, item.weightGrams - 250)}
                          className="px-2 py-1 hover:bg-[#1B1512]/10 transition-colors cursor-pointer text-[#1B1512]"
                          title="Reduce weight"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1B1512]">
                          {item.weightGrams >= 1000
                            ? `${item.weightGrams / 1000} kg`
                            : `${item.weightGrams}g`}
                        </span>
                        <button
                          onClick={() => updateWeight(item.id, item.weightGrams + 250)}
                          className="px-2 py-1 hover:bg-[#1B1512]/10 transition-colors cursor-pointer text-[#1B1512]"
                          title="Increase weight"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif-display font-bold text-sm text-[#1B1512]">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Actions (only when items exist) */}
          {items.length > 0 && (
            <div className="p-4 bg-white border-t border-[#1B1512]/10 space-y-3">
              {/* Promo code box */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                {appliedCoupon ? (
                  <div className="p-2 rounded-xl bg-[#EBF3EE] border border-[#2F5D46]/20 flex items-center justify-between text-xs text-[#2F5D46]">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code} applied (₹{discount} saved)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs underline hover:text-[#1B1512] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      placeholder="Coupon (e.g. FIRST50)"
                      className="flex-1 bg-[#FBF6EE] border border-[#1B1512]/15 rounded-xl px-3 py-1.5 text-xs uppercase text-[#1B1512] font-semibold tracking-wider placeholder-normal"
                    />
                    <button
                      type="submit"
                      className="bg-[#1B1512] text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#342A24] cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponFeedback && !appliedCoupon && (
                  <div className="text-[11px] text-[#C8262B] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{couponFeedback.message}</span>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5E524C] pt-1">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-[#1B1512]">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2F5D46]">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Cold Chain Delivery Fee</span>
                  <span className="font-semibold text-[#1B1512]">
                    {deliveryFee === 0 ? <span className="text-[#2F5D46]">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1B1512] pt-2 border-t border-[#1B1512]/10">
                  <span>Total Amount</span>
                  <span className="font-serif-display text-lg text-[#C8262B]">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Button
                  fullWidth
                  variant="primary"
                  size="md"
                  onClick={() => {
                    closeCart();
                    onNavigateToCheckout();
                  }}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Checkout · ₹{total}
                </Button>

                <Button
                  fullWidth
                  variant="whatsapp"
                  size="md"
                  onClick={handleWhatsAppCartOrder}
                  icon={<MessageSquare className="w-4 h-4" />}
                >
                  Order this Cart on WhatsApp
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
