'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProjectItem } from '@/data/projects';
import { ArrowUpRight, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const coverImage = project.images[0] || '';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="marble-card group flex flex-col justify-between rounded-xl overflow-hidden"
    >
      <div>
        {/* Cover Screenshot */}
        <div
          onClick={() => onOpenDetails(project)}
          className="relative aspect-video w-full overflow-hidden bg-[#14171a] cursor-pointer"
        >
          {!imageError && coverImage ? (
            <Image
              src={coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-zinc-500">
              <Layers className="h-8 w-8 mb-2 text-zinc-600" />
              <span className="text-xs">{project.title}</span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="rounded-md border border-white/[0.12] bg-[#0c0e10]/90 px-2.5 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md">
              {project.categoryLabel}
            </span>
          </div>

          {project.isSoftwareDownload && (
            <div className="absolute top-3 right-3">
              <span className="rounded-md border border-white/[0.12] bg-[#0c0e10]/90 px-2 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-md">
                Автономный софт
              </span>
            </div>
          )}
        </div>

        {/* Text Details */}
        <div className="p-5 space-y-3">
          <div>
            <h3
              onClick={() => onOpenDetails(project)}
              className="text-lg font-bold text-white group-hover:text-emerald-400 transition cursor-pointer"
            >
              {project.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {project.subtitle}
            </p>
          </div>

          <p className="text-xs leading-relaxed text-zinc-300 line-clamp-3">
            {project.description}
          </p>

          {/* Clean Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-xs text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="border-t border-white/[0.06] bg-[#0d1012]/80 p-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onOpenDetails(project)}
          className="rounded-md border border-white/[0.1] bg-[#14181b] px-3.5 py-2 text-xs font-medium text-zinc-300 hover:border-emerald-500/40 hover:text-white transition"
        >
          Подробнее
        </button>

        <a
          href={project.actionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 px-3.5 py-2 text-xs font-semibold text-zinc-950 transition active:scale-95"
        >
          <span>{project.actionText}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
