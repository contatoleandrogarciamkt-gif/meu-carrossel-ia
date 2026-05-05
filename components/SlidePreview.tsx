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
      case 'premium': // Now "Designer Pro - Estratégia YouTube"
        return {
          container: 'bg-[#FDFCF8] text-slate-900 p-0 flex flex-col relative overflow-hidden',
          headline: 'text-[42px] leading-[1.1] font-[900] tracking-tighter text-[#0A1D37]',
          support: 'text-xl font-bold text-slate-700 leading-tight',
          number: 'bg-[#FFD700] text-[#0A1D37] w-12 h-12 flex items-center justify-center rounded-full font-black text-xl shadow-md border-4 border-white',
          footer: 'bg-white p-6 flex justify-between items-center border-t border-slate-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]',
          accents: (
            <>
              {/* Top accent - Image half */}
              <div className="absolute top-0 right-0 w-[45%] h-full z-0">
                <div 
                  className="w-full h-full bg-cover bg-center rounded-l-[80px] shadow-2xl transition-all duration-500"
                  style={slide.imageUrl ? { backgroundImage: `url(${slide.imageUrl})` } : { backgroundColor: '#0A1D37' }}
                />
                {/* Floating Icon over image */}
                <div className="absolute top-10 left-[-24px] bg-[#FFD700] p-4 rounded-2xl shadow-xl rotate-12">
                   <IconComponent size={32} className="text-[#0A1D37]" />
                </div>
              </div>
              {/* Background Shapes */}
              <div className="absolute top-10 left-10 w-20 h-1 bg-[#FFD700] rounded-full" />
              <div className="absolute bottom-32 left-[-20px] w-40 h-40 bg-[#0A1D37]/5 rounded-full" />
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
        "w-full shadow-2xl relative select-none overflow-hidden", 
        getAspectRatio(),
        styles.container
      )}
      style={(design !== 'premium' && slide.imageUrl) ? { 
        backgroundImage: `url(${slide.imageUrl})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        color: 'white'
      } : {}}
    >
      {/* Background Overlay for simple templates */}
      {(design !== 'premium' && slide.imageUrl) && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-0" />
      )}

      {styles.accents}
      
      {/* Top Header */}
      <div className="p-10 pb-0 flex justify-between items-start z-10">
        <div className={styles.number}>{slide.number}</div>
        {design !== 'premium' && (
          <div className="flex flex-col items-end">
            <div className={cn("text-[10px] uppercase tracking-[0.2em] font-bold mb-1", slide.imageUrl ? "text-white/70" : "opacity-50")}>
              {slide.type}
            </div>
            <IconComponent size={24} className={slide.imageUrl ? 'text-white' : (design === 'premium' ? 'text-yellow-500' : '')} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={cn(
        "px-10 flex-1 flex flex-col justify-center z-10",
        design === 'premium' ? "w-[55%] pr-4" : "w-full"
      )}>
        <div className="space-y-6">
          <h2 className={cn(styles.headline, (design !== 'premium' && slide.imageUrl) && "text-white drop-shadow-lg")}>
            {slide.headline}
          </h2>
          <div className="flex">
            <p className={cn(
              styles.support, 
              (design !== 'premium' && slide.imageUrl) && "text-white/90 bg-black/40 backdrop-blur-sm p-3 rounded-lg"
            )}>
              {slide.supportText}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={cn(styles.footer, "z-10", (design !== 'premium' && slide.imageUrl) && "text-white border-white/30 bg-transparent")}>
        <div className="flex flex-col">
          <span className="font-black">Canal Quero Viajar</span>
          <span className="text-[10px] opacity-70">Assista ao vídeo completo</span>
        </div>
        {design === 'premium' && (
          <div className="bg-[#0A1D37] text-white p-2 rounded-lg">
             <IconComponent size={16} />
          </div>
        )}
      </div>
    </div>
  );
}
