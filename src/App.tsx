import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { DemoRibbon } from './components/layout/DemoRibbon';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { PincodeModal } from './components/layout/PincodeModal';
import { CartDrawer } from './components/shop/CartDrawer';
import { QuickViewModal } from './components/shop/QuickViewModal';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CutsView } from './views/CutsView';
import { SubscribeView } from './views/SubscribeView';
import { BulkOrdersView } from './views/BulkOrdersView';
import { RecipesView } from './views/RecipesView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { TrackOrderView } from './views/TrackOrderView';
import { AdminView } from './views/AdminView';

import { Product } from './types';
import { usePincodeStore } from './store/usePincodeStore';

export function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { openModal: openPincodeModal } = usePincodeStore();

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRates = () => {
    if (currentView !== 'home') {
      handleNavigate('home');
      setTimeout(() => {
        document.getElementById('rates-board-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById('rates-board-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6EE] text-[#1B1512] font-sans flex flex-col selection:bg-[#C8262B] selection:text-white">
      {/* Demo Ribbon for Client Showcase with direct Admin panel button */}
      <DemoRibbon onNavigateToAdmin={() => handleNavigate('admin')} />

      {/* Top Announcement Strip */}
      <AnnouncementBar />

      {/* Sticky Primary Header */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentView === 'shop' && (
          <ShopView
            initialCategory={viewParam || 'all'}
            onNavigate={handleNavigate}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentView === 'product' && (
          <ProductDetailView
            slug={viewParam || 'curry-cut-with-skin'}
            onNavigate={handleNavigate}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentView === 'cuts' && <CutsView onNavigate={handleNavigate} />}

        {currentView === 'subscribe' && <SubscribeView onNavigate={handleNavigate} />}

        {currentView === 'bulk' && <BulkOrdersView />}

        {currentView === 'recipes' && (
          <RecipesView initialSlug={viewParam} onNavigate={handleNavigate} />
        )}

        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}

        {currentView === 'contact' && <ContactView />}

        {currentView === 'checkout' && <CheckoutView onNavigate={handleNavigate} />}

        {currentView === 'confirmation' && (
          <OrderConfirmationView
            orderId={viewParam || 'FC-94821'}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'track' && <TrackOrderView onNavigate={handleNavigate} />}

        {currentView === 'admin' && <AdminView />}
      </main>

      {/* Brand Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenRates={handleOpenRates}
      />

      {/* Floating Desktop WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Cart Drawer Modal */}
      <CartDrawer onNavigateToCheckout={() => handleNavigate('checkout')} />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onNavigateToFullDetail={(slug) => handleNavigate('product', slug)}
      />

      {/* Pincode & Area Selector Modal */}
      <PincodeModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
