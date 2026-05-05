import React, { useState } from 'react';
import { GenerationRequest, SlideCount, CarouselFormat, DesignTemplate } from '@/types/carousel';
import DesignSelector from './DesignSelector';
import { Youtube, FileText, Layout, Copy, Check } from 'lucide-react';

interface CarouselFormProps {
  onSubmit: (data: GenerationRequest) => void;
  isLoading: boolean;
}

export default function CarouselForm({ onSubmit, isLoading }: CarouselFormProps) {
  const [formData, setFormData] = useState<GenerationRequest>({
    youtubeUrl: '',
    transcript: '',
    slidesCount: 6,
    format: '1:1',
    designTemplate: 'clean',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Youtube size={16} className="text-red-500" /> Link do Vídeo YouTube
        </label>
        <input
          type="url"
          required
          placeholder="https://youtube.com/watch?v=..."
          className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={formData.youtubeUrl}
          onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <FileText size={16} className="text-blue-500" /> Transcrição do Vídeo (Opcional)
        </label>
        <textarea
          placeholder="Cole a transcrição aqui para melhores resultados..."
          className="w-full h-32 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm"
          value={formData.transcript}
          onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
        />
        {!formData.transcript && (
          <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
            ⚠️ Para um resultado melhor, cole a transcrição do vídeo.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Quantidade de Slides</label>
          <select
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
            value={formData.slidesCount}
            onChange={(e) => setFormData({ ...formData, slidesCount: parseInt(e.target.value) as SlideCount })}
          >
            <option value={6}>6 Slides</option>
            <option value={8}>8 Slides</option>
            <option value={10}>10 Slides</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Formato</label>
          <select
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value as CarouselFormat })}
          >
            <option value="1:1">Quadrado (1:1)</option>
            <option value="4:5">Retrato (4:5)</option>
            <option value="3:4">Retrato (3:4)</option>
          </select>
        </div>
      </div>

      <DesignSelector 
        selected={formData.designTemplate} 
        onSelect={(design) => setFormData({ ...formData, designTemplate: design })} 
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
      >
        {isLoading ? 'Gerando Carrossel...' : 'Gerar Carrossel'}
      </button>
    </form>
  );
}
