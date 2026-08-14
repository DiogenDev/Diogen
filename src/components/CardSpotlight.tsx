"use client";

import { useEffect } from "react";

/**
 * Подсветка, идущая за курсором внутри карточек.
 *
 * Один слушатель на документ вместо обработчика на каждой карточке:
 * координаты пишутся в CSS-переменные --mx / --my ближайшего .glass-card,
 * а рисует пятно уже сам CSS. На сенсорных экранах и при
 * prefers-reduced-motion не подключается вовсе.
 */
export default function CardSpotlight() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
      pending = null;
    };

    const onMove = (e: PointerEvent) => {
      // Целью может прийти не элемент (например, сам документ) —
      // тогда closest вызывать не на чем
      const target = e.target;
      if (!(target instanceof Element)) return;

      const card = target.closest<HTMLElement>(".glass-card");
      if (!card) return;

      const r = card.getBoundingClientRect();
      pending = {
        el: card,
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      };

      // Запись в стиль — раз в кадр, иначе на каждое движение мыши
      // происходит пересчёт layout
      if (!frame) frame = requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
