"use client";

import { useEffect } from "react";

/**
 * Запуск роликов в карточках по наведению.
 *
 * Атрибут autoplay здесь не годится: восемь видео, стартующих
 * одновременно при загрузке, съедают и трафик, и кадры. Файл
 * начинает грузиться только когда курсор дошёл до карточки,
 * а на уходе ролик ставится на паузу и отматывается назад.
 *
 * Один слушатель на документ вместо обработчика на каждом видео.
 * На сенсорных экранах не подключается: наведения там нет, и
 * ролик всё равно не запустился бы.
 */
export default function ClipPlayer() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const clipOf = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      return target.closest(".glass-card")?.querySelector("video") ?? null;
    };

    const onEnter = (e: PointerEvent) => {
      const video = clipOf(e.target);
      if (!video) return;
      /* play() возвращает промис и отклоняется, если пользователь
         увёл курсор до старта. Это штатный ход событий, не ошибка. */
      void video.play().catch(() => {});
    };

    const onLeave = (e: PointerEvent) => {
      const video = clipOf(e.target);
      if (!video) return;
      const to = e.relatedTarget;
      if (to instanceof Node && video.closest(".glass-card")?.contains(to)) return;
      video.pause();
      video.currentTime = 0;
    };

    document.addEventListener("pointerover", onEnter);
    document.addEventListener("pointerout", onLeave);

    return () => {
      document.removeEventListener("pointerover", onEnter);
      document.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return null;
}
