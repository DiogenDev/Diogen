'use client';

import React from 'react';
import { Award, GraduationCap, CheckCircle2 } from 'lucide-react';

interface CredentialsSectionProps {
  onOpenDiploma: () => void;
}

export default function CredentialsSection({ onOpenDiploma }: CredentialsSectionProps) {
  const points = [
    {
      title: 'Профильная подготовка',
      desc: 'Диплом Высшей Школы Программирования (IT ВШП) по направлению информационных технологий и прикладной инженерии.',
    },
    {
      title: 'Прикладная и инженерная база',
      desc: 'Глубокое понимание структур данных, принципов построения баз данных, сетей, алгоритмов оптимизации и безопасности.',
    },
    {
      title: 'Реальный коммерческий опыт',
      desc: 'Свыше 10 запущенных боевых проектов: веб-порталы, Telegram-боты, автономное системное и мобильное ПО.',
    },
  ];

  return (
    <section id="credentials" className="border-b border-white/[0.08] bg-[#07080a] py-20 granite-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="marble-card rounded-2xl p-8 sm:p-12 border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs text-emerald-400">
                <Award className="h-4 w-4" />
                <span>Официальная квалификация</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                Дипломированный IT-специалист
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-sans">
                Диплом Высшей Школы Программирования (IT ВШП) по направлению информационных технологий в сочетании с многолетней коммерческой практикой. Это позволяет решать сложные прикладные и архитектурные задачи без шаблонных ограничений.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenDiploma}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-5 py-3 text-sm font-bold shadow-[0_0_20px_-4px_rgba(16,185,129,0.3)] transition active:scale-95"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Посмотреть оригинал диплома (2 листа)</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3">
              {points.map((pt, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 space-y-1"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{pt.title}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-6 font-sans">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
