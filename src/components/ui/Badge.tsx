import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'fresh' | 'bestseller' | 'antibiotic_free' | 'chef_special' | 'limited' | 'neutral' | 'success';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
  size = 'sm',
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  const variantClasses = {
    fresh: 'bg-[#EBF3EE] text-[#2F5D46] border border-[#2F5D46]/20 font-semibold',
    bestseller: 'bg-[#F2A33A]/15 text-[#8F5608] border border-[#F2A33A]/40 font-semibold',
    antibiotic_free: 'bg-[#2F5D46] text-white font-medium',
    chef_special: 'bg-[#C8262B] text-white font-medium',
    limited: 'bg-[#F4DCD0] text-[#9E191E] border border-[#C8262B]/20 font-semibold',
    neutral: 'bg-[#1B1512]/5 text-[#5E524C] border border-[#1B1512]/10 font-medium',
    success: 'bg-[#2F5D46]/10 text-[#2F5D46] border border-[#2F5D46]/30 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full whitespace-nowrap tracking-wide select-none ${sizeClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
