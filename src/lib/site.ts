/**
 * Единственное место, где живут ник, домен и ссылки.
 * Меняется ник или переезжает домен — правится только этот файл.
 */

export const GITHUB_USER = "diogendev";
export const TELEGRAM_USER = "diogendev";

/** Домен без слеша на конце. Правится один раз при переезде на свой домен. */
export const SITE_URL = "https://diogendev.vercel.app";

/**
 * Файл резюме в /public. Если поставить null — кнопка «Скачать резюме»
 * просто не отрисуется, битой ссылки не появится.
 */
export const RESUME_URL: string | null = "/rinat-diogendev-cv.pdf";

export const site = {
  nick: "diogen(dev)",
  nickPlain: "diogendev",
  name: "Ринат",
  role: "Разработчик полного цикла",
  title: "diogen(dev) — разработчик полного цикла",
  description:
    "Ринат, diogen(dev). Десктопные приложения под Windows, Android на Kotlin, " +
    "сайты и телеграм-боты. Пять лет в разработке, основной язык — Python.",
  url: SITE_URL,
} as const;

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export const socials: SocialLink[] = [
  { label: "GitHub", handle: GITHUB_USER, href: `https://github.com/${GITHUB_USER}` },
  { label: "Telegram", handle: `@${TELEGRAM_USER}`, href: `https://t.me/${TELEGRAM_USER}` },
  { label: "VK", handle: "id1117580536", href: "https://vk.ru/id1117580536" },
];
