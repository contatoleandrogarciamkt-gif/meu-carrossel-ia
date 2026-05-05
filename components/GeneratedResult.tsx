import React, { useState } from 'react';
import { CarouselData, DesignTemplate, CarouselFormat } from '@/types/carousel';
import SlidePreview from './SlidePreview';
import { toPng } from 'html-to-image';
import { Download, Copy, Check, MessageSquare, Hash, ChevronLeft, ChevronRight } from 'lucide-react';

interface GeneratedResultProps {
  data: CarouselData;
  design: DesignTemplate;
  format: CarouselFormat;
}

export default function GeneratedResult({ data, design, format }: GeneratedResultProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const downloadImages = async () => {
    setIsDownloading(true);
    try {
      for (let i = 0; i < data.slides.length; i++) {
        const node = document.getElementById(`slide-${i}`);
        if (node) {
          const dataUrl = await toPng(node, { quality: 1, pixelRatio: 2 });
          const link = document.createElement('a');
          link.download = `slide-${(i + 1).toString().padStart(2, '0')}.png`;
          link.href = dataUrl;
          link.click();
        }
      }
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Left Column: Slide Preview & Thumbnails */}
      <div className="lg:col-span-8 space-y-6">
        <div className="relative group">
          <SlidePreview 
            id={`slide-${activeSlide}`}
            slide={data.slides[activeSlide]} 
            design={design} 
            format={format} 
          />
          
          <button 
            onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
            disabled={activeSlide === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setActiveSlide(prev => Math.min(data.slides.length - 1, prev + 1))}
            disabled={activeSlide === data.slides.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {data.slides.map((slide, i) => (
            <button
              key={slide.number}
              onClick={() => setActiveSlide(i)}
              className={`flex-shrink-0 w-24 aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                activeSlide === i ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'
              }`}
            >
              <div className="w-full h-full relative pointer-events-none scale-[0.2] origin-top-left" style={{ width: '500%', height: '500%' }}>
                 <SlidePreview slide={slide} design={design} format={format} />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={downloadImages}
          disabled={isDownloading}
          className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          <Download size={20} />
          {isDownloading ? 'Gerando arquivos...' : 'Baixar Imagens (PNG)'}
        </button>

        {/* Hidden area for background rendering of all slides during download if needed */}
        <div className="hidden">
           {data.slides.map((slide, i) => (
             <SlidePreview key={`hidden-${i}`} id={`slide-${i}`} slide={slide} design={design} format={format} />
           ))}
        </div>
      </div>

      {/* Right Column: Caption & Hashtags */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-500" /> Legenda
            </h3>
            <button 
              onClick={() => copyToClipboard(data.caption, setCopiedCaption)}
              className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all"
            >
              {copiedCaption ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
            {data.caption}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Hash size={18} className="text-indigo-500" /> Hashtags
            </h3>
            <button 
              onClick={() => copyToClipboard(data.hashtags.join(' '), setCopiedHashtags)}
              className="text-indigo-600 hover:text-indigo-700 p-2 rounded-lg hover:bg-indigo-50 transition-all"
            >
              {copiedHashtags ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.hashtags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
