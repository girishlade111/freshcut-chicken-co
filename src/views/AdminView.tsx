import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  TrendingUp,
  Package,
  ShoppingBag,
  DollarSign,
  CheckCircle2,
  RefreshCw,
  MessageSquare,
  FileSpreadsheet,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useRatesStore } from '../store/useRatesStore';
import { useOrdersStore } from '../store/useOrdersStore';
import { SHOP_CONFIG } from '../config/shop';
import { Button } from '../components/ui/Button';
import { OrderStatus } from '../types';

export const AdminView: React.FC = () => {
  const { products, updateProductRate, updateStockStatus, resetToDefaults, lastUpdated } =
    useRatesStore();
  const { orders, updateOrderStatus, exportToCsv } = useOrdersStore();

  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'rates' | 'orders' | 'analytics'>('rates');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Rate edit state
  const [editedRates, setEditedRates] = useState<Record<string, number>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleRateChange = (productId: string, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setEditedRates((prev) => ({ ...prev, [productId]: num }));
    }
  };

  const handleSaveRate = (productId: string) => {
    if (editedRates[productId] !== undefined) {
      updateProductRate(productId, editedRates[productId]);
      setSaveSuccessMsg('Rate updated across the live storefront!');
      setTimeout(() => setSaveSuccessMsg(''), 2500);
    }
  };

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // Revenue chart data
  const revenueData = [
    { day: 'Mon', revenue: 4200 },
    { day: 'Tue', revenue: 3800 },
    { day: 'Wed', revenue: 5100 },
    { day: 'Thu', revenue: 4900 },
    { day: 'Fri', revenue: 6400 },
    { day: 'Sat', revenue: 9800 },
    { day: 'Sun', revenue: 14500 },
  ];

  // Category breakdown chart data
  const categoryData = [
    { name: 'Chicken', value: 65, color: '#C8262B' },
    { name: 'Mutton', value: 20, color: '#1B1512' },
    { name: 'Gavran', value: 10, color: '#F2A33A' },
    { name: 'Eggs', value: 5, color: '#2F5D46' },
  ];

  // PIN Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl p-8 border border-[#1B1512]/15 shadow-xl text-center space-y-6">
          <div className="w-14 h-14 bg-[#C8262B]/10 text-[#C8262B] rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="font-serif-display font-bold text-2xl text-[#1B1512]">
              Demo Store Manager
            </h2>
            <p className="text-xs text-[#5E524C] mt-1">
              Sales pitch control panel to edit live rates, toggle inventory stocks, and manage incoming orders.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter 4-digit PIN"
                className="w-full text-center tracking-widest text-2xl font-bold bg-[#FBF6EE] border border-[#1B1512]/20 rounded-xl py-3 focus:outline-none focus:border-[#C8262B]"
              />
              <div className="mt-2 text-xs font-semibold text-[#2F5D46] bg-[#EBF3EE] p-2 rounded-xl border border-[#2F5D46]/20">
                Reviewer Demo PIN: <b>1234</b>
              </div>
            </div>

            {pinError && (
              <div className="text-xs text-[#C8262B] font-semibold">
                Incorrect PIN. Please use 1234.
              </div>
            )}

            <Button fullWidth variant="primary" size="md" type="submit">
              Unlock Admin Panel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Admin Header */}
      <div className="bg-[#1B1512] text-[#FBF6EE] rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#342A24]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#F2A33A] uppercase tracking-wider mb-1">
            <Unlock className="w-4 h-4" />
            <span>Store Operations Desk</span>
          </div>
          <h1 className="font-serif-display font-bold text-2xl md:text-3xl text-white">
            {SHOP_CONFIG.shopName} · Admin Console
          </h1>
          <p className="text-xs text-[#FBF6EE]/70 mt-0.5">
            FSSAI License: {SHOP_CONFIG.fssaiNumber} (Demo Mode) · Last Rate Update: {lastUpdated}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportToCsv}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#261E1A] hover:bg-[#3D312A] text-xs font-semibold rounded-xl text-[#F2A33A] border border-[#3D312A] cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Orders (CSV)</span>
          </button>
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#261E1A] hover:bg-[#3D312A] text-xs font-semibold rounded-xl text-white border border-[#3D312A] cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2 bg-[#C8262B] hover:bg-[#9E191E] text-xs font-semibold rounded-xl text-white cursor-pointer"
          >
            Lock Panel
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3 bg-[#EBF3EE] text-[#2F5D46] border border-[#2F5D46]/30 rounded-xl text-xs flex items-center gap-2 font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex gap-2 border-b border-[#1B1512]/10 pb-2">
        <button
          onClick={() => setActiveTab('rates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'rates'
              ? 'bg-[#1B1512] text-white'
              : 'bg-white border border-[#1B1512]/15 text-[#5E524C] hover:bg-[#1B1512]/5'
          }`}
        >
          Daily Rates & Stocks ({products.length} cuts)
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#1B1512] text-white'
              : 'bg-white border border-[#1B1512]/15 text-[#5E524C] hover:bg-[#1B1512]/5'
          }`}
        >
          Live Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-[#1B1512] text-white'
              : 'bg-white border border-[#1B1512]/15 text-[#5E524C] hover:bg-[#1B1512]/5'
          }`}
        >
          Sales & Analytics
        </button>
      </div>

      {/* Tab 1: Rates & Inventory Table */}
      {activeTab === 'rates' && (
        <div className="bg-white rounded-3xl p-6 border border-[#1B1512]/10 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif-display font-bold text-lg text-[#1B1512]">
                Wholesale Mandi Rates & Stock Status
              </h2>
              <p className="text-xs text-[#5E524C]">
                Change prices below and click 'Save'. Changes appear instantly on the Home rate board and shop pages.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#1B1512]/10 text-[#5E524C] uppercase text-[11px]">
                  <th className="pb-3">Cut Name (EN / MR)</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Current Rate</th>
                  <th className="pb-3">Update New Rate (₹/kg)</th>
                  <th className="pb-3">Inventory Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B1512]/5">
                {products.map((prod) => {
                  const currentInput =
                    editedRates[prod.id] !== undefined
                      ? editedRates[prod.id]
                      : prod.pricePerKg;

                  return (
                    <tr key={prod.id} className="hover:bg-[#FBF6EE]/60">
                      <td className="py-3">
                        <div className="font-bold text-[#1B1512]">{prod.nameEn}</div>
                        <div className="text-[11px] text-[#5E524C]">{prod.nameMr}</div>
                      </td>
                      <td className="py-3 capitalize text-[#5E524C]">{prod.category}</td>
                      <td className="py-3 font-serif-display font-bold text-sm text-[#1B1512]">
                        ₹{prod.pricePerKg}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-[#5E524C]">₹</span>
                          <input
                            type="number"
                            value={currentInput}
                            onChange={(e) => handleRateChange(prod.id, e.target.value)}
                            className="w-20 bg-[#FBF6EE] border border-[#1B1512]/20 rounded-lg px-2 py-1 text-xs font-bold text-[#1B1512]"
                          />
                        </div>
                      </td>
                      <td className="py-3">
                        <select
                          value={prod.stockStatus}
                          onChange={(e) =>
                            updateStockStatus(
                              prod.id,
                              e.target.value as 'in_stock' | 'sold_out' | 'limited_today'
                            )
                          }
                          className="bg-[#FBF6EE] border border-[#1B1512]/20 rounded-lg px-2 py-1 text-xs font-medium cursor-pointer"
                        >
                          <option value="in_stock">In Stock (Fresh)</option>
                          <option value="limited_today">Limited Today</option>
                          <option value="sold_out">Sold Out</option>
                        </select>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleSaveRate(prod.id)}
                          className="px-3 py-1 bg-[#C8262B] hover:bg-[#9E191E] text-white font-bold text-xs rounded-lg cursor-pointer"
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Operations */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 border border-[#1B1512]/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display font-bold text-lg text-[#1B1512]">
              Customer Orders ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#5E524C]">
              No orders placed yet. Place an order on the checkout page to see it here!
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-[#FBF6EE] border border-[#1B1512]/10 space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1B1512]">
                          Order #{order.id}
                        </span>
                        <span className="text-[#5E524C]">· {order.customer.name}</span>
                        <span className="text-[#5E524C]">({order.customer.phone})</span>
                      </div>
                      <div className="text-[11px] text-[#5E524C] mt-0.5">
                        {order.customer.address} · PIN {order.customer.pincode} · Slot: {order.deliverySlot}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-serif-display font-bold text-base text-[#C8262B]">
                        ₹{order.total}
                      </span>
                      <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-[#1B1512]/10">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="pt-2 border-t border-[#1B1512]/5 text-[11px] text-[#5E524C] flex flex-wrap gap-2">
                    {order.items.map((it, idx) => (
                      <span key={idx} className="bg-white px-2 py-0.5 rounded border border-[#1B1512]/5">
                        {it.productName} ({it.weightGrams}g)
                      </span>
                    ))}
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1B1512]/5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1B1512]">Update Stage:</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-white border border-[#1B1512]/20 rounded-lg px-2 py-1 text-xs font-semibold cursor-pointer"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="cutting">Carving in Chilled Prep Room</option>
                        <option value="out_for_delivery">Out with Express Rider</option>
                        <option value="delivered">Delivered Successfully</option>
                      </select>
                    </div>

                    <a
                      href={`https://wa.me/91${order.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Hello ${order.customer.name}, your FreshCut order #${order.id} is now ${order.status.replace('_', ' ')}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Sales Analytics & Charts */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#1B1512]/10 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#5E524C] mb-1">
                <span>Total Demo Revenue</span>
                <DollarSign className="w-4 h-4 text-[#2F5D46]" />
              </div>
              <div className="font-serif-display font-extrabold text-2xl text-[#1B1512]">
                ₹{totalRevenue}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#1B1512]/10 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#5E524C] mb-1">
                <span>Orders Processed</span>
                <ShoppingBag className="w-4 h-4 text-[#C8262B]" />
              </div>
              <div className="font-serif-display font-extrabold text-2xl text-[#1B1512]">
                {totalOrdersCount}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#1B1512]/10 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#5E524C] mb-1">
                <span>Average Order Value</span>
                <TrendingUp className="w-4 h-4 text-[#F2A33A]" />
              </div>
              <div className="font-serif-display font-extrabold text-2xl text-[#1B1512]">
                ₹{avgOrderValue}
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Weekly Revenue Bar Chart */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#1B1512]/10 shadow-xs space-y-4">
              <h3 className="font-serif-display font-bold text-base text-[#1B1512]">
                Weekly Revenue Run Rate (Sunday Peak Analysis)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="day" stroke="#5E524C" fontSize={11} />
                    <YAxis stroke="#5E524C" fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#C8262B" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Mix Pie Chart */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#1B1512]/10 shadow-xs space-y-4">
              <h3 className="font-serif-display font-bold text-base text-[#1B1512]">
                Category Sales Mix
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={65}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#1B1512]/5">
                {categoryData.map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="font-semibold text-[#1B1512]">{c.name}: {c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
