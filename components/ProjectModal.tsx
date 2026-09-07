'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem, TELEGRAM_BASE_URL } from '@/data/projects';
import { X, ExternalLink, Send, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setActiveImageIndex(0);
    setImageError({});
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentImage = project.images[activeImageIndex] || '';
  const isCurrentImageError = !!imageError[activeImageIndex];

  const discussTelegramUrl = `${TELEGRAM_BASE_URL}?text=${encodeURIComponent(
    `Привет! Меня интересует проект "${project.title}", хочу обсудить разработку аналогичного решения.`
  )}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-3 sm:p-6 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl rounded-xl border border-white/[0.1] bg-[#0e1113] p-0 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#121619] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-emerald-400">
              {project.categoryLabel}
            </span>
            <h3 className="text-xl font-bold text-white">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/[0.06] hover:text-white transition"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[78vh] overflow-y-auto p-6 space-y-6">
          
          {/* Main Gallery Preview */}
          <div className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-[#161a1d] aspect-video flex items-center justify-center">
            {!isCurrentImageError && currentImage ? (
              <Image
                src={currentImage}
                alt={`${project.title} скриншот ${activeImageIndex + 1}`}
                fill
                className="object-contain"
                onError={() => {
                  setImageError((prev) => ({ ...prev, [activeImageIndex]: true }));
                }}
              />
            ) : (
              <div className="text-zinc-500 text-sm">Скриншот недоступен</div>
            )}

            {/* Carousel Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? project.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-md hover:bg-black/80 transition"
                  aria-label="Предыдущий слайд"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === project.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-md hover:bg-black/80 transition"
                  aria-label="Следующий слайд"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {project.images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-16 w-24 shrink-0 rounded-md overflow-hidden border transition ${
                    activeImageIndex === idx
                      ? 'border-emerald-500 shadow-[0_0_12px_-2px_rgba(16,185,129,0.4)]'
                      : 'border-white/[0.1] opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Миниатюра ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              О проекте
            </h4>
            <p className="text-sm leading-relaxed text-zinc-200">
              {project.description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Ключевые возможности и реализация
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02] p-3 text-xs text-zinc-300"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Стек технологий
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-200 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] bg-[#121619] px-6 py-4">
          <div className="text-xs text-zinc-400">
            {project.subtitle}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={discussTelegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/[0.12] bg-[#161a1d] px-4 py-2 text-xs font-medium text-zinc-200 hover:border-emerald-500/40 hover:text-white transition"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Обсудить похожий проект</span>
            </a>

            <a
              href={project.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 transition active:scale-95"
            >
              <span>{project.actionText}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
