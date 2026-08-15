import fs from "node:fs";
import path from "node:path";

import { GITHUB_USER, SITE_URL } from "./site";

/**
 * Наличие скриншота проверяется на этапе сборки: положили файл в
 * public/projects, и он появится на сайте, убрали, и вместо него снова
 * встанет заглушка. Руками в коде править ничего не нужно.
 *
 * Файл читается только на сервере. Импортировать этот модуль в
 * клиентский компонент нельзя: node:fs туда не попадёт.
 */
const PUBLIC_DIR = path.join(process.cwd(), "public");

function onDisk(src: string): boolean {
  try {
    return fs.existsSync(path.join(PUBLIC_DIR, src));
  } catch {
    return false;
  }
}

export type Preview = {
  src: string;
  alt: string;
  kind: "desktop" | "phone";
  /** Файла нет на диске, вместо картинки встанет заглушка. */
  pending: boolean;
};

function shot(src: string, alt: string, kind: "desktop" | "phone"): Preview {
  return { src, alt, kind, pending: !onDisk(src) };
}

/**
 * Живое превью. Ролик кладётся рядом со скриншотом под тем же именем:
 * public/projects/<id>.webm или .mp4. Появился файл, и карточка при
 * наведении показывает его вместо картинки, убрали, и вернулась картинка.
 * Руками в коде править ничего не нужно.
 */
export type Clip = { webm: string | null; mp4: string | null };

function clip(id: string): Clip | null {
  const webm = `/projects/${id}.webm`;
  const mp4 = `/projects/${id}.mp4`;
  const hasWebm = onDisk(webm);
  const hasMp4 = onDisk(mp4);
  if (!hasWebm && !hasMp4) return null;
  return { webm: hasWebm ? webm : null, mp4: hasMp4 ? mp4 : null };
}

/** Одна строка из разбора: число и что оно означает. */
export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  platform: string;
  /** Роль в проекте: что именно делалось, без общих слов. */
  role: string;
  /** Описание архитектуры и решения, ровно два предложения. */
  summary: string;
  /** Цифры из самого проекта. Ничего про клиентов и конверсии здесь нет. */
  metrics: Metric[];
  stack: string[];
  repo: string | null;
  demo: { href: string; label: string } | null;
  /** Один или несколько экранов приложения. Пустой массив: превью нет. */
  previews: Preview[];
  /** Зацикленный ролик поверх превью, если файл лежит на диске. */
  clip: Clip | null;
  /** Ширина плитки в бенто-сетке из двенадцати колонок. */
  col: 4 | 5 | 6 | 7 | 8;
  /** Главный кейс: крупный кегль, метрики в строку, высокое превью. */
  lead?: boolean;
};

const repo = (name: string) => `https://github.com/${GITHUB_USER}/${name}`;

/**
 * Адреса опубликованных кейсов. Пустая строка: кнопки не будет,
 * вместо неё встанет подпись «демо нет». Переехал домен, правится
 * только здесь.
 */
const LIVE: Record<string, string> = {
  "case-zubnoy": "https://zubnoy-korol.vercel.app",
  "case-hleb": "https://mister-hleb.vercel.app",
  "case-zaparom": "https://za-parom.vercel.app",
  "case-parista": "https://parista-eosin.vercel.app",
};

function live(id: string): { href: string; label: string } | null {
  const href = LIVE[id];
  if (!href) return null;
  return { href, label: "Открыть сайт" };
}

