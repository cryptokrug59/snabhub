import logo from '@/assets/logo.svg';
interface SnabHubLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}
const SnabHubLogo = ({
  className = '',
  variant = 'dark'
}: SnabHubLogoProps) => <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
    <img src={logo} alt="СнабХаб-Групп" className="h-14 w-auto flex-shrink-0 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
    <div className="flex flex-col justify-center">
      <span className={`font-[800] text-3xl tracking-tighter leading-none transition-colors duration-300 ${variant === 'dark' ? 'text-slate-900 group-hover:text-brand-primary' : 'text-white group-hover:text-brand-accent'}`} style={{
      fontFamily: "'Manrope', sans-serif"
    }}>СнабХаб-Групп</span>
      <span className={`text-[11px] font-bold uppercase tracking-widest leading-none mt-1 transition-colors duration-300 ${variant === 'dark' ? 'text-slate-600 group-hover:text-brand-accent' : 'text-slate-400 group-hover:text-white'}`}>
    </span>
    </div>
  </div>;
export default SnabHubLogo;