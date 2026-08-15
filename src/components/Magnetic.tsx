"use client";

import { useEffect } from "react";

/**
 * Магнитные элементы: кнопка слегка тянется за курсором, когда он
 * подходит близко, и мягко возвращается на место, когда уходит.
 *
 * Один слушатель на документ вместо обработчика на каждой кнопке.
 * Смещение пишется в переменные --mag-x / --mag-y, а сдвигает
 * элемент уже CSS: так притяжение не конфликтует с подъёмом
 * на наведении, который живёт в отдельной переменной.
 *
 * Возврат идёт не через transition, а тем же циклом кадров:
 * переход на transform превращал бы движение в резину, потому что
 * каждый новый кадр перебивал бы предыдущий на полпути.
 */

/** За сколько пикселей до края кнопки начинается притяжение */
const FIELD = 70;
/** Доля расстояния до курсора, на которую уходит элемент */
const PULL = 0.18;
/**
 * Потолок смещения в пикселях.
 *
 * Без него широкая кнопка уезжала на полсотни пикселей: доля бралась
 * от расстояния до центра, а у кнопки в двести пикселей это расстояние
 * само по себе большое. Соседние кнопки в ряду наезжали друг на друга.
 */
const MAX = 6;
/** Насколько кнопка догоняет цель за кадр */
const EASE = 0.16;

const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));

type Item = {
  el: HTMLElement;
  x: number;
  y: number;
  tx: number;
  ty: number;
};

export default function Magnetic() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-magnet]"));
    if (nodes.length === 0) return;

    const items: Item[] = nodes.map((el) => ({ el, x: 0, y: 0, tx: 0, ty: 0 }));
    let raf = 0;
    let idle = true;

    const frame = () => {
      let moving = false;

      for (const it of items) {
        it.x += (it.tx - it.x) * EASE;
        it.y += (it.ty - it.y) * EASE;

        /* Меньше десятой доли пикселя глазу недоступно. Дотягиваем
           до нуля и перестаём считать, иначе цикл крутится вечно. */
        if (Math.abs(it.tx - it.x) < 0.1 && Math.abs(it.ty - it.y) < 0.1) {
          it.x = it.tx;
          it.y = it.ty;
        } else {
          moving = true;
        }

        if (it.x === 0 && it.y === 0) {
          it.el.style.removeProperty("--mag-x");
          it.el.style.removeProperty("--mag-y");
          delete it.el.dataset.magnetic;
        } else {
          it.el.dataset.magnetic = "on";
          it.el.style.setProperty("--mag-x", `${it.x.toFixed(2)}px`);
          it.el.style.setProperty("--mag-y", `${it.y.toFixed(2)}px`);
        }
      }

      if (moving) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
        idle = true;
      }
    };

    const wake = () => {
      if (idle) {
        idle = false;
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e: PointerEvent) => {
      /* Тянется только ближайшая кнопка.

         Когда реагировали все, кто попал в поле, соседи в одном ряду
         ехали навстречу друг другу и наезжали: между ними двенадцать
         пикселей, а сдвинуться каждый мог на большее. Магнит,
         который притягивает сразу две вещи, и в жизни не бывает. */
      let winner: Item | null = null;
      let best = FIELD;

      for (const it of items) {
        const r = it.el.getBoundingClientRect();

        /* Расстояние считаем до прямоугольника, а не до центра:
           у широкой кнопки поле иначе получилось бы овальным
           и на краях срабатывало бы с запозданием. */
        const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
        const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
        const gap = Math.hypot(dx, dy);

        it.tx = 0;
        it.ty = 0;

        if (gap < best) {
          best = gap;
          winner = it;
        }
      }

      if (winner) {
        const r = winner.el.getBoundingClientRect();
        /* Чем дальше курсор от кромки, тем слабее тяга. Квадрат
           вместо линейной доли: у границы поля кнопка почти
           не шевелится, а не дёргается на входе. */
        const near = 1 - best / FIELD;
        const force = near * near * PULL;
        winner.tx = clamp((e.clientX - (r.left + r.width / 2)) * force);
        winner.ty = clamp((e.clientY - (r.top + r.height / 2)) * force);
      }

      wake();
    };

    /* Ушли со страницы или прокрутили колесом мимо: цель обнуляем,
       иначе кнопка застынет сдвинутой. */
    const release = () => {
      for (const it of items) {
        it.tx = 0;
        it.ty = 0;
      }
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", release);
    document.addEventListener("pointerleave", release);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", release);
      document.removeEventListener("pointerleave", release);
      cancelAnimationFrame(raf);
      for (const it of items) {
        it.el.style.removeProperty("--mag-x");
        it.el.style.removeProperty("--mag-y");
        delete it.el.dataset.magnetic;
      }
    };
  }, []);

  return null;
}
