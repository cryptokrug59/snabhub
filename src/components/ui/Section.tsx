import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  id?: string;
  variant?: 'white' | 'gray' | 'dark';
  diagonal?: 'top' | 'bottom' | 'both' | 'none';
  className?: string;
}

const Section = ({ 
  children, 
  id, 
  variant = 'white', 
  diagonal = 'none',
  className 
}: SectionProps) => {
  const variants = {
    white: 'bg-white text-slate-900',
    gray: 'bg-slate-100 text-slate-900',
    dark: 'bg-brand-dark text-white',
  };

  return (
    <section 
      id={id}
      className={cn(
        'py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative',
        variants[variant],
        diagonal === 'top' && 'diagonal-clip-top',
        diagonal === 'bottom' && 'diagonal-clip-bottom',
        diagonal === 'both' && 'diagonal-clip',
        className
      )}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};

export default Section;
