import React from 'react';

interface TornDividerProps {
  fillColor?: string;
  bgColor?: string;
  inverted?: boolean;
  className?: string;
}

export const TornDivider: React.FC<TornDividerProps> = ({
  fillColor = '#FBF6EE',
  bgColor = '#1B1512',
  inverted = false,
  className = '',
}) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`w-full overflow-hidden leading-none select-none ${className} ${
        inverted ? 'rotate-180' : ''
      }`}
    >
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="w-full h-4 md:h-6 block"
        style={{ fill: fillColor }}
      >
        <path d="M0,0 L20,8 L45,2 L70,12 L95,4 L120,14 L145,5 L170,11 L200,3 L230,13 L260,4 L290,14 L320,6 L350,16 L380,5 L410,12 L440,3 L470,15 L500,6 L530,14 L560,4 L590,16 L620,5 L650,13 L680,4 L710,15 L740,6 L770,13 L800,4 L830,14 L860,5 L890,15 L920,4 L950,13 L980,5 L1010,14 L1040,6 L1070,15 L1100,5 L1130,13 L1160,4 L1185,11 L1200,6 L1200,24 L0,24 Z" />
      </svg>
    </div>
  );
};
