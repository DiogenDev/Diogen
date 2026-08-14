"use client";

import { useEffect } from "react";

/**
 * Единственный наблюдатель на всю страницу: помечает элементы с классом
 * `reveal` атрибутом data-shown, когда они входят в кадр.
 *
 * Начальное скрытие включает инлайновый скрипт в <head> — только если в
 * браузере есть IntersectionObserver. Без JS и на старых движках содержимое
 * просто видно сразу, а на случай сбоя стоит страховочный таймер.
 */
export default function RevealController() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (nodes.length === 0) return;

    const showAll = () => nodes.forEach((n) => (n.dataset.shown = "true"));

    if (!("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.shown = "true";
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    nodes.forEach((n) => io.observe(n));

    // Страховка: если что-то пошло не так, содержимое не останется скрытым.
    const failsafe = window.setTimeout(showAll, 2500);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return null;
}
