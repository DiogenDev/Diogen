"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Lightbox.module.css";

type Slide = { src: string; alt: string };

const MIN_SCALE = 1;
const MAX_SCALE = 5;

/**
 * Просмотрщик картинок: открывается кликом по любому изображению
 * с атрибутом data-zoomable, листает соседние снимки того же проекта
 * (группа задаётся data-gallery) и умеет приближать.
 *
 * Слушатель один на весь документ, карточки остаются серверными
 * компонентами и ничего не знают про эту логику.
 */
export default function Lightbox() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const openerRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = slides.length > 0;

  const reset = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const close = useCallback(() => {
    setSlides([]);
    reset();
    // Возвращаем фокус туда, откуда открыли
    openerRef.current?.focus();
    openerRef.current = null;
  }, [reset]);

  const go = useCallback(
    (step: number) => {
      setIndex((i) => {
        const next = i + step;
        if (next < 0 || next >= slides.length) return i;
        return next;
      });
      reset();
    },
    [slides.length, reset],
  );

  /* ---------- открытие по клику ---------- */

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const img = target.closest<HTMLImageElement>("img[data-zoomable]");
      if (!img) return;

      e.preventDefault();
      openerRef.current = img;

      // Собираем всю группу снимков этого проекта
      const group = img.dataset.gallery;
      const nodes = group
        ? Array.from(document.querySelectorAll<HTMLImageElement>(`img[data-gallery="${group}"]`))
        : [img];

      setSlides(nodes.map((n) => ({ src: n.currentSrc || n.src, alt: n.alt })));
      setIndex(Math.max(0, nodes.indexOf(img)));
      reset();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reset]);

  /* ---------- клавиатура и блокировка прокрутки ---------- */

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") setScale((s) => Math.min(s + 0.5, MAX_SCALE));
      else if (e.key === "-") setScale((s) => Math.max(s - 0.5, MIN_SCALE));
    };

    document.addEventListener("keydown", onKey);

    // Фон не должен уезжать под просмотрщиком
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, go]);

  /* ---------- приближение и перетаскивание ---------- */

  const onWheel = (e: React.WheelEvent) => {
    const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale - e.deltaY * 0.0025));
    setScale(next);
    if (next === 1) setOffset({ x: 0, y: 0 });
  };

  const onDoubleClick = () => {
    if (scale > 1) reset();
    else setScale(2.5);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (scale <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    setOffset({ x: d.ox + (e.clientX - d.x), y: d.oy + (e.clientY - d.y) });
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  if (!open) return null;

  const slide = slides[index];

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`Просмотр: ${slide.alt}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={styles.bar}>
        <span className={styles.counter}>
          {index + 1} / {slides.length}
        </span>

        <div className={styles.tools}>
          <button
            type="button"
            className={styles.tool}
            onClick={() => setScale((s) => Math.max(s - 0.5, MIN_SCALE))}
            disabled={scale <= MIN_SCALE}
            aria-label="Отдалить"
          >
            −
          </button>
          <span className={styles.zoomValue}>{Math.round(scale * 100)}%</span>
          <button
            type="button"
            className={styles.tool}
            onClick={() => setScale((s) => Math.min(s + 0.5, MAX_SCALE))}
            disabled={scale >= MAX_SCALE}
            aria-label="Приблизить"
          >
            +
          </button>
          <button ref={closeRef} type="button" className={styles.tool} onClick={close} aria-label="Закрыть">
            ✕
          </button>
        </div>
      </div>

      <figure className={styles.stage} onWheel={onWheel}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={slide.src}
          alt={slide.alt}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            cursor: scale > 1 ? (dragRef.current ? "grabbing" : "grab") : "zoom-in",
          }}
          onDoubleClick={onDoubleClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          draggable={false}
        />
        <figcaption className={styles.caption}>{slide.alt}</figcaption>
      </figure>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.nav} ${styles.prev}`}
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Предыдущий снимок"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.next}`}
            onClick={() => go(1)}
            disabled={index === slides.length - 1}
            aria-label="Следующий снимок"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
