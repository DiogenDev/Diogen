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
    title: "Seconder — десктоп и Android",
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
      "Свои виджеты на wx.GraphicsContext — нативные контролы Windows игнорируют цвета тёмной темы.",
    ],
  },
  {
    period: "2024 — н. в.",
    title: "Python как основной язык",
    meta: "Python · SQLite · Redis · aiogram",
    points: [
      "Десктопные приложения на Qt и wxPython, телеграм-боты и мини-аппы.",
      "Схемы хранения проектирую с запасом на рост данных.",
    ],
  },
  {
    period: "2021 — н. в.",
    title: "Начало в разработке",
    meta: "C++ · C# · HTML · JavaScript",
    points: [
      "Начинал с C-подобного синтаксиса, оттуда ушёл в веб и TypeScript.",
    ],
  },
];

export type Service = {
  title: string;
  body: string;
};

export const services: Service[] = [
  {
    title: "Телеграм-боты и мини-аппы",
    body: "От приёма заявок до магазина с оплатой прямо в мессенджере. Подключаю чужие API и пишу свои.",
  },
  {
    title: "Сайты под ключ",
    body: "Соберу и выложу на боевой домен. В конце у вас работающий сайт и понятная инструкция, как править тексты.",
  },
  {
    title: "Десктоп под Windows",
    body: "Программы с нестандартным окном: свои виджеты, темы, трей. На выходе один exe, который запустится на чистой системе.",
  },
  {
    title: "Android и данные",
    body: "Kotlin и Compose. Схему хранения продумываю сразу, чтобы через год данных приложение не начало тормозить.",
  },
];