export const projects: Project[] = [
  {
    id: "seconder",
    title: "Seconder",
    platform: "Windows 10 / 11",
    role: "Архитектура хранения, интерфейс на Qt, сбор данных через WinAPI",
    summary:
      "Трекер экранного времени, который считает по окну в фокусе, а не по списку процессов. " +
      "Время складывается в почасовые корзины «приложение + день + час», поэтому за год база остаётся в тысячах строк, а любой график собирается одним запросом.",
    metrics: [
      { value: "1", label: "запрос на любой график" },
      { value: "тыс.", label: "строк в базе за год вместо миллионов" },
      { value: "0", label: "обращений в сеть" },
    ],
    stack: ["Python", "PySide6 / Qt 6", "SQLite", "WinAPI"],
    repo: repo("Seconder"),
    demo: null,
    previews: [
      shot(
        "/projects/seconder-dashboard.png",
        "Seconder, экран обзора со статистикой за период",
        "desktop",
      ),
    ],
    clip: clip("seconder"),
    col: 8,
    lead: true,
  },
  {
    id: "seconder-android",
    title: "Seconder for Android",
    platform: "Android 8.0+",
    role: "Перенос модели данных на Kotlin, экраны на Compose, фоновая синхронизация",
    summary:
      "Мобильная версия трекера с той же моделью данных и теми же графиками. " +
      "Вместо собственной службы опроса читает системный журнал через UsageStatsManager, а фоновая задача раз в три часа переносит события в свою базу, пока система их не удалила.",
    metrics: [
      { value: "3 ч", label: "шаг фоновой выгрузки" },
      { value: "1", label: "модель данных на две платформы" },
    ],
    stack: ["Kotlin", "Jetpack Compose", "SQLite", "WorkManager"],
    repo: repo("SeconderAndroid"),
    demo: null,
    previews: [
      shot("/projects/mobile-overview.png", "Seconder for Android, экран обзора", "phone"),
      shot("/projects/mobile-stats.png", "Seconder for Android, экран статистики", "phone"),
      shot("/projects/mobile-settings.png", "Seconder for Android, экран настроек", "phone"),
    ],
    clip: clip("seconder-android"),
    col: 4,
  },
  {
    id: "case-parista",
    title: "Париста",
    platform: "Веб · лендинг бутика",
    role: "Дизайн и вёрстка с нуля, металлическая типографика, интеграция карт",
    summary:
      "Второй подход к той же задаче в противоположной эстетике: обсидиан, платина, матовые панели с волосяной гранью и ни одной общей детали с предыдущим магазином. " +
      "Заголовок залит металлическим градиентом через background-clip, блик ходит за курсором, а виджет Яндекс.Карт перекрашен инверсией с поворотом тона, чтобы сесть в тёмную палитру.",
    metrics: [
      { value: "2", label: "эстетики на одну задачу" },
      { value: "0", label: "общих деталей с первым магазином" },
    ],
    stack: ["Next.js 15", "TypeScript", "CSS Modules"],
    repo: repo("Parista"),
    demo: live("case-parista"),
    previews: [shot("/projects/case-parista-lux.jpg", "Париста, первый экран", "desktop")],
    clip: clip("case-parista"),
    col: 7,
  },
  {
    id: "case-zaparom",
    title: "ЗаПаром",
    platform: "Веб · лендинг магазина",
    role: "Вёрстка, дым на холсте, восстановление состояний до первой отрисовки",
    summary:
      "Вейп-шоп с подтверждением возраста, куки-баром и сменой тем: все три состояния восстанавливает инлайновый скрипт в head до первой отрисовки, поэтому окно 18+ не мигает тому, кто его уже закрыл. " +
      "Дым на первом экране это холст с частицами: клуб рисуется шумом в четыре октавы один раз в офскрин и дальше только копируется, иначе сорок градиентов за кадр съедают весь бюджет.",
    metrics: [
      { value: "4", label: "октавы шума в спрайте дыма" },
      { value: "1", label: "отрисовка клуба вместо сорока за кадр" },
    ],
    stack: ["Next.js 15", "TypeScript", "Canvas", "CSS Modules"],
    repo: repo("ZaParom"),
    demo: live("case-zaparom"),
    previews: [shot("/projects/case-parista.jpg", "ЗаПаром, первый экран", "desktop")],
    clip: clip("case-zaparom"),
    col: 5,
  },
  {
    id: "case-hleb",
    title: "Мистер Хлеб",
    platform: "Веб · лендинг и магазин",
    role: "Витрина, фильтры, корзина и оформление без серверной части",
    summary:
      "Пекарня с витриной на двадцать восемь позиций: поиск по составу, фильтры, конструктор комбо, корзина и оформление самовывоза, и всё это без единого серверного обработчика. " +
      "Вечерняя скидка включается по часам покупателя, поэтому первый рендер отдаёт стабильную цену, а реальную подставляет уже клиент, иначе разметка сервера и браузера расходятся.",
    metrics: [
      { value: "28", label: "позиций в витрине" },
      { value: "0", label: "серверных обработчиков" },
    ],
    stack: ["Next.js 15", "TypeScript", "CSS Modules"],
    repo: repo("MisterHleb"),
    demo: live("case-hleb"),
    previews: [shot("/projects/case-hleb.jpg", "Мистер Хлеб, первый экран", "desktop")],
    clip: clip("case-hleb"),
    col: 5,
  },
  {
    id: "case-zubnoy",
    title: "Зубной Король",
    platform: "Веб · лендинг клиники",
    role: "Две языковые версии, режим для слабовидящих, прайс аккордеоном",
    summary:
      "Стоматология на две языковые версии и с режимом для слабовидящих: кегль, палитра и анимации переключаются одним атрибутом на html, без второй сборки и без перезагрузки. " +
      "Прайс собран аккордеоном, но состояние хранит список свёрнутых разделов, а не открытых: с обратной моделью второй клик схлопывал всё разом и вернуть было нечем.",
    metrics: [
      { value: "2", label: "языковые версии из одной сборки" },
      { value: "1", label: "атрибут переключает весь режим доступности" },
    ],
    stack: ["Next.js 15", "TypeScript", "CSS Modules"],
    repo: repo("ZubnoyKorol"),
    demo: live("case-zubnoy"),
    previews: [shot("/projects/case-zubnoy.jpg", "Зубной Король, первый экран", "desktop")],
    clip: clip("case-zubnoy"),
    col: 7,
  },
  {
    id: "ytdownloader",
    title: "YouTube Downloader",
    platform: "Windows 10 / 11",
    role: "Загрузка и склейка дорожек, свои виджеты, встроенный проигрыватель",
    summary:
      "Загрузчик до 2160p60: видео и звук на YouTube лежат раздельно, и всё выше 360p требует склейки через ffmpeg, который программа находит сама. " +
      "Предпросмотр работает через локальный сервер на 127.0.0.1: прямое открытие embed YouTube отклоняет ошибкой 153.",
    metrics: [
      { value: "2160p60", label: "потолок загрузки" },
      { value: "1", label: "exe на чистой системе" },
    ],
    stack: ["Python", "wxPython", "yt-dlp", "ffmpeg"],
    repo: repo("YtDownloaderDesktop"),
    demo: null,
    previews: [
      shot("/projects/ytdl-dark.png", "YouTube Downloader, главное окно в тёмной теме", "desktop"),
    ],
    clip: clip("ytdownloader"),
    col: 6,
  },
  {
    id: "portfolio",
    title: "Это портфолио",
    platform: "Веб · Vercel",
    role: "Дизайн, вёрстка, политика безопасности, деплой",
    summary:
      "Статический лендинг: страница собирается на этапе сборки и отдаётся с CDN, серверных обработчиков и форм нет. " +
      "Ни одного обращения к стороннему домену: шрифты вшиты через next/font, поэтому политика безопасности начинается с default-src 'none'.",
    metrics: [
      { value: "0", label: "запросов на сторонние домены" },
      { value: "none", label: "значение default-src в политике" },
    ],
    stack: ["Next.js 15", "TypeScript", "CSS Modules"],
    repo: repo("Diogen"),
    demo: { href: SITE_URL, label: "Вы на нём" },
    previews: [],
    clip: null,
    col: 6,
  },
];
