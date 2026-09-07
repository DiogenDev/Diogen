'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Award, FileText, CheckCircle } from 'lucide-react';
import { GLOBAL_TELEGRAM_CTA } from '@/data/projects';
import { AUTHOR_INFO } from '@/data/navigation';

interface DiplomaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiplomaViewerModal({ isOpen, onClose }: DiplomaViewerModalProps) {
  const [activeSheet, setActiveSheet] = useState<1 | 2>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
    }
  }, [isOpen, activeSheet]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentImagePath = activeSheet === 1 ? '/credentials/diploma-1.png' : '/credentials/diploma-2.png';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-3 sm:p-6 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col w-full max-w-5xl h-[88vh] rounded-xl border border-white/[0.1] bg-[#0e1113] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#121619] px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="rounded-md border border-white/[0.1] bg-[#181d21] p-2 text-emerald-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 font-heading">
                Диплом • {AUTHOR_INFO.name}
                <span className="hidden sm:inline-flex items-center gap-1 rounded bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-xs text-emerald-400 font-sans">
                  <CheckCircle className="h-3 w-3" /> Верифицирован
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Квалификация: Дипломированный IT-специалист (Высшая Школа Программирования)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/[0.06] hover:text-white transition"
            aria-label="Закрыть модальное окно диплома"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/[0.06] bg-[#101315] px-4 sm:px-6 py-2.5 gap-3 text-xs">
          {/* Sheet Selector */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSheet(1)}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 transition font-medium ${
                activeSheet === 1
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_12px_-2px_rgba(16,185,129,0.3)]'
                  : 'border border-white/[0.08] bg-[#14181b] text-zinc-300 hover:text-white'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Лист 1 (Титул и квалификация)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSheet(2)}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 transition font-medium ${
                activeSheet === 2
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_12px_-2px_rgba(16,185,129,0.3)]'
                  : 'border border-white/[0.08] bg-[#14181b] text-zinc-300 hover:text-white'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Лист 2 (Приложение и оценки)</span>
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
              disabled={zoomLevel <= 1}
              className="rounded-md border border-white/[0.08] bg-[#14181b] p-1.5 text-zinc-300 disabled:opacity-40 hover:text-white"
              aria-label="Уменьшить"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="w-12 text-center text-zinc-300">{Math.round(zoomLevel * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
              disabled={zoomLevel >= 2.5}
              className="rounded-md border border-white/[0.08] bg-[#14181b] p-1.5 text-zinc-300 disabled:opacity-40 hover:text-white"
              aria-label="Увеличить"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="rounded-md border border-white/[0.08] bg-[#14181b] px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
            >
              Сброс
            </button>
          </div>
        </div>

        {/* Viewport with real scanned images */}
        <div className="relative flex-1 overflow-auto bg-[#070809] p-4 flex items-center justify-center">
          <div
            className="relative transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            <Image
              src={currentImagePath}
              alt={`Диплом лист ${activeSheet}`}
              width={900}
              height={1250}
              className="max-h-[72vh] w-auto rounded-lg border border-white/[0.08] shadow-2xl object-contain"
              priority
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between border-t border-white/[0.08] bg-[#121619] px-4 sm:px-6 py-3 gap-3 text-xs text-zinc-400">
          <div>
            Официальный диплом IT ВШП. Для подтверждения выписки свяжитесь в Telegram:
          </div>
          <a
            href={GLOBAL_TELEGRAM_CTA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 font-semibold text-zinc-950 transition"
          >
            <span>Запросить в Telegram</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
