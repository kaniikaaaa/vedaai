import { Flame } from 'lucide-react';

interface VedaLogoProps {
  size?: 'sm' | 'md';
  textColor?: string;
}

export default function VedaLogo({ size = 'md', textColor = 'text-gray-900' }: VedaLogoProps) {
  const iconSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
  const flameSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const textSize = size === 'sm' ? 'text-lg' : 'text-xl';

  return (
    <div className="flex items-center gap-2">
      <div className={`${iconSize} bg-gradient-to-br from-orange-950 via-orange-800 to-orange-700 rounded-lg flex items-center justify-center`}>
        <Flame className={`${flameSize} text-white`} />
      </div>
      <span className={`${textSize} font-bold ${textColor}`}>VedaAI</span>
    </div>
  );
}
