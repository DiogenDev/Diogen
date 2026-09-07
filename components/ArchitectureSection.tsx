import React from 'react';
import { Globe, Bot, Monitor, Smartphone, Check } from 'lucide-react';
import { GLOBAL_TELEGRAM_CTA } from '@/data/projects';

export default function ArchitectureSection() {
  const services = [
    {
      icon: Globe,
      title: 'Веб-сервисы и порталы под ключ',
      description:
        'Создание интерактивных сервисов, корпоративных сайтов и витрин на Next.js, React и TypeScript. Высокая скорость загрузки, адаптация под смартфоны и чистый код.',
      bullets: ['Next.js App Router, SSR/SSG', 'Быстрая отрисовка и SEO', 'Интеграция сторонних API и баз данных'],
    },
    {
      icon: Bot,
      title: 'Telegram Mini Apps и боты',
      description:
        'Разработка полноценных веб-приложений внутри Telegram (TWA), автоматизация процессов, аудио- и видео-стриминг, каталоги и системы заказов.',
      bullets: ['Telegram Web Apps (TWA)', 'Рекомендательные алгоритмы', 'Удобное взаимодействие с аудиторией'],
    },
    {
      icon: Monitor,
      title: 'Автономный десктопный софт',
      description:
        'Системные программы для Windows на C++ и Qt. Прямое взаимодействие с системными API, работа в трее, низкое потребление памяти и локальное хранилище в SQLite.',
      bullets: ['Низкое потребление ОЗУ (<15 МБ)', 'Win32 API и перехват системных событий', '100% приватность без облаков'],
    },
    {
      icon: Smartphone,
      title: 'Мобильные приложения Android',
      description:
        'Создание приватных Android-приложений на Kotlin без передачи аналитики на сторонние серверы. Нативная визуализация на Canvas и бережный расход аккумулятора.',
      bullets: ['Android SDK и UsageStatsManager', 'Нативная отрисовка на Canvas', 'Локальные базы данных Room / SQLite'],
    },
  ];

  return (
    <section id="services" className="border-b border-white/[0.06] bg-[#090b0d]/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Специализация
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Направления разработки и решения
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 leading-relaxed">
            Комплексный подход: от проектирования структуры данных до интерфейса и развертывания в продакшн.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="marble-card rounded-xl p-6 sm:p-7 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="inline-flex rounded-lg border border-white/[0.08] bg-[#14181b] p-3 text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                  {item.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-zinc-400">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
