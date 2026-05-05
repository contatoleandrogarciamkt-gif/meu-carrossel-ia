import React from 'react';
import { DesignTemplate } from '@/types/carousel';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DesignSelectorProps {
  selected: DesignTemplate;
  onSelect: (design: DesignTemplate) => void;
}

const templates = [
  {
    id: 'clean' as const,
    name: 'Viagem Clean',
    description: 'Fundo claro, azul e moderno',
    preview: 'bg-travel-light border-travel-blue'
  },
  {
    id: 'alert' as const,
    name: 'Alerta Aeroporto',
    description: 'Contraste alto, fundo escuro e amarelo',
    preview: 'bg-alert-black border-alert-yellow'
  },
  {
    id: 'premium' as const,
    name: 'Conteúdo Premium',
    description: 'Elegante, degradê escuro e dourado',
    preview: 'bg-premium-dark border-premium-gold'
  }
];

export default function DesignSelector({ selected, onSelect }: DesignSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-700">Modelo de Design</label>
      <div className="grid grid-cols-1 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left",
              selected === t.id 
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" 
                : "border-slate-200 bg-white hover:border-slate-300"
            )}
          >
            <div className={cn("w-12 h-12 rounded-lg border", t.preview)} />
            <div>
              <p className="font-semibold text-slate-900">{t.name}</p>
              <p className="text-xs text-slate-500">{t.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
