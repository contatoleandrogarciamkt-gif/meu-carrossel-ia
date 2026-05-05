import React from 'react';
import { SlideContent, DesignTemplate, CarouselFormat } from '@/types/carousel';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as LucideIcons from 'lucide-react';

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
  // Dynamic Icon Helper
  const IconComponent = (slide.iconName && (LucideIcons as any)[slide.iconName]) 
    ? (LucideIcons as any)[slide.iconName] 
    : LucideIcons.Sparkles;

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
      case 'premium': // Now "Estratégia YouTube"
        return {
          container: 'bg-[#F8FAFC] text-slate-900 p-10 flex flex-col justify-between relative overflow-hidden',
          headline: 'text-4xl md:text-5xl font-black tracking-tight text-[#1E3A8A] leading-[1.1]',
          support: 'text-xl font-bold text-slate-600 bg-yellow-400/20 px-2 py-1 rounded-lg inline-block',
          number: 'bg-[#1E3A8A] text-yellow-400 w-12 h-12 flex items-center justify-center rounded-2xl font-black text-xl shadow-lg',
          footer: 'text-[#1E3A8A] font-black flex justify-between items-center border-t-4 border-yellow-400 pt-6',
          accents: (
            <>
              <div className="absolute top-10 right-10 text-yellow-400/20 scale-[5] -rotate-12">
                <IconComponent size={40} />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1E3A8A]/5 rounded-full" />
            </>
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
      
      <div className="flex justify-between items-start z-10">
        <div className={styles.number}>{slide.number}</div>
        <div className="flex flex-col items-end">
           <div className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold mb-1">
            {slide.type}
          </div>
          <IconComponent size={24} className={design === 'premium' ? 'text-yellow-500' : ''} />
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-center z-10">
        <h2 className={styles.headline}>{slide.headline}</h2>
        <div className="flex">
          <p className={styles.support}>{slide.supportText}</p>
        </div>
      </div>

      <div className={cn(styles.footer, "z-10")}>
        <span>Canal Quero Viajar</span>
        <span className="text-[10px] opacity-70">Assista ao vídeo completo</span>
      </div>
    </div>
  );
}
