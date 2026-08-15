export type StackGroup = {
  category: string;
  items: string[];
};

/** Сгруппировано по назначению, а не свалено в одну кучу логотипов. */
export const stackGroups: StackGroup[] = [
  {
    category: "Языки",
    items: ["Python", "Kotlin", "TypeScript", "JavaScript", "SQL", "C++", "C#"],
  },
  {
    category: "Фреймворки и библиотеки",
    items: ["Next.js", "React", "Node.js", "Jetpack Compose", "PySide6 / Qt", "wxPython", "aiogram"],
  },
  {
    category: "Данные и инструменты",
    items: ["SQLite", "Redis", "Git", "Android Studio", "PyInstaller", "ffmpeg", "Vercel"],
  },
];

export type TimelineEntry = {
  period: string;
  title: string;
  meta: string;
  points: string[];
};

/**
 * Таймлайн по реальным проектам и датам репозиториев.
 * Мест работы, должностей и компаний здесь нет намеренно: таких данных нет,
 * а придумывать их в портфолио нельзя.
 */
export const timeline: TimelineEntry[] = [
  {
    period: "2026",
    title: "Seconder: десктоп и Android",
    meta: "Python · Kotlin · SQLite",
    points: [
      "Две версии трекера экранного времени на общей модели данных и с одинаковыми графиками.",
      "Почасовые корзины вместо журнала событий: за год база держится в тысячах строк, а не в миллионах.",
      "Шесть палитр, свои обои, экспорт в CSV. Ни одно из двух приложений в сеть не ходит.",
    ],
  },
  {
    period: "2026",
    title: "YouTube Downloader",
    meta: "Python · wxPython · yt-dlp",
    points: [
      "Загрузка до 2160p60 со склейкой раздельных дорожек через ffmpeg.",
      "Встроенный проигрыватель на WebView2 через локальный сервер на 127.0.0.1.",
      "Свои виджеты на wx.GraphicsContext: нативные контролы Windows игнорируют цвета тёмной темы.",
    ],
  },
  {
    period: "с 2024",
    title: "Python как основной язык",
    meta: "Python · SQLite · Redis · aiogram",
    points: [
      "Десктопные приложения на Qt и wxPython, телеграм-боты и мини-аппы.",
      "Схемы хранения проектирую с запасом на рост данных.",
    ],
  },
  {
    period: "с 2021",
    title: "Начало в разработке",
    meta: "C++ · C# · HTML · JavaScript",
    points: [
      "Начинал с C-подобного синтаксиса, оттуда ушёл в веб и TypeScript.",
    ],
  },
];

export type Service = {
  title: string;
  /** Стек одной строкой: по нему видно, о чём вообще разговор. */
  stack: string;
  body: string;
  /** Что получает заказчик на выходе. Без «под ключ» и «комплексно». */
  deliverable: string;
};

/**
 * Формулировки намеренно узкие. «Сайты под ключ» и «инновационный
 * подход» не говорят ни о роли, ни о стеке, ни о том, что будет
 * лежать в папке в конце работы.
 */
export const services: Service[] = [
  {
    title: "Телеграм-боты и мини-аппы",
    stack: "Python · aiogram · SQLite · Redis",
    body: "Приём заявок, каталог, оплата внутри мессенджера. Подключаю чужие API и пишу свои.",
    deliverable: "Бот на вашем сервере, исходники, инструкция по запуску",
  },
  {
    title: "Лендинги и витрины",
    stack: "Next.js 15 · TypeScript · CSS Modules",
    body: "Статическая сборка без серверных обработчиков: страница отдаётся с CDN и не падает от нагрузки.",
    deliverable: "Сайт на боевом домене, тексты правятся в одном файле",
  },
  {
    title: "Десктоп под Windows",
    stack: "Python · Qt 6 · wxPython · PyInstaller",
    body: "Нестандартное окно, свои виджеты и темы, работа в трее. Нативные контролы под тёмную тему не красятся, поэтому рисую их сам.",
    deliverable: "Один exe, который запускается на чистой системе",
  },
  {
    title: "Android и модель данных",
    stack: "Kotlin · Jetpack Compose · SQLite · WorkManager",
    body: "Схему хранения проектирую с запасом на рост: почасовые корзины вместо журнала событий держат базу в тысячах строк, а не в миллионах.",
    deliverable: "APK, схема базы и разбор, почему она такая",
  },
];
