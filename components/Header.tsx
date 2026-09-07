'use client';

import React, { useState } from 'react';
import { NAV_LINKS, AUTHOR_INFO } from '@/data/navigation';
import { Send, Menu, X } from 'lucide-react';
import { VkIcon } from './icons/VkIcon';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07080a]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Author Brand Identity */}
        <a href="#" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-emerald-500/40 bg-[#121517] shadow-[0_0_15px_-3px_rgba(16,185,129,0.35)] transition group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_-2px_rgba(16,185,129,0.5)]">
            <img
              src="/logo.png"
              alt="DiogenDev Logo"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-emerald-400 transition font-heading">
                {AUTHOR_INFO.name}
              </span>
              <span className="hidden sm:inline-block rounded bg-white/[0.06] px-1.5 py-0.5 text-[11px] text-zinc-400 border border-white/[0.08]">
                {AUTHOR_INFO.tag}
              </span>
            </div>
            <span className="text-xs text-zinc-400">
              {AUTHOR_INFO.alias}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-zinc-300 hover:text-emerald-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Direct Contact Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* VK Button */}
          <a
            href={AUTHOR_INFO.vkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-[#14181b] hover:border-sky-500/50 hover:bg-[#181e23] hover:text-sky-400 text-zinc-300 px-3 py-2 text-xs font-semibold transition active:scale-95"
            title="Связаться ВКонтакте"
          >
            <VkIcon className="h-4 w-4 text-sky-400" />
            <span>VK</span>
          </a>

          {/* Telegram Button */}
          <a
            href={AUTHOR_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 text-xs font-bold shadow-[0_0_20px_-4px_rgba(16,185,129,0.4)] transition active:scale-95"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Telegram</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden items-center justify-center p-2 text-zinc-400 hover:text-white"
          aria-label="Открыть меню"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0c0e11] px-4 py-4 space-y-3">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-white/[0.05] hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={AUTHOR_INFO.vkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md border border-white/[0.1] bg-[#14181b] py-2 text-xs font-semibold text-sky-400"
            >
              <VkIcon className="h-4 w-4" />
              <span>ВКонтакте</span>
            </a>
            <a
              href={AUTHOR_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md bg-emerald-500 py-2 text-xs font-bold text-zinc-950"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
