import { Flame } from 'lucide-react';

interface VedaLogoProps {
  size?: 'sm' | 'md';
  textColor?: string;
  variant?: 'gradient' | 'dark';
}

export default function VedaLogo({ size = 'md', textColor = 'text-[#303030]', variant = 'gradient' }: VedaLogoProps) {
  const iconSize = size === 'sm' ? 'w-7 h-7' : 'w-10 h-10';
  const flameSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  const textSize = size === 'sm' ? 'text-xl' : 'text-[28px]';
  const iconRadius = size === 'sm' ? 'rounded-[8px]' : 'rounded-[15px]';
  const iconBg = variant === 'dark'
    ? 'bg-[#303030]'
    : 'bg-gradient-to-br from-orange-950 via-orange-800 to-orange-700';

  return (
    <div className="flex items-center gap-2">
      <div className={`${iconSize} ${iconBg} ${iconRadius} flex items-center justify-center`}>
        <Flame className={`${flameSize} text-white`} />
      </div>
      <span className={`${textSize} font-bold tracking-[-0.06em] ${textColor}`}>VedaAI</span>
    </div>
  );
}
