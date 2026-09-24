import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-colors cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#C8262B] text-white hover:bg-[#9E191E] shadow-sm hover:shadow active:scale-[0.98]',
    secondary:
      'bg-[#1B1512] text-[#FBF6EE] hover:bg-[#342A24] active:scale-[0.98]',
    outline:
      'border-2 border-[#1B1512]/15 text-[#1B1512] bg-transparent hover:bg-[#1B1512]/5 active:scale-[0.98]',
    whatsapp:
      'bg-[#25D366] text-white hover:bg-[#1EBE5D] font-semibold shadow-sm active:scale-[0.98]',
    ghost:
      'text-[#1B1512] hover:bg-[#1B1512]/5 active:scale-[0.98]',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </motion.button>
  );
};
