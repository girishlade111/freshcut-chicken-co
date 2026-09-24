import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, X, ArrowRight } from 'lucide-react';
import { SHOP_CONFIG } from '../../config/shop';
import { usePincodeStore } from '../../store/usePincodeStore';
import { Button } from '../ui/Button';

export const PincodeModal: React.FC = () => {
  const { isModalOpen, closeModal, checkPincode, currentPincode, isServiceable, areaName } = usePincodeStore();
  const [inputPin, setInputPin] = useState(currentPincode);
  const [feedback, setFeedback] = useState<{ serviceable: boolean; message: string } | null>(null);

  if (!isModalOpen) return null;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPin || inputPin.length < 6) {
      setFeedback({ serviceable: false, message: 'Please enter a valid 6-digit Indian pincode.' });
      return;
    }
    const res = checkPincode(inputPin);
    setFeedback(res);
  };

  const selectArea = (pin: string) => {
    setInputPin(pin);
    const res = checkPincode(pin);
    setFeedback(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FBF6EE] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#1B1512]/10 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-[#1B1512]/60 hover:text-[#1B1512] p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#C8262B]/10 flex items-center justify-center text-[#C8262B]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif-display font-bold text-[#1B1512]">
              Select Delivery Location
            </h3>
            <p className="text-xs text-[#5E524C]">
              We deliver fresh chilled cuts in {SHOP_CONFIG.city} within 45-60 minutes.
            </p>
          </div>
        </div>

        <form onSubmit={handleCheck} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={inputPin}
              onChange={(e) => {
                setInputPin(e.target.value.replace(/\D/g, ''));
                setFeedback(null);
              }}
              placeholder="Enter 6-digit Pincode (e.g. 411004)"
              className="flex-1 bg-white border border-[#1B1512]/20 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1B1512] focus:outline-none focus:border-[#C8262B] focus:ring-1 focus:ring-[#C8262B]"
            />
            <Button type="submit" variant="primary" size="md">
              Check
            </Button>
          </div>

          {feedback && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                feedback.serviceable
                  ? 'bg-[#EBF3EE] text-[#2F5D46] border border-[#2F5D46]/20'
                  : 'bg-[#F4DCD0] text-[#9E191E] border border-[#C8262B]/20'
              }`}
            >
              {feedback.serviceable ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2F5D46]" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-[#C8262B]" />
              )}
              <div className="leading-snug">{feedback.message}</div>
            </div>
          )}
        </form>

        <div className="mt-5 pt-4 border-t border-[#1B1512]/10">
          <p className="text-xs font-semibold text-[#1B1512] mb-2 uppercase tracking-wider">
            Popular {SHOP_CONFIG.city} Service Zones:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SHOP_CONFIG.deliveryAreas.map((area) => (
              <button
                key={area.pincode}
                onClick={() => selectArea(area.pincode)}
                className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  currentPincode === area.pincode
                    ? 'border-[#C8262B] bg-[#C8262B]/5 font-semibold text-[#C8262B]'
                    : 'border-[#1B1512]/10 bg-white/60 hover:bg-white text-[#1B1512]'
                }`}
              >
                <div className="font-medium truncate">{area.name}</div>
                <div className="text-[11px] text-[#5E524C] flex items-center justify-between mt-1">
                  <span>PIN: {area.pincode}</span>
                  <span className="text-[#2F5D46] font-medium">{area.deliveryTimeMins}m</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="secondary" size="sm" onClick={closeModal}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
