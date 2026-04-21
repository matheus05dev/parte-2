import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    
    const baseClass = "group relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-full active:scale-95";
    
    // Linear / Antimetal styled variants
    const variants = {
      primary: "bg-white text-black hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
      secondary: "bg-white/[0.03] text-white border border-white/10 hover:bg-white/[0.08] hover:border-white/20",
      glass: "bg-black/20 text-white backdrop-blur-lg border border-white/10 hover:bg-black/40"
    };

    return (
      <button 
        ref={ref}
        className={`${baseClass} ${variants[variant]} ${className || ''}`}
        {...props}
      >
        {/* Subtle shine effect div for primary buttons */}
        {variant === 'primary' && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {props.children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
