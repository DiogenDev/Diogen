import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy.
 *
 * Сайт статический и не ходит ни на один сторонний домен: шрифты вшиты
 * через next/font, картинки лежат в /public, аналитики нет. Поэтому база —
 * default-src 'none', а дальше открывается только то, что реально нужно.
 *
 * 'unsafe-inline' в script-src обязателен: Next.js встраивает данные гидрации
 * инлайновым <script>, и тема применяется до первой отрисовки тоже инлайном.
 * Убрать его можно только nonce'ами через middleware, а это переводит страницы
 * в динамический рендер — для лендинга проигрыш и по скорости, и по стойкости
 * к нагрузке. Здесь нет ни одного поля ввода и ни одной внешней строки в DOM,
 * так что вектора для инъекции скрипта попросту нет.
 */
const csp = [
  "default-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "connect-src 'self'",
  "manifest-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Картинки отдаются как обычная статика с диска. Это осознанный выбор:
  // /_next/image — единственная динамическая ручка, которую можно долбить
  // запросами, а выигрыш на четырёх скриншотах нулевой.
  images: { unoptimized: true },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
