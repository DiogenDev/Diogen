import fs from "node:fs";
import path from "node:path";

import { GITHUB_USER, SITE_URL } from "./site";

/**
 * Наличие скриншота проверяется на этапе сборки: положили файл в
 * public/projects — он появится на сайте, убрали — вместо него снова
 * встанет заглушка. Руками в коде править ничего не нужно.
 *
 * Файл читается только на сервере. Импортировать этот модуль в
 * клиентский компонент нельзя — node:fs туда не попадёт.
 */
const PUBLIC_DIR = path.join(process.cwd(), "public");

export type Preview = {
  src: string;
  alt: string;
  kind: "desktop" | "phone";
  /** Файла нет на диске — вместо картинки встанет заглушка. */
  pending: boolean;
};

function shot(src: string, alt: string, kind: "desktop" | "phone"): Preview {
  let exists = false;
  try {
    exists = fs.existsSync(path.join(PUBLIC_DIR, src));
  } catch {
    exists = false;
  }
  return { src, alt, kind, pending: !exists };
}

export type Project = {
  id: string;
  title: string;
  platform: string;
  /** Описание архитектуры и решения — ровно два предложения. */
  summary: string;
  stack: string[];
  repo: string | null;
  demo: { href: string; label: string } | null;
  /** Один или несколько экранов приложения. Пустой массив — превью нет. */
  previews: Preview[];
};

const repo = (name: string) => `https://github.com/${GITHUB_USER}/${name}`;

/**
 * Адреса опубликованных кейсов. Пустая строка — кнопки не будет,
 * вместо неё встанет подпись «демо нет». Переехал домен — правится
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
    summary:
      "Трекер экранного времени, который считает по окну в фокусе, а не по списку процессов. " +
      "Время складывается в почасовые корзины «приложение + день + час», поэтому за год база остаётся в тысячах строк, а любой график собирается одним запросом.",
    stack: ["Python", "PySide6 / Qt 6", "SQLite", "WinAPI"],
    repo: repo("Seconder"),
    demo: null,
    previews: [
      shot(
        "/projects/seconder-dashboard.png",
        "Seconder — экран обзора со статистикой за период",
        "desktop",
      ),
    ],
  },
  {
    id: "seconder-android",
    title: "Seconder for Android",
    platform: "Android 8.0+",
    summary:
      "Мобильная версия трекера с той же моделью данных и теми же графиками. " +
      "Вместо собственной службы опроса читает системный журнал через UsageStatsManager, а фоновая задача раз в три часа переносит события в свою базу, пока система их не удалила.",
    stack: ["Kotlin", "Jetpack Compose", "SQLite", "WorkManager"],
    repo: repo("SeconderAndroid"),
    demo: null,
    previews: [
      shot("/projects/mobile-overview.png", "Seconder for Android — экран обзора", "phone"),
      shot("/projects/mobile-stats.png", "Seconder for Android — экран статистики", "phone"),
      shot("/projects/mobile-settings.png", "Seconder for Android — экран настроек", "phone"),
    ],
  },
  {
    id: "ytdownloader",
    title: "YouTube Downloader",
    platform: "Windows 10 / 11",
    summary:
      "Загрузчик до 2160p60: видео и звук на YouTube лежат раздельно, и всё выше 360p требует склейки через ffmpeg, который программа находит сама. " +
      "Предпросмотр работает через локальный сервер на 127.0.0.1 — прямое открытие embed YouTube отклоняет ошибкой 153.",
    stack: ["Python", "wxPython", "yt-dlp", "ffmpeg"],
    repo: repo("YtDownloaderDesktop"),
    demo: null,
    previews: [
      shot("/projects/ytdl-dark.png", "YouTube Downloader — главное окно в тёмной теме", "desktop"),
    ],
  },
  {
    id: "case-zubnoy",
    title: "Зубной Король",
    platform: "Веб · лендинг клиники",
    summary:
      "Стоматология на две языковые версии и с режимом для слабовидящих: кегль, палитра и анимации переключаются одним атрибутом на html, без второй сборки и без перезагрузки. " +
      "Прайс собран аккордеоном, но состояние хранит список свёрнутых разделов, а не открытых — с обратной моделью второй клик схлопывал всё разом и вернуть было нечем.",
    stack: ["Next.js 15", "TypeScript", "CSS Modules"],
    repo: repo("ZubnoyKorol"),
    demo: live("case-zubnoy"),
    previews: [shot("/projects/case-zubnoy.jpg", "Зубной Король — первый экран", "desktop")],
  },
  {
    id: "case-hleb",
    title: "Мистер Хлеб",
    platform: "Веб · лендинг и магазин",
    summary:
      "Пекарня с витриной на двадцать восемь позиций: поиск по составу, фильтры, конструктор комбо, корзина и оформление самовывоза — всё без единого серверного обработчика. " +
      "Вечерняя скидка включается по часам покупателя, поэтому первый рендер отдаёт стабильную цену, а реальную подставляет уже клиент, иначе разметка сервера и браузера расходятся.",
    stack: ["Next.js 15", "TypeScript", "CSS Modules"],
    repo: repo("MisterHleb"),
    demo: live("case-hleb"),
    previews: [shot("/projects/case-hleb.jpg", "Мистер Хлеб — первый экран", "desktop")],
  },
  {
    id: "case-zaparom",
    title: "ЗаПаром",
    platform: "Веб · лендинг магазина",
    summary:
      "Вейп-шоп с подтверждением возраста, куки-баром и сменой тем: все три состояния восстанавливает инлайновый скрипт в head до первой отрисовки, поэтому окно 18+ не мигает тому, кто его уже закрыл. " +
      "Дым на первом экране — холст с частицами: клуб рисуется шумом в четыре октавы один раз в офскрин и дальше только копируется, иначе сорок градиентов за кадр съедают весь бюджет.",
    stack: ["Next.js 15", "TypeScript", "Canvas", "CSS Modules"],
    repo: repo("ZaParom"),
    demo: live("case-zaparom"),
    previews: [shot("/projects/case-parista.jpg", "ЗаПаром — первый экран", "desktop")],
  },
  {
    id: "case-parista",
    title: "Париста",
    platform: "Веб · лендинг бутика",
    summary:
      "Второй подход к той же задаче в противоположной эстетике: обсидиан, платина, матовые панели с волосяной гранью и ни одной общей детали с предыдущим магазином. " +
      "Заголовок залит металлическим градиентом через background-clip, блик ходит за курсором, а виджет Яндекс.Карт перекрашен инверсией с поворотом тона, чтобы сесть в тёмную палитру.",
    stack: ["Next.js 15", "TypeScript", "CSS Modules"],
    repo: repo("Parista"),
    demo: live("case-parista"),
    previews: [shot("/projects/case-parista-lux.jpg", "Париста — первый экран", "desktop")],
  },
  {
    id: "portfolio",
    title: "Это портфолио",
    platform: "Веб · Vercel",
    summary:
      "Статический лендинг: страница собирается на этапе сборки и отдаётся с CDN, серверных обработчиков и форм нет. " +
      "Ни одного обращения к стороннему домену — шрифты вшиты через next/font, поэтому политика безопасности начинается с default-src 'none'.",
    stack: ["Next.js 15", "TypeScript", "CSS Modules"],
    repo: repo("Diogen"),
    demo: { href: SITE_URL, label: "Вы на нём" },
    previews: [],
  },
];
