import type { Metadata, Viewport } from "next";
import { Manrope, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/* Редакционная пара: высококонтрастная антиква в заголовках и
   геометрический гротеск в тексте. Третья гарнитура, моноширинная,
   держит метрики, теги и служебные подписи.

   Instrument Serif, Plus Jakarta Sans и Satoshi из задания не взяты:
   у первых двух нет кириллицы, третьей нет в Google Fonts вовсе.
   На русском они молча отвалились бы на системный шрифт. Заменены
   ближайшими по рисунку из тех, что кириллицу несут.

   Все вшиваются на этапе сборки: в рантайме сайт не обращается
   ни к одному внешнему домену. */

const sans = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["cyrillic", "latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.nick}` },
  description: site.description,
  applicationName: site.nick,
  authors: [{ name: `${site.name}, ${site.nick}`, url: site.url }],
  creator: site.nick,
  keywords: [
    "разработчик",
    "python разработчик",
    "телеграм боты на заказ",
    "telegram mini apps",
    "сайты под ключ",
    "kotlin android",
    "diogendev",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: site.url,
    siteName: site.nick,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0d10" },
    { media: "(prefers-color-scheme: light)", color: "#f9f8f6" },
  ],
};

/**
 * Тема ставится до первой отрисовки, иначе тёмная страница мигнёт светлым.
 * Тёмная стоит по умолчанию: светлая включается только явным выбором
 * или системной настройкой.
 */
const themeInit = `(function(){var d=document.documentElement;try{var s=localStorage.getItem("theme");if(s!=="light"&&s!=="dark"){s=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.setAttribute("data-theme",s)}catch(e){d.setAttribute("data-theme","dark")}
/* Скрывать блоки до появления имеет смысл только там, где есть чем их показать. */
if("IntersectionObserver" in window)d.setAttribute("data-reveal-ready","true")})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      data-theme="dark"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          К основному содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
