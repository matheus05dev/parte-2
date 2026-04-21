"use client";

import BlurText from '../ui/BlurText';
import RotatingText from '../ui/RotatingText';
import { TechCarousel } from '../ui/TechCarousel';
import LightRays from '../ui/LightRays';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FeatureCard } from '../ui/FeatureCard';
import { MoveRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#000000]">
      {/* Immersive Volumetric Background Effect */}
      <div className="absolute inset-0 z-0 bg-black">
        <LightRays
          raysOrigin="bottom-center"
          raysColor="#2563eb"
          raysSpeed={1.0}
          rayLength={3.0}
          lightSpread={1.8}
          mouseInfluence={0.2}
          noiseAmount={0.015}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20 flex flex-col items-center justify-center text-center pointer-events-none">
        
        {/* Rotating pill */}
        <div className="mb-6 sm:mb-10 animate-fade-in-up pointer-events-auto" style={{ animationDuration: '0.8s' }}>
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-[11px] sm:text-sm font-medium text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
            <span className="whitespace-nowrap">O curso para dominar</span>
            <span className="inline-block overflow-hidden" style={{ height: '1.4em', verticalAlign: 'middle' }}>
              <RotatingText
                texts={['Python.', 'Automações n8n.', 'Inteligência Artificial.', 'Engenharia de Dados.']}
                rotationInterval={3200}
                mainClassName="inline-flex text-blue-400 font-extrabold whitespace-nowrap"
                staggerDuration={0.025}
                splitBy="characters"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
              />
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="mb-6 sm:mb-10 max-w-5xl pointer-events-auto flex justify-center">
          <BlurText 
            text="Aprenda Python do zero e construa projetos reais com IA."
            animateBy="words"
            delay={100}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter text-white/90 leading-[1.08] justify-center"
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-20 animate-fade-in-up pointer-events-auto items-center justify-center w-full px-2 sm:px-0" style={{ animationDelay: '200ms', animationDuration: '0.8s' }}>
          <Button variant="primary" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold group">
            Quero começar agora
            <MoveRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-medium text-white/80">
            Ver o que vou aprender
          </Button>
        </div>

        {/* TechCarousel */}
        <div className="mb-14 sm:mb-24 animate-fade-in-up pointer-events-auto w-full" style={{ animationDelay: '300ms', animationDuration: '0.8s' }}>
          <TechCarousel />
        </div>

        {/* 4-Grid Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-6xl animate-fade-in-up pointer-events-auto px-1 sm:px-0" style={{ animationDelay: '400ms', animationDuration: '1s' }}>
          <FeatureCard 
            icon="python"
            label="+40 horas"
            text="Conteúdo direto ao ponto, sem enrolação."
          />
          <FeatureCard 
            icon="clock"
            label="Desde o módulo 1"
            text="Projetos com Python + IA desde o primeiro dia."
          />
          <FeatureCard 
            icon="users"
            label="+20.000 alunos"
            text="Comunidade ativa para dúvidas e networking."
          />
          <FeatureCard 
            icon="award"
            label="Certificado"
            text="Reconhecido pelo mercado de trabalho."
          />
        </div>
      </div>
    </section>
  );
};
