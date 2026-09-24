import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, MapPin } from 'lucide-react';
import { SHOP_CONFIG } from '../../config/shop';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePincodeStore } from '../../store/usePincodeStore';

export const AnnouncementBar: React.FC = () => {
  const { t } = useLanguage();
  const { currentPincode, openModal } = usePincodeStore();

  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    // Check if within 07:00 AM to 09:00 PM
    const now = new Date();
    const hours = now.getHours();
    setIsOpenNow(hours >= 7 && hours < 21);
  }, []);

  return (
    <div className="bg-[#1B1512] text-[#FBF6EE] text-xs py-1.5 px-4 border-b border-[#342A24]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Store Status & Express ETA */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium">
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isOpenNow ? 'bg-[#2F5D46]' : 'bg-[#C8262B]'
              }`}
            />
            <span>{isOpenNow ? t('openNow') : 'Opens 7:00 AM'}</span>
          </span>
          <span className="text-[#FBF6EE]/30 hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1 text-[#FBF6EE]/80">
            <Clock className="w-3.5 h-3.5 text-[#F2A33A]" />
            <span>Today's Express ETA: <b>45-60 Mins</b></span>
          </span>
        </div>

        {/* Center: Free Delivery Hook */}
        <div className="hidden md:flex items-center gap-1 text-[#F2A33A] font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FREE Delivery on all orders above ₹{SHOP_CONFIG.freeDeliveryAbove}</span>
        </div>

        {/* Right: Quick Pincode chip */}
        <div className="flex items-center gap-2">
          <button
            onClick={openModal}
            className="flex items-center gap-1 text-[#FBF6EE]/90 hover:text-white transition-colors cursor-pointer"
          >
            <MapPin className="w-3 h-3 text-[#C8262B]" />
            <span className="underline decoration-dotted">{currentPincode}</span>
            <span className="text-[10px] text-[#F2A33A] ml-0.5">({t('change')})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
