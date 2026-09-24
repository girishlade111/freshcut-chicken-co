import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';

interface OrdersState {
  orders: Order[];
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (orderId: string) => Order | undefined;
  getOrderByPhone: (phone: string) => Order[];
  resetOrders: () => void;
  exportToCsv: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: INITIAL_ORDERS,

      addOrder: (orderData) => {
        const orderCount = get().orders.length + 8492;
        const newId = `ORD-${orderCount}`;
        const now = new Date().toISOString();

        const newOrder: Order = {
          ...orderData,
          id: newId,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? { ...o, status, updatedAt: new Date().toISOString() }
              : o
          ),
        }));
      },

      getOrder: (orderId) => {
        const normalized = orderId.trim().toUpperCase();
        return get().orders.find(
          (o) => o.id.toUpperCase() === normalized
        );
      },

      getOrderByPhone: (phone) => {
        const digits = phone.replace(/\D/g, '');
        return get().orders.filter((o) => {
          const ordDigits = o.customer.phone.replace(/\D/g, '');
          return ordDigits.includes(digits) || digits.includes(ordDigits);
        });
      },

      resetOrders: () => {
        set({ orders: INITIAL_ORDERS });
      },

      exportToCsv: () => {
        const orders = get().orders;
        const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Pincode', 'Items', 'Total', 'Payment', 'Status', 'Slot'];
        const rows = orders.map((o) => [
          o.id,
          new Date(o.createdAt).toLocaleDateString(),
          `"${o.customer.name}"`,
          `"${o.customer.phone}"`,
          o.customer.pincode,
          `"${o.items.map((i) => `${i.productName} (${i.weightGrams}g - ${i.cutStyle})`).join('; ')}"`,
          o.total,
          o.paymentMethod.toUpperCase(),
          o.status.toUpperCase(),
          `"${o.deliverySlot}"`,
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `FreshCut_Orders_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    }),
    {
      name: 'freshcut_orders_storage',
    }
  )
);
