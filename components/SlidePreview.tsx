import React from 'react';
import { SlideContent, DesignTemplate, CarouselFormat } from '@/types/carousel';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SlidePreviewProps {
  slide: SlideContent;
  design: DesignTemplate;
  format: CarouselFormat;
  id?: string;
}

export default function SlidePreview({ slide, design, format, id }: SlidePreviewProps) {
  const getAspectRatio = () => {
    switch (format) {
      case '4:5': return 'aspect-[4/5]';
      case '3:4': return 'aspect-[3/4]';
      default: return 'aspect-square';
    }
  };

  const getDesignStyles = () => {
    switch (design) {
      case 'alert':
        return {
          container: 'bg-alert-black text-white p-10 flex flex-col justify-between relative overflow-hidden',
          headline: 'text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-alert-yellow',
          support: 'text-xl font-medium text-slate-300',
          number: 'bg-alert-yellow text-alert-black px-3 py-1 font-black rounded-sm',
          footer: 'text-alert-yellow font-bold border-t border-alert-yellow/30 pt-4 flex justify-between items-center',
          accents: (
            <div className="absolute top-0 right-0 w-32 h-32 bg-alert-yellow/10 -mr-16 -mt-16 rotate-45" />
          )
        };
      case 'premium':
        return {
          container: 'bg-gradient-premium text-white p-12 flex flex-col justify-between relative border border-premium-gold/20 shadow-inner',
          headline: 'text-4xl md:text-5xl font-serif font-bold italic tracking-tight text-premium-gold leading-tight',
          support: 'text-lg font-light text-slate-400 italic',
          number: 'border border-premium-gold text-premium-gold w-10 h-10 flex items-center justify-center rounded-full font-serif',
          footer: 'text-premium-gold/60 text-sm flex justify-between items-center font-medium tracking-widest uppercase',
          accents: (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-premium-gold/50 to-transparent" />
          )
        };
      default: // clean
        return {
          container: 'bg-travel-light text-slate-900 p-10 flex flex-col justify-between border border-slate-100',
          headline: 'text-4xl md:text-5xl font-extrabold tracking-tight text-travel-blue leading-tight',
          support: 'text-xl font-medium text-slate-600',
          number: 'bg-travel-blue text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold',
          footer: 'text-travel-blue/70 font-semibold flex justify-between items-center text-sm',
          accents: (
            <div className="absolute top-0 left-0 w-2 h-full bg-travel-blue" />
          )
        };
    }
  };

  const styles = getDesignStyles();

  return (
    <div 
      id={id}
      className={cn(
        "w-full shadow-2xl relative select-none", 
        getAspectRatio(),
        styles.container
      )}
    >
      {styles.accents}
      
      <div className="flex justify-between items-start">
        <div className={styles.number}>{slide.number}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold">
          {slide.type}
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-center">
        <h2 className={styles.headline}>{slide.headline}</h2>
        <p className={styles.support}>{slide.supportText}</p>
      </div>

      <div className={styles.footer}>
        <span>Canal Quero Viajar</span>
        <span className="text-[10px] opacity-70">Assista ao vídeo completo</span>
      </div>
    </div>
  );
}
