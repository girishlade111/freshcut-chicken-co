import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Truck,
  MessageSquare,
  Printer,
  Phone,
  RefreshCw,
} from 'lucide-react';
import { useOrdersStore } from '../store/useOrdersStore';
import { Button } from '../components/ui/Button';
import { OrderItem, OrderStatus } from '../types';

interface OrderConfirmationProps {
  orderId: string;
  onNavigate: (view: string, param?: string) => void;
}

export const OrderConfirmationView: React.FC<OrderConfirmationProps> = ({
  orderId,
  onNavigate,
}) => {
  const { getOrder, updateOrderStatus } = useOrdersStore();
  const order = getOrder(orderId);

  const [etaMinutes, setEtaMinutes] = useState(48);

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif-display font-bold text-2xl text-[#1B1512]">
          Order Not Found
        </h2>
        <p className="text-xs text-[#5E524C]">
          We couldn't locate order reference #{orderId}.
        </p>
        <Button variant="primary" size="md" onClick={() => onNavigate('shop')}>
          Browse Counter
        </Button>
      </div>
    );
  }

  const steps: { id: OrderStatus; title: string; desc: string }[] = [
    { id: 'confirmed', title: 'Order Confirmed', desc: 'Scale calibrated & verified' },
    { id: 'cutting', title: 'Precision Carving', desc: 'Sanitized 8°C butcher room' },
    { id: 'out_for_delivery', title: 'Cold-Chain En Route', desc: 'Chilled pouch with ice-gel' },
    { id: 'delivered', title: 'Delivered', desc: 'Ready for the pan' },
  ];

  const currentStepIdx = steps.findIndex((s) => s.id === order.status);
  const activeIdx = currentStepIdx >= 0 ? currentStepIdx : 0;

  // Advance status for demo demonstration
  const handleAdvanceDemoStatus = () => {
    const nextIdx = (activeIdx + 1) % steps.length;
    updateOrderStatus(order.id, steps[nextIdx].id);
  };

  const handleShareWhatsApp = () => {
    const msg = `*FreshCut Order #${order.id}*\nStatus: ${order.status}\nTotal: ₹${order.total}\nTrack live on: https://freshcutdemo.app/track?id=${order.id}`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#EBF3EE] rounded-3xl p-6 md:p-8 border border-[#2F5D46]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#2F5D46] text-white flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#2F5D46] uppercase tracking-wider">
              Order Confirmed & Butchery Queued
            </div>
            <h1 className="font-serif-display font-bold text-2xl text-[#1B1512] mt-0.5">
              Order #{order.id}
            </h1>
            <p className="text-xs text-[#5E524C]">
              Placed at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        {/* Live ETA Box */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-[#2F5D46]/30 text-center shrink-0 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#5E524C]">Estimated Arrival</div>
          <div className="font-serif-display font-extrabold text-2xl text-[#C8262B]">
            ~{etaMinutes} Mins
          </div>
          <div className="text-[11px] text-[#2F5D46] font-semibold flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2F5D46] animate-pulse" />
            <span>On Schedule</span>
          </div>
        </div>
      </div>

      {/* Interactive Status Timeline */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#1B1512]/10 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-display font-bold text-lg text-[#1B1512]">
              Live Order & Cold-Chain Journey
            </h3>
            <p className="text-xs text-[#5E524C]">
              Track each stage from butcher cleaver to your doorway.
            </p>
          </div>

          {/* Client Pitch Demo Tool */}
          <button
            onClick={handleAdvanceDemoStatus}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B1512]/5 hover:bg-[#1B1512]/10 text-[#1B1512] text-xs font-semibold cursor-pointer border border-[#1B1512]/10"
            title="Click to simulate next step in sales pitch demo"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#C8262B]" />
            <span>Simulate Next Stage (Demo)</span>
          </button>
        </div>

        {/* Stepper bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          {steps.map((step, idx) => {
            const isDone = idx <= activeIdx;
            const isCurrent = idx === activeIdx;

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-2xl border text-xs transition-all ${
                  isCurrent
                    ? 'border-[#C8262B] bg-[#C8262B]/5 shadow-xs font-semibold'
                    : isDone
                    ? 'border-[#2F5D46]/30 bg-[#EBF3EE]/60 text-[#2F5D46]'
                    : 'border-[#1B1512]/10 bg-[#FBF6EE]/40 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-[#C8262B] text-white animate-pulse'
                        : isDone
                        ? 'bg-[#2F5D46] text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isDone && !isCurrent ? '✓' : idx + 1}
                  </span>
                  <span className="font-bold text-[#1B1512]">{step.title}</span>
                </div>
                <div className="text-[11px] text-[#5E524C]">{step.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Assigned Rider Info */}
        <div className="p-4 bg-[#FBF6EE] rounded-2xl border border-[#1B1512]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8262B] text-white flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#1B1512]">Assigned Express Rider: Datta Shinde</div>
              <div className="text-[#5E524C]">Insulated thermal carrier #FC-04 · Temperature verified at 3.2°C</div>
            </div>
          </div>

          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#1B1512] border border-[#1B1512]/15 rounded-xl font-bold hover:bg-[#1B1512]/5"
          >
            <Phone className="w-3.5 h-3.5 text-[#2F5D46]" />
            <span>Call Rider (+91 98765 43210)</span>
          </a>
        </div>
      </div>

      {/* Itemized Butcher Receipt */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#1B1512]/10 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#1B1512]/10 pb-4">
          <h3 className="font-serif-display font-bold text-lg text-[#1B1512]">
            Cleaned Net-Weight Butcher Receipt
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1B1512]/15 text-xs font-semibold text-[#1B1512] hover:bg-[#FBF6EE] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
            <Button
              variant="whatsapp"
              size="sm"
              onClick={handleShareWhatsApp}
              icon={<MessageSquare className="w-3.5 h-3.5" />}
            >
              Share on WhatsApp
            </Button>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5E524C]">
          <div>
            <div className="font-bold text-[#1B1512] mb-1">Delivering To:</div>
            <div>{order.customer.name}</div>
            <div>{order.customer.address}</div>
            <div>Pincode: {order.customer.pincode}</div>
            <div>Phone: {order.customer.phone}</div>
          </div>
          <div>
            <div className="font-bold text-[#1B1512] mb-1">Delivery Slot:</div>
            <div>{order.deliverySlot}</div>
            <div className="mt-2 font-bold text-[#1B1512]">Payment Mode:</div>
            <div className="capitalize">{order.paymentMethod.toUpperCase()}</div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border border-[#1B1512]/10 rounded-2xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#FBF6EE] text-[#5E524C] font-bold border-b border-[#1B1512]/10">
              <tr>
                <th className="p-3">Cut Item</th>
                <th className="p-3">Style / Skin</th>
                <th className="p-3 text-right">Net Pack Weight</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B1512]/5">
              {order.items.map((it: OrderItem, idx: number) => (
                <tr key={idx}>
                  <td className="p-3 font-bold text-[#1B1512]">{it.productName}</td>
                  <td className="p-3 text-[#5E524C]">{it.cutStyle} · {it.skinOption}</td>
                  <td className="p-3 text-right font-semibold">
                    {it.weightGrams >= 1000 ? `${it.weightGrams / 1000} kg` : `${it.weightGrams}g`}
                  </td>
                  <td className="p-3 text-right font-serif-display font-bold text-[#1B1512]">
                    ₹{it.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="space-y-1.5 text-xs text-[#5E524C] max-w-xs ml-auto">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold text-[#1B1512]">₹{order.subtotal}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-[#2F5D46]">
              <span>Discount:</span>
              <span className="font-semibold">-₹{order.discount}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Cold-Chain Delivery:</span>
            <span className="font-semibold text-[#1B1512]">
              {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#1B1512]/10 text-sm font-bold text-[#1B1512]">
            <span>Total Paid:</span>
            <span className="font-serif-display text-xl text-[#C8262B]">₹{order.total}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="secondary" size="md" onClick={() => onNavigate('shop')}>
          Order More Cuts
        </Button>
        <Button variant="primary" size="md" onClick={() => onNavigate('home')}>
          Return to Storefront
        </Button>
      </div>
    </div>
  );
};
