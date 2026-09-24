import React from 'react';

interface StampProps {
  text: string;
  subtext?: string;
  color?: 'chili' | 'herb' | 'charcoal' | 'saffron';
  rotation?: number; // degrees
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Stamp: React.FC<StampProps> = ({
  text,
  subtext,
  color = 'chili',
  rotation = -8,
  size = 'md',
  className = '',
}) => {
  const colorMap = {
    chili: 'text-[#C8262B] border-[#C8262B]',
    herb: 'text-[#2F5D46] border-[#2F5D46]',
    charcoal: 'text-[#1B1512] border-[#1B1512]',
    saffron: 'text-[#C97B14] border-[#C97B14]',
  };

  const sizeMap = {
    sm: 'w-16 h-16 text-[9px]',
    md: 'w-20 h-20 text-[10px]',
    lg: 'w-24 h-24 text-[12px]',
  };

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`relative inline-flex flex-col items-center justify-center rounded-full border-2 border-dashed p-1 font-bold uppercase tracking-widest text-center shadow-xs select-none transition-transform hover:scale-105 ${colorMap[color]} ${sizeMap[size]} ${className}`}
    >
      <div className="absolute inset-1 rounded-full border border-current opacity-40 pointer-events-none" />
      <span className="font-serif-display font-extrabold leading-tight px-1 z-10">{text}</span>
      {subtext && (
        <span className="text-[8px] tracking-normal font-sans font-medium opacity-85 z-10">
          {subtext}
        </span>
      )}
    </div>
  );
};
