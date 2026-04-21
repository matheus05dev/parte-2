import React from 'react';

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.912S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.13V3.13S18.28 0 11.914 0zm-3.2 1.814a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z"/>
    <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.109S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.402-3.35 3.402H9.451s-3.24-.052-3.24 3.13v5.4S5.72 24 12.086 24zm3.2-1.814a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10S22 17.523 22 12 17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V18H9v2h6v-2h-2v-2.1a5.01 5.01 0 003.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM7 10.82C5.84 10.4 5 9.3 5 8V7h2v3.82zM19 8c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
  </svg>
);

const iconMap = {
  python: PythonIcon,
  clock: ClockIcon,
  users: UsersIcon,
  award: AwardIcon,
};

interface FeatureCardProps {
  icon: 'python' | 'clock' | 'users' | 'award';
  text: string;
  label?: string;
}

export const FeatureCard = ({ icon, text, label }: FeatureCardProps) => {
  const Icon = iconMap[icon];

  return (
    <div className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1">
      {/* Card */}
      <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden backdrop-blur-sm hover:border-blue-500/20 transition-colors duration-500">
        
        {/* Subtle background orb */}
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-blue-600/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        <div className="relative z-10 p-5 flex items-start gap-4">
          {/* Icon container */}
          <div className="relative shrink-0">
            {/* Ping ring — only visible on hover */}
            <div className="absolute inset-0 rounded-xl border border-blue-500/30 scale-0 group-hover:scale-100 group-hover:animate-ping opacity-0 group-hover:opacity-60 transition-all duration-300" />
            
            <div className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 group-hover:text-blue-400 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300">
              <Icon />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1 pt-0.5">
            {label && (
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-500/80">
                {label}
              </span>
            )}
            <p className="text-[13px] text-white/50 group-hover:text-white/75 leading-relaxed transition-colors duration-300">
              {text}
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/30 transition-all duration-500" />
      </div>
    </div>
  );
};
