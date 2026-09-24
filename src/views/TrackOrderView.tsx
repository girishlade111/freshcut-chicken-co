import React, { useState } from 'react';
import { Search, Truck, ArrowRight } from 'lucide-react';
import { useOrdersStore } from '../store/useOrdersStore';
import { Button } from '../components/ui/Button';

interface TrackOrderViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({ onNavigate }) => {
  const { orders } = useOrdersStore();
  const [searchId, setSearchId] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setSearched(true);
    const cleanId = searchId.trim().toUpperCase().replace('#', '');
    const found = orders.find(
      (o) => o.id.toUpperCase() === cleanId || o.customer.phone.includes(cleanId)
    );
    if (found) {
      onNavigate('confirmation', found.id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-16 space-y-8">
      <div className="text-center space-y-3">
        <div className="w-14 h-14 bg-[#C8262B]/10 text-[#C8262B] rounded-2xl flex items-center justify-center mx-auto">
          <Truck className="w-7 h-7" />
        </div>
        <h1 className="font-serif-display font-bold text-3xl text-[#1B1512]">
          Live Cold-Chain Order Tracker
        </h1>
        <p className="text-xs sm:text-sm text-[#5E524C] max-w-md mx-auto">
          Track your fresh cut in real time from butcher carving station to delivery rider doorstep.
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <input
          type="text"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
            setSearched(false);
          }}
          placeholder="Enter Order ID (e.g. ORD-8492) or Mobile"
          className="flex-1 bg-white border border-[#1B1512]/20 rounded-xl px-4 py-2.5 text-xs text-[#1B1512] font-semibold focus:outline-none focus:border-[#C8262B]"
        />
        <Button variant="primary" size="md" type="submit">
          Track
        </Button>
      </form>

      {searched && (
        <div className="text-center text-xs text-[#C8262B]">
          No active order found with that ID. Please check the recent orders below.
        </div>
      )}

      {/* Recent Orders in Local Storage */}
      {orders.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-[#1B1512]/10 shadow-xs space-y-4 max-w-lg mx-auto">
          <h3 className="font-serif-display font-bold text-base text-[#1B1512]">
            Recent Orders on this Device ({orders.length})
          </h3>
          <div className="divide-y divide-[#1B1512]/5 text-xs">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => onNavigate('confirmation', order.id)}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-[#FBF6EE] p-2 rounded-xl transition-colors"
              >
                <div>
                  <div className="font-bold text-[#1B1512]">
                    Order #{order.id} · <span className="text-[#C8262B]">₹{order.total}</span>
                  </div>
                  <div className="text-[11px] text-[#5E524C]">
                    {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} items
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.status === 'delivered'
                        ? 'bg-[#EBF3EE] text-[#2F5D46]'
                        : 'bg-[#F2A33A]/20 text-[#8F5608]'
                    }`}
                  >
                    {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#5E524C]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
