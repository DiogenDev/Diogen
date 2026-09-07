'use client';

import React from 'react';
import { AUTHOR_INFO, NAV_LINKS } from '@/data/navigation';
import { GLOBAL_TELEGRAM_CTA } from '@/data/projects';
import { Send, ShieldCheck } from 'lucide-react';
import { VkIcon } from './icons/VkIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080a] py-12 text-zinc-400 text-xs granite-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-emerald-500/30 bg-[#121517]">
              <img
                src="/logo.png"
                alt="DiogenDev Logo"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm font-heading">
                  {AUTHOR_INFO.name}
                </span>
                <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[11px] text-zinc-300">
                  {AUTHOR_INFO.alias}
                </span>
              </div>
              <p className="text-xs text-zinc-400 max-w-md font-sans">
                Инженерия веб-систем, Telegram-ботов, мобильных и десктопных решений. Дипломированный специалист.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition text-zinc-400 text-xs"
              >
                {link.label}
              </a>
            ))}
            
            {/* VK Link */}
            <a
              href={AUTHOR_INFO.vkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition font-medium"
            >
              <VkIcon className="h-3.5 w-3.5" />
              <span>ВКонтакте</span>
            </a>

            {/* Telegram Link */}
            <a
              href={GLOBAL_TELEGRAM_CTA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition font-medium"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{AUTHOR_INFO.telegramHandle}</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            &copy; {currentYear} {AUTHOR_INFO.name} ({AUTHOR_INFO.tag}). Все права защищены.
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Диплом IT ВШП • Подтвержденная квалификация</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
