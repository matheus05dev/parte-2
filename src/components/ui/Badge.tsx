import React from 'react';

export const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group relative inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] overflow-hidden backdrop-blur-sm cursor-default hover:bg-white/[0.04] transition-all duration-300">
      {/* Moving gradient border effect often seen in Frame.io */}
      <div className="absolute inset-0 w-full h-full opacity-50">
         <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Glowing dot indicator */}
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
      
      <span className="text-white/80 text-[13px] font-medium tracking-wide">
        {children}
      </span>
    </div>
  );
};
