'use client';

import React, { useState } from 'react';
import CarouselForm from '@/components/CarouselForm';
import GeneratedResult from '@/components/GeneratedResult';
import { CarouselData, GenerationRequest } from '@/types/carousel';
import { Sparkles, Wand2, Layout } from 'lucide-react';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CarouselData | null>(null);
  const [currentConfig, setCurrentConfig] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (config: GenerationRequest) => {
    setIsGenerating(true);
    setError(null);
    setResult(null);
    setCurrentConfig(config);

    try {
      const response = await fetch('/api/generate-carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        if (data.fallback) {
          setResult(data.fallback);
        }
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <Sparkles size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Gerador de Carrossel IA
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <span>v1.0 (BETA)</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Panel: Form */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Crie seu post</h2>
                <p className="text-slate-500">Transforme vídeos em carrosséis de alto impacto.</p>
              </div>
              <CarouselForm onSubmit={handleGenerate} isLoading={isGenerating} />
            </div>
          </aside>

          {/* Main Area: Preview/Loading/Error */}
          <section className="lg:col-span-8 min-h-[600px] flex flex-col">
            {isGenerating ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-pulse">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 animate-bounce">
                  <Wand2 size={32} />
                </div>
                <p className="text-lg font-semibold text-slate-700">A mágica está acontecendo...</p>
                <p className="text-slate-400 text-sm">Analisando transcrição e criando slides estratégicos</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {error && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-700 text-sm flex gap-2">
                    <span>⚠️</span> {error}
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-slate-800">Resultado do Carrossel</h2>
                  <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">
                    {result.slides.length} Slides • {currentConfig?.format}
                  </span>
                </div>
                <GeneratedResult 
                  data={result} 
                  design={currentConfig?.designTemplate || 'clean'} 
                  format={currentConfig?.format || '1:1'} 
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center border-4 border-dashed border-slate-200 rounded-3xl p-12 text-center space-y-4 bg-white/50">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <Layout size={40} />
                </div>
                <div className="max-w-xs mx-auto">
                  <h3 className="text-xl font-bold text-slate-800">Pronto para começar?</h3>
                  <p className="text-slate-500 mt-2">
                    Preencha as informações ao lado e clique em "Gerar Carrossel" para ver a prévia.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-12 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            &copy; 2026 Gerador de Carrossel IA - Canal Quero Viajar. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}

