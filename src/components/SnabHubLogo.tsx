import LogoIcon from './LogoIcon';

interface SnabHubLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

const SnabHubLogo = ({ className = '', variant = 'dark' }: SnabHubLogoProps) => (
  <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
    <LogoIcon />
    <div className="flex flex-col justify-center">
      <span
        className={`font-[800] text-3xl tracking-tighter leading-none transition-colors duration-300 ${
          variant === 'dark'
            ? 'text-slate-900 group-hover:text-brand-primary'
            : 'text-white group-hover:text-brand-accent'
        }`}
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        СнабХаб-Групп
      </span>
      <span
        className={`text-[11px] font-bold uppercase tracking-widest leading-none mt-1 transition-colors duration-300 ${
          variant === 'dark'
            ? 'text-slate-600 group-hover:text-brand-accent'
            : 'text-slate-400 group-hover:text-white'
        }`}
      >
        Комплексное снабжение
      </span>
    </div>
  </div>
);

export default SnabHubLogo;
