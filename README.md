# diogen(dev) — портфолио

Одностраничный сайт-портфолио. Next.js 15 (App Router) + TypeScript + CSS Modules,
статическая сборка, деплой на Vercel.

## Запуск

```bash
npm install
```

```bash
npm run dev
```

Продакшен-сборка и локальная проверка:

```bash
npm run build && npm start
```

Проверка типов без сборки:

```bash
npm run typecheck
```

## Что где лежит

```
src/
  app/
    layout.tsx        шрифты, метаданные, инициализация темы до первой отрисовки
    page.tsx          сборка секций и JSON-LD для поисковиков
    globals.css       токены, сброс, типографика, раскладка
    robots.ts         robots.txt
    sitemap.ts        sitemap.xml
    icon.svg          фавикон
  components/         Header, Hero, Projects, TechStack, Timeline, Services, Footer
  lib/
    site.ts           ник, домен, ссылки, путь к резюме
    projects.ts       карточки проектов
    content.ts        стек, таймлайн, услуги
scripts/
  build_cv.py         сборка PDF-резюме из тех же данных
public/
  projects/           скриншоты проектов
  rinat-diogendev-cv.pdf
```

## Правки, которые понадобятся чаще всего

| Что менять | Файл |
|---|---|
| Ник, домен, ссылки на GitHub / Telegram / VK | `src/lib/site.ts` |
| Проекты, описания, стек, ссылки | `src/lib/projects.ts` |
| Стек, таймлайн, услуги | `src/lib/content.ts` |
| Цвета, шрифты, отступы | `src/app/globals.css` |

Домен задаётся одной константой `SITE_URL` в `src/lib/site.ts` — от неё зависят
canonical-ссылка, sitemap, robots и Open Graph.

## Скриншоты

Файлы лежат в `public/projects/`. Пропорции контейнеров заданы жёстко, поэтому
подмена файла не сдвигает вёрстку.

Наличие файла проверяется на этапе сборки: положили картинку в
`public/projects` — она появится на сайте, убрали — вместо неё встанет
заглушка. Руками в коде ничего править не нужно.

Чтобы добавить проекту ещё один экран, допишите строку в массив `previews`
в `src/lib/projects.ts`:

```ts
previews: [
  shot("/projects/mobile-apps.png", "Seconder for Android — список приложений", "phone"),
],
```

Вертикальные снимки (`kind: "phone"`) выстраиваются в ленту, которую можно
листать; клик по любому открывает просмотрщик с приближением.

## Резюме

PDF собирается из тех же данных, что и сайт:

```bash
python -m pip install fpdf2
```

```bash
python scripts/build_cv.py
```

Результат попадает в `public/rinat-diogendev-cv.pdf`. Если резюме не нужно,
достаточно поставить `RESUME_URL = null` в `src/lib/site.ts` — кнопка
«Скачать резюме» перестанет отрисовываться, битой ссылки не появится.

## Безопасность

Заголовки задаются в `next.config.ts` и применяются ко всем маршрутам:

- `Content-Security-Policy` от `default-src 'none'`; закрыты `object-src`,
  `base-uri`, `form-action`, `frame-ancestors`
- `Strict-Transport-Security` с `includeSubDomains` и `preload`
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`
- `X-Powered-By` отключён

`'unsafe-inline'` в `script-src` оставлен осознанно: Next.js встраивает данные
гидрации инлайновым скриптом, а тема применяется до первой отрисовки тоже
инлайном. Убрать его можно только nonce-ами через middleware, что переводит
страницы в динамический рендер. На сайте нет ни одного поля ввода и ни одной
внешней строки, попадающей в DOM.

Устойчивость к нагрузке обеспечивается тем, что отдавать нечего, кроме статики:
серверных обработчиков, базы и форм нет, оптимизация картинок отключена
(`images.unoptimized`), поэтому динамического маршрута `/_next/image` тоже нет.

## Деплой на Vercel

1. Запушить проект в репозиторий на GitHub.
2. На vercel.com: **Add New → Project**, выбрать репозиторий.
3. **Build and Output Settings** — ничего не трогать, все переопределения
   выключены. Пресет Next.js подставит `next build`, папку `.next` и
   `npm install` сам.
4. **Environment Variables** — оставить пустыми. Проект не читает ни одной
   переменной окружения, кроме `NODE_ENV`, который Vercel задаёт сам.
5. **Deploy**.

После первого деплоя вписать выданный адрес в `SITE_URL` в `src/lib/site.ts`
и закоммитить — от этой константы зависят canonical, sitemap, robots и
Open Graph. Пересборка запустится автоматически.

Свой домен подключается в **Settings → Domains**. Защита от ботов и всплесков
трафика — **Settings → Firewall**, там же Attack Challenge Mode.
