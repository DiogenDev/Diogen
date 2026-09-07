'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, ArrowRight } from 'lucide-react';
import { GLOBAL_TELEGRAM_CTA, TELEGRAM_BASE_URL } from '@/data/projects';
import { AUTHOR_INFO } from '@/data/navigation';
import { VkIcon } from './icons/VkIcon';

export default function ContactSection() {
  const customPresets = [
    {
      title: 'Разработка веб-сервиса или сайта',
      description: 'Обсудить создание сервиса под ключ на Next.js и TypeScript.',
      url: `${TELEGRAM_BASE_URL}?text=${encodeURIComponent(
        'Привет! Хочу обсудить разработку веб-сервиса или сайта. Можем созвониться или обсудить детали?'
      )}`,
    },
    {
      title: 'Telegram-бот или Mini App',
      description: 'Создание бота, каталога, медиа-приложения или системы заказов.',
      url: `${TELEGRAM_BASE_URL}?text=${encodeURIComponent(
        'Привет! Меня интересует разработка Telegram-бота или Mini App для моего проекта.'
      )}`,
    },
    {
      title: 'Запрос сборок Seconder',
      description: 'Получение готового дистрибутива для Windows (x64) или Android (APK).',
      url: `${TELEGRAM_BASE_URL}?text=${encodeURIComponent(
        'Привет! Хочу запросить бинарную сборку Seconder (Windows / Android).'
      )}`,
    },
  ];

  return (
    <section id="contact" className="border-b border-white/[0.08] bg-[#07080a] py-20 granite-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="marble-card rounded-2xl p-8 sm:p-12 border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Direct CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs text-emerald-400">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="font-medium">Прямой контакт с инженером</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                Обсудить проект или задачу
              </h2>

              <p className="text-base text-zinc-300 leading-relaxed max-w-xl">
                Если вам требуется современный веб-сервис, Telegram Mini App или автономный прикладной софт — свяжитесь со мной напрямую в удобном мессенджере. Отвечаю оперативно, без посредников и менеджеров.
              </p>

              {/* Action Buttons: Telegram & VK */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={GLOBAL_TELEGRAM_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-6 py-3.5 text-sm font-bold shadow-[0_0_24px_-4px_rgba(16,185,129,0.4)] transition"
                >
                  <Send className="h-4 w-4" />
                  <span>Написать в Telegram</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={AUTHOR_INFO.vkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-sky-500/40 bg-[#12181e] hover:border-sky-400 hover:bg-[#18212a] text-sky-300 hover:text-white px-5 py-3.5 text-sm font-semibold shadow-[0_0_15px_-3px_rgba(14,165,233,0.2)] transition"
                >
                  <VkIcon className="h-4 w-4 text-sky-400" />
                  <span>Связаться ВКонтакте</span>
                </motion.a>
              </div>
            </div>

            {/* Right Column: Scenarios */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1 font-heading">
                Выберите тему для диалога:
              </div>

              {customPresets.map((preset, idx) => (
                <a
                  key={idx}
                  href={preset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-white/[0.06] bg-[#121517]/90 p-4 transition hover:border-emerald-500/40 hover:bg-[#161a1d] group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition">
                      {preset.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    {preset.description}
                  </p>
                </a>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
