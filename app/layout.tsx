import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://diogen.dev'),
  title: 'Ринат Ахтемов | Full-Stack & Systems Engineer (DiogenDev)',
  description:
    'Инженерия веб-систем, Telegram-ботов, мобильных и десктопных приложений. Дипломированный специалист. Архитектура без AI-шаблонов.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/icon.png?v=2', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png?v=2', type: 'image/png', sizes: '192x192' },
      { url: '/logo.png?v=2', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png?v=2', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico?v=2'],
  },
  openGraph: {
    title: 'Ринат Ахтемов | Full-Stack & Systems Engineer (DiogenDev)',
    description:
      'Инженерия веб-систем, Telegram-ботов, мобильных и десктопных приложений. Дипломированный специалист. Архитектура без AI-шаблонов.',
    url: 'https://diogen.dev',
    siteName: 'DiogenDev Portfolio',
    images: [
      {
        url: '/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Ринат Ахтемов | Diogen (Диоген разработка) Portfolio',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ринат Ахтемов | Full-Stack & Systems Engineer (DiogenDev)',
    description:
      'Инженерия веб-систем, Telegram-ботов, мобильных и десктопных приложений. Дипломированный специалист. Архитектура без AI-шаблонов.',
    images: ['/og-preview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png?v=2" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
      </head>
      <body className="bg-[#08090b] text-zinc-300 font-sans antialiased selection:bg-emerald-900 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
