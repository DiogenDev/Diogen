import React from 'react';
import { HardDrive, Activity, Zap, ShieldCheck, Database, Cpu } from 'lucide-react';

export default function SystemMetrics() {
  const metrics = [
    {
      icon: Database,
      value: '0 байт',
      label: 'Передача в облако',
      detail: 'Seconder PC & Android хранят данные строго локально в SQLite',
    },
    {
      icon: Activity,
      value: '<15 МБ',
      label: 'Потребление ОЗУ',
      detail: 'Нативный Win32/Qt процесс без использования тяжелого Electron',
    },
    {
      icon: Zap,
      value: '0.4-0.6с',
      label: 'LCP Веб-платформ',
      detail: 'Отказоустойчивая Next.js App Router сборка с пре-рендером',
    },
    {
      icon: Cpu,
      value: '60 FPS',
      label: 'Нативный рендеринг',
      detail: 'Прямая отрисовка диаграмм на QPainter и Android Canvas',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Защита от утечек',
      detail: 'Изоляция системных демонов и безопасность учетных записей',
    },
    {
      icon: HardDrive,
      value: '10 Проектов',
      label: 'В боевом каталоге',
      detail: 'От системных фоновых служб до high-load Telegram Web Apps',
    },
  ];

  return (
    <section id="metrics" className="border-b border-obsidian-700/60 bg-obsidian-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="font-mono text-xs text-emerald-neon uppercase tracking-wider mb-1">
              // TELEMETRY & ARCHITECTURE
            </div>
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-ash-100">
              Инженерные стандарты и показатели
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-ash-400">
            Измеряемые характеристики систем вместо маркетинговых лозунгов. Каждое техническое решение обосновано на уровне ядра.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="obsidian-card rounded p-5 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-neon">
                    {item.value}
                  </span>
                  <div className="rounded border border-obsidian-700 bg-obsidian-900 p-2 text-emerald-primary group-hover:border-emerald-border transition">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <div className="font-mono text-sm font-semibold text-ash-100">
                    {item.label}
                  </div>
                  <div className="text-xs text-ash-400 mt-1 leading-relaxed">
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
