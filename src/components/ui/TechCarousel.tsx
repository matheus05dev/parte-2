"use client";

import React from 'react';

const technologies = [
  "Python", "LangChain", "OpenAI", "Agno Framework", "LlamaIndex", 
  "Pandas", "SQL", "CrewAI", "Docker", "AWS", 
  "FastAPI", "n8n", "TensorFlow", "PyTorch"
];

// Duplicate the array twice to ensure smooth infinite seamless loop
const duplicatedTechs = [...technologies, ...technologies, ...technologies];

export const TechCarousel = () => {
  return (
    <div className="relative flex w-full max-w-[100vw] overflow-hidden select-none" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50%)); }
          }
          .animate-scroller {
            animation: infinite-scroll 40s linear infinite;
          }
          .animate-scroller:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div className="flex w-max min-w-full shrink-0 animate-scroller items-center gap-8 sm:gap-16 py-3 sm:py-4">
        {duplicatedTechs.map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 group cursor-pointer transition-colors"
          >
            <span className="text-sm sm:text-xl md:text-2xl font-black text-white/20 uppercase tracking-wider sm:tracking-widest group-hover:text-blue-500 transition-colors duration-300">
              {tech}
            </span>
            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white/10 group-hover:bg-blue-500/50 transition-colors ml-8 sm:ml-16" />
          </div>
        ))}
      </div>
    </div>
  );
};
