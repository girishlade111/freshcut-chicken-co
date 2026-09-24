import React from 'react';

interface MarqueeProps {
  items?: string[];
  speed?: number;
  className?: string;
}

const DEFAULT_ITEMS = [
  '100% Fresh · Never Frozen',
  'Cut Fresh to Order',
  'Zero Antibiotic Residue',
  '0-4°C Cold Chain Delivered',
  '60-Min Express In Pune',
  'FSSAI Certified Laboratory Tested',
  'Custom Butchery Cuts',
];

export const Marquee: React.FC<MarqueeProps> = ({
  items = DEFAULT_ITEMS,
  className = '',
}) => {
  return (
    <div className={`overflow-hidden py-2.5 bg-[#1B1512] text-[#FBF6EE] border-y border-[#1B1512] select-none ${className}`}>
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-4 text-xs md:text-sm font-medium tracking-wider uppercase">
            <span className="text-[#F2A33A] mr-4 text-base">✦</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
