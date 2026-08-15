"use client";

import { useEffect, useRef } from "react";

/**
 * Точечное поле: сетка точек, которые подрастают и расходятся под курсором,
 * а сами по себе едва заметно дышат.
 *
 * Идея взята из скилла lightweight-3d-effects (фон в духе Vanta), но написана
 * на canvas 2D вручную: библиотеки оттуда грузятся с CDN, а политика
 * безопасности сайта запрещает сторонние домены. Заодно в бандл не попадают
 * ни three.js, ни p5.js.
 *
 * Цвет берётся из CSS-переменной --field-color, поэтому поле само
 * подстраивается под тему.
 */
export default function CanvasField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const GAP = 28;
    const RADIUS = 165;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let t = 0;

    // Цель и текущее положение курсора разведены, чтобы поле догоняло
    // мышь плавно, а не прыгало за каждым событием
    const target = { x: -9999, y: -9999 };
    const cursor = { x: -9999, y: -9999 };

    let color = "#34d399";
    const readColor = () => {
      const v = getComputedStyle(canvas).getPropertyValue("--field-color").trim();
      if (v) color = v;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      for (let x = GAP / 2; x < width + GAP; x += GAP) {
        for (let y = GAP / 2; y < height + GAP; y += GAP) {
          const dx = x - cursor.x;
          const dy = y - cursor.y;
          const dist = Math.hypot(dx, dy);

          const near = dist < RADIUS ? 1 - dist / RADIUS : 0;
          // Плавная кривая вместо линейной: ореол вокруг курсора мягче
          const glow = near * near * (3 - 2 * near);
          const wave = reduced ? 0.5 : Math.sin(x * 0.01 + y * 0.013 + t) * 0.5 + 0.5;

          // В покое сетка должна читаться как задуманный элемент, а не
          // угадываться; у курсора точки заметно подрастают и наливаются
          const size = 1 + wave * 0.4 + glow * 3.4;
          const alpha = 0.26 + wave * 0.1 + glow * 0.6;

          // Точки чуть отодвигаются от курсора, поле «расступается»
          const push = glow * 7;
          const px = dist > 0 ? x + (dx / dist) * push : x;
          const py = dist > 0 ? y + (dy / dist) * push : y;

          ctx.globalAlpha = Math.min(alpha, 0.92);
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!running) return;
      t += 0.01;
      cursor.x += (target.x - cursor.x) * 0.1;
      cursor.y += (target.y - cursor.y) * 0.1;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Курсор далеко за пределами поля, гасим ореол
      const outside = x < -RADIUS || y < -RADIUS || x > width + RADIUS || y > height + RADIUS;
      target.x = outside ? -9999 : x;
      target.y = outside ? -9999 : y;
    };

    readColor();
    resize();
    draw();

    // Вне экрана цикл не крутится: фон не жжёт батарею впустую
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    ro.observe(canvas);

    // Тема переключается, цвет точек должен уехать за ней
    const mo = new MutationObserver(() => {
      readColor();
      if (!running) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
