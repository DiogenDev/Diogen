import type { Metadata, Viewport } from "next";
import { Onest, Unbounded, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/* Три гарнитуры, три роли: Onest в тексте, Unbounded в крупных заголовках,
   JetBrains Mono в стеке и метриках. Все с кириллицей и все вшиваются на
   этапе сборки — в рантайме сайт не обращается ни к одному внешнему домену. */

const sans = Onest({
  subsets: ["cyrillic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Unbounded({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600", "700"],
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
  title: { default: site.title, template: `%s — ${site.nick}` },
  description: site.description,
  applicationName: site.nick,
  authors: [{ name: `${site.name} — ${site.nick}`, url: site.url }],
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
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

/**
 * Тема ставится до первой отрисовки, иначе тёмная страница мигнёт светлым.
 * Тёмная — по умолчанию: светлая включается только явным выбором
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
