'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AUTHOR_INFO } from '@/data/navigation';
import { GLOBAL_TELEGRAM_CTA } from '@/data/projects';
import { Send, Award, ShieldCheck, Globe, Bot, Monitor, Smartphone } from 'lucide-react';
import { VkIcon } from './icons/VkIcon';

interface HeroProps {
  onOpenDiploma: () => void;
}

export default function Hero({ onOpenDiploma }: HeroProps) {
  const directions = [
    {
      icon: Globe,
      title: 'Веб-сервисы и платформы',
      desc: 'Современные интерактивные сайты и сервисы на Next.js и TypeScript с адаптацией под любые устройства.',
    },
    {
      icon: Bot,
      title: 'Telegram Mini Apps и боты',
      desc: 'Автоматизация, мультимедиа-сервисы и полноценные Web Apps прямо внутри Telegram.',
    },
    {
      icon: Monitor,
      title: 'Системное ПО для Windows',
      desc: 'Автономные десктопные приложения на C++ и Qt с локальной базой SQLite без передачи данных в облако.',
    },
    {
      icon: Smartphone,
      title: 'Мобильные приложения Android',
      desc: 'Приватные утилиты с нативным интерфейсом на Canvas и контролем ресурсов устройства.',
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] py-16 sm:py-24 granite-bg">
      {/* Soft ambient light accent */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-10 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 items-center">
          
          {/* Left Column: Executive Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Qualification pill */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-xs text-emerald-400 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="font-medium">Дипломированный IT-специалист</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08] font-heading">
                Ринат Ахтемов
                <span className="block text-xl sm:text-2xl lg:text-3xl font-normal text-emerald-400 mt-2 font-sans">
                  DiogenDev <span className="text-zinc-500 font-light">/ Диоген разработка</span>
                </span>
              </h1>
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-300 pt-1 font-sans">
                Разработка надежных веб-систем, интерактивных Telegram Mini Apps, коммерческих каталогов и автономного софта. 
                Строгая архитектура, продуманный интерфейс и полное сопровождение проекта от концепта до продакшна.
              </p>
            </div>

            {/* Contact & Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {/* Telegram Primary Button */}
              <motion.a
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(16,185,129,0.45)' }}
                whileTap={{ scale: 0.97 }}
                href={GLOBAL_TELEGRAM_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-zinc-950 shadow-[0_0_20px_-3px_rgba(16,185,129,0.4)] transition hover:bg-emerald-400"
              >
                <Send className="h-4 w-4" />
                <span>Написать в Telegram</span>
              </motion.a>

              {/* VK Direct Button */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={AUTHOR_INFO.vkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-sky-500/40 bg-[#141b22] px-5 py-3.5 text-sm font-semibold text-sky-300 shadow-[0_0_15px_-3px_rgba(14,165,233,0.2)] transition hover:border-sky-400 hover:bg-[#1a232c] hover:text-white"
              >
                <VkIcon className="h-4 w-4 text-sky-400" />
                <span>Связаться в ВК</span>
              </motion.a>

              {/* Diploma Modal Trigger */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={onOpenDiploma}
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-[#121619] px-5 py-3.5 text-sm font-medium text-zinc-200 transition hover:border-emerald-500/40 hover:text-white"
              >
                <Award className="h-4 w-4 text-emerald-400" />
                <span>Смотреть диплом</span>
              </motion.button>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">10+</div>
                <div className="text-xs text-zinc-400 mt-0.5">Запущенных систем</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">100%</div>
                <div className="text-xs text-zinc-400 mt-0.5">Без шаблонов и воды</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">IT ВШП</div>
                <div className="text-xs text-zinc-400 mt-0.5">Диплом</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Directions Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="marble-card rounded-2xl p-6 sm:p-7 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-heading">
                  Ключевые направления
                </span>
                <span className="rounded-full bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                  Full-Cycle
                </span>
              </div>

              <div className="space-y-3">
                {directions.map((dir, idx) => {
                  const Icon = dir.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3.5 rounded-xl border border-white/[0.04] bg-[#14181c]/70 p-3.5 hover:border-emerald-500/30 transition group"
                    >
                      <div className="rounded-lg border border-white/[0.08] bg-[#1c2227] p-2.5 text-emerald-400 shrink-0 mt-0.5 group-hover:border-emerald-500/40 transition">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition">
                          {dir.title}
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                          {dir.desc}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Direct channels bottom */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-3">
                  <a
                    href={AUTHOR_INFO.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-medium"
                  >
                    Telegram @kavup &rarr;
                  </a>
                  <span className="text-zinc-600">•</span>
                  <a
                    href={AUTHOR_INFO.vkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline font-medium"
                  >
                    ВКонтакте &rarr;
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
