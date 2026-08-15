"use client";

import { useEffect } from "react";
/* Только тип: при сборке импорт стирается, в бандл ничего не тянет.
   Сама библиотека приезжает динамическим импортом ниже. */
import type Lenis from "lenis";

/**
 * Плавная прокрутка на Lenis: колесо перестаёт дёргать страницу
 * рывками и начинает вести её с инерцией.
 *
 * Библиотека лежит в бандле, а не приезжает с CDN: политика
 * безопасности сайта начинается с default-src 'none' и сторонних
 * доменов не допускает.
 *
 * Не включается там, где мешает: при prefers-reduced-motion и на
 * сенсорных экранах. У телефона своя инерция на уровне системы,
 * и вторая поверх неё ощущается как залипание.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let lenis: Lenis | null = null;
    let raf = 0;
    let dead = false;

    /* Грузим в динамическом импорте: библиотека нужна только тому,
       у кого мышь, и только после гидрации. В первый кадр она
       не попадает вовсе. */
    import("lenis").then(({ default: Ctor }) => {
      if (dead) return;

      lenis = new Ctor({
        duration: 1.1,
        /* Та же кривая, что у переходов: экспоненциальное затухание,
           длинный выкат в конце. */
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        wheelMultiplier: 0.9,
        touchMultiplier: 1.6,
      });

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    /* Якорные ссылки должны ехать тем же движком. Нативный
       scroll-behavior при перехваченной прокрутке не работает,
       и клик по пункту меню просто ничего бы не делал. */
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;

      const target = e.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!link || !hash || hash === "#") return;

      const node = document.querySelector<HTMLElement>(hash);
      if (!node || !lenis) return;

      e.preventDefault();
      lenis.scrollTo(node, { offset: -80, duration: 1.3 });
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      dead = true;
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
