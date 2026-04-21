"use client";

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '../ui/Button';

interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  items?: NavItem[];
}

const defaultItems: NavItem[] = [
  { label: 'Início', href: '#' },
  { label: 'Conteúdo', href: '#conteudo' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Comunidade', href: '#comunidade' },
];

export const Header: React.FC<HeaderProps> = ({ items = defaultItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const liquidBaseRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const navRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Calculate Mobile Dropdown Height manually for GSAP
  const calculateDropdownHeight = () => {
    if (!dropdownRef.current) return 56;
    const itemsHeight = items.length * 42; // aprox 42px per item (smaller on mobile)
    return 56 + itemsHeight + 24; // base + items + padding
  };

  useLayoutEffect(() => {
    if (!containerRef.current || !dropdownRef.current) return;
    
    // Setup GSAP Timeline for Mobile Menu
    const tl = gsap.timeline({ paused: true });
    
    tl.to(containerRef.current, {
      height: calculateDropdownHeight,
      duration: 0.5,
      ease: 'power3.inOut'
    });
    
    const links = dropdownRef.current.querySelectorAll('.mobile-link');
    tl.fromTo(links, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, "-=0.2");
    
    tlRef.current = tl;
    
    return () => {
      tl.kill();
    };
  }, [items]);

  const toggleMobileMenu = () => {
    if (!tlRef.current) return;
    if (isMobileOpen) {
      tlRef.current.reverse();
      setIsMobileOpen(false);
    } else {
      tlRef.current.play();
      setIsMobileOpen(true);
    }
  };

  // Align the main white pill to the active nav item
  const alignPill = () => {
    if (!pillRef.current || !liquidBaseRef.current || !navRefs.current[activeIndex]) return;
    const activeEl = navRefs.current[activeIndex];
    
    // We get positions relative to the liquidBase wrapper
    const targetRect = activeEl!.getBoundingClientRect();
    const baseRect = liquidBaseRef.current.getBoundingClientRect();
    
    gsap.to(pillRef.current, {
      x: targetRect.left - baseRect.left,
      y: targetRect.top - baseRect.top,
      width: targetRect.width,
      height: targetRect.height,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out'
    });
  };

  useEffect(() => {
    alignPill();
    window.addEventListener('resize', alignPill);
    return () => window.removeEventListener('resize', alignPill);
  }, [activeIndex]);

  // Generate Splashes on click using GSAP and SVG Filter (No black square bug!)
  const triggerLiquidSplash = (index: number) => {
    if (!liquidBaseRef.current || !navRefs.current[index]) return;
    
    setActiveIndex(index);
    const activeEl = navRefs.current[index]!;
    const targetRect = activeEl.getBoundingClientRect();
    const baseRect = liquidBaseRef.current.getBoundingClientRect();
    
    const centerX = targetRect.left - baseRect.left + targetRect.width / 2;
    const centerY = targetRect.top - baseRect.top + targetRect.height / 2;
    
    const dropsCount = 8;
    const colors = ['#ffffff', '#bfdbfe', '#60a5fa', '#3b82f6']; // white, blue tones
    
    for (let i = 0; i < dropsCount; i++) {
      const drop = document.createElement('div');
      drop.className = 'absolute rounded-full pointer-events-none z-[-1]';
      
      const size = 12 + Math.random() * 10; // 12 to 22px
      drop.style.width = `${size}px`;
      drop.style.height = `${size}px`;
      drop.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Initially place drop at the center of the active pill
      drop.style.left = `${centerX - size / 2}px`;
      drop.style.top = `${centerY - size / 2}px`;
      
      liquidBaseRef.current.appendChild(drop);
      
      const angle = (Math.random() * Math.PI * 2);
      const distance = 40 + Math.random() * 60; // How far it flies
      
      const endX = centerX - size / 2 + Math.cos(angle) * distance;
      const endY = centerY - size / 2 + Math.sin(angle) * distance;
      
      gsap.to(drop, {
        x: endX - (centerX - size/2),
        y: endY - (centerY - size/2),
        scale: 0.1,
        opacity: 0,
        duration: 0.6 + Math.random() * 0.4,
        ease: "power2.out",
        onComplete: () => {
          if (drop.parentNode) {
            drop.parentNode.removeChild(drop);
          }
        }
      });
    }
  };

  return (
    <>
      {/* SVG Filter for the Liquid Gooey Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="fluid-goo" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
            result="fluid-goo"
          />
          <feComposite in="SourceGraphic" in2="fluid-goo" operator="atop" />
        </filter>
      </svg>

      <header className="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 w-[96%] sm:w-[95%] max-w-[1000px] z-50">
        <div 
          ref={containerRef}
          className="relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-[20px] sm:rounded-[30px] p-[8px] sm:p-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col will-change-[height]"
          style={{ height: '56px' }}
        >
          {/* Top Bar */}
          <div className="relative flex items-center justify-between w-full h-[40px] sm:h-[44px] shrink-0 px-2 sm:px-3">
            
            {/* Hamburger (Mobile Info) */}
            <button 
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 p-1 z-20 outline-none"
              onClick={toggleMobileMenu}
            >
              <div className={`w-full h-[2px] bg-white transition-transform ${isMobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <div className={`w-full h-[2px] bg-white transition-opacity ${isMobileOpen ? 'opacity-0' : 'opacity-100'}`} />
              <div className={`w-full h-[2px] bg-white transition-transform ${isMobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </button>

            {/* Logo */}
            <div className="relative flex items-center z-20 ml-1 sm:ml-2 md:ml-4">
              <img 
                src="/assets/Logo-Asimov-Black.webp" 
                alt="Asimov Academy" 
                className="h-7 sm:h-10 md:h-[44px] w-auto invert contrast-200 brightness-200 opacity-90" 
              />
            </div>

            {/* Desktop Liquid Navigation */}
            <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
              <div className="relative w-full h-full flex justify-center items-center pointer-events-auto">
                
                {/* Liquid Base Layer (Only this gets the gooey filter) */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ filter: 'url(#fluid-goo)' }}
                  ref={liquidBaseRef}
                >
                  <div 
                    ref={pillRef}
                    className="absolute bg-white rounded-full z-0 opacity-0"
                    style={{ top: 0, left: 0, height: '40px', width: '80px' }} // Initial raw state before GSAP applies
                  />
                </div>

                {/* Navigation Links Layer (No filter, text is crisp) */}
                <nav className="relative flex">
                  <ul className="flex list-none p-0 m-0 relative z-10 gap-1">
                    {items.map((item, index) => {
                      const isActive = activeIndex === index;
                      return (
                        <li key={index} ref={el => { navRefs.current[index] = el; }}>
                          <a
                            href={item.href}
                            onClick={e => {
                              e.preventDefault();
                              triggerLiquidSplash(index);
                            }}
                            className={`relative inline-block px-6 py-2 text-[15px] font-semibold transition-colors duration-300 outline-none ${
                              isActive ? 'text-[#020617]' : 'text-white/80 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>

            {/* CTA Button */}
            <div className="relative z-20">
               <Button variant="primary" className="!text-xs sm:!text-sm !py-1.5 sm:!py-2 !px-3 sm:!px-5 !rounded-full !h-auto">
                 <span className="hidden sm:inline">Área do Aluno</span>
                 <span className="sm:hidden">Entrar</span>
               </Button>
            </div>
          </div>

          {/* Mobile Dropdown Area */}
          <div ref={dropdownRef} className="md:hidden mt-3 px-1.5 flex flex-col gap-1.5">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="mobile-link text-white/90 text-base font-medium p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                onClick={() => {
                  setActiveIndex(index);
                  toggleMobileMenu();
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

        </div>
      </header>
    </>
  );
};
