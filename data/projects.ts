export type ProjectCategory = 'all' | 'web' | 'bot' | 'desktop-mobile' | 'commercial';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  folder: string;
  images: string[];
  description: string;
  keyFeatures: string[];
  stack: string[];
  isSoftwareDownload?: boolean;
  actionUrl: string;
  actionText: string;
}

export const TELEGRAM_BASE_URL = 'https://t.me/kavup';

export const GLOBAL_TELEGRAM_CTA =
  'https://t.me/kavup?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%D0%9C%D0%B5%D0%BD%D1%8F%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D1%8E%D1%82%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8,%20%D0%BC%D0%BE%D0%B6%D0%B5%D1%88%D1%8C%20%D1%80%D0%B0%D1%81%D1%81%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5%20%D0%BE%20';

export const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Все проекты' },
  { id: 'web', label: 'Веб-сервисы' },
  { id: 'bot', label: 'Боты и парсеры' },
  { id: 'desktop-mobile', label: 'Системы и приложения' },
  { id: 'commercial', label: 'Коммерция' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'general-li',
    title: 'General Li',
    subtitle: 'Сервис премиального автотехцентра',
    category: 'web',
    categoryLabel: 'Веб-сервис',
    folder: '/projects/general-li/',
    images: [
      '/projects/general-li/1.jpg',
      '/projects/general-li/2.jpg',
      '/projects/general-li/3.jpg',
    ],
    description:
      'Веб-сервис для автотехцентра премиального сегмента. Включает интерактивную карту проезда, детальный каталог сервисных услуг с прозрачной калькуляцией и систему онлайн-записи клиентов.',
    keyFeatures: [
      'Адаптивный каталог с прозрачным прайсом и детальным описанием услуг',
      'Интерактивная карта проезда и навигация по сервисным зонам',
      'Форма онлайн-записи с валидацией и уведомлением персонала',
      'Быстрая загрузка страниц и адаптация под мобильные устройства',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    actionUrl: 'https://li-service.vercel.app/',
    actionText: 'Открыть сайт',
  },
  {
    id: 'aura-coffee',
    title: 'Aura Coffee',
    subtitle: 'Сайт городского кафе',
    category: 'web',
    categoryLabel: 'Веб-сервис',
    folder: '/projects/aura-coffee/',
    images: [
      '/projects/aura-coffee/preview.jpg',
      '/projects/aura-coffee/interior.jpg',
      '/projects/aura-coffee/interior-2.jpg',
    ],
    description:
      'Презентационный сайт городского атмосферного кафе. Фокус на меню, визуальной подаче пространства, фотогалерее интерьера и удобном бронировании столиков.',
    keyFeatures: [
      'Интерактивное меню с актуальными позициями и сезонными предложениями',
      'Фотогалерея интерьера и атмосферы заведения с оптимизированной загрузкой',
      'Модуль бронирования столиков для посетителей',
      'Полная адаптивность под смартфоны и планшеты',
    ],
    stack: ['React', 'Next.js', 'Tailwind CSS'],
    actionUrl: 'https://aura-coffee-mu.vercel.app/',
    actionText: 'Открыть сайт',
  },
  {
    id: 'soundcloud-bot',
    title: 'SoundCloud Offline Bot',
    subtitle: 'Музыкальный Telegram-бот и Web App',
    category: 'bot',
    categoryLabel: 'Telegram / Бот',
    folder: '/projects/soundcloud-bot/',
    images: [
      '/projects/soundcloud-bot/bot-preview.jpg',
      '/projects/soundcloud-bot/miniapp-screen.jpg',
      '/projects/soundcloud-bot/screen-3.jpg',
      '/projects/soundcloud-bot/screen-4.jpg',
      '/projects/soundcloud-bot/screen-5.jpg',
    ],
    description:
      'Многофункциональный Telegram-бот со встроенным Web App интерфейсом. Позволяет слушать и скачивать музыку без рекламы, формировать плейлисты по алгоритму персональных рекомендаций и отслеживать тренды.',
    keyFeatures: [
      'Встроенный Telegram Mini App для навигации по трекам и плейлистам',
      'Алгоритм подбора музыки по контексту прослушиваний',
      'Прямое скачивание аудиодорожек без рекламы',
      'Локальное кэширование метаданных в SQLite для быстрого отклика',
    ],
    stack: ['Python', 'Node.js', 'Telegram API', 'TWA', 'SQLite'],
    actionUrl: 'https://t.me/SoundCloudOffline_bot',
    actionText: 'Запустить бота',
  },
  {
    id: 'materstroy',
    title: 'MaterStroy',
    subtitle: 'Портал строительной компании с 3D',
    category: 'web',
    categoryLabel: 'Веб-сервис',
    folder: '/projects/materstroy/',
    images: [
      '/projects/materstroy/1.jpg',
      '/projects/materstroy/3d-demo.jpg',
      '/projects/materstroy/3.jpg',
      '/projects/materstroy/4.jpg',
    ],
    description:
      'Корпоративный портал строительно-инженерной компании. Интеграция 3D-моделей строящихся объектов, интерактивный калькулятор предварительной сметы и каталог готовых проектов.',
    keyFeatures: [
      'Интерактивная визуализация 3D-моделей объектов через WebGL',
      'Калькулятор расчета стоимости и характеристик материалов',
      'Каталог реализованных строительных объектов',
      'Стильный интерфейс с продуманной структурой подачи информации',
    ],
    stack: ['Three.js', 'WebGL', 'Next.js', 'Tailwind CSS'],
    actionUrl: 'https://materstroy.vercel.app/',
    actionText: 'Открыть сайт',
  },
  {
    id: 'wild-peony',
    title: 'Дикий Пион',
    subtitle: 'Витрина авторской флористики',
    category: 'web',
    categoryLabel: 'Веб-сервис',
    folder: '/projects/wild-peony/',
    images: [
      '/projects/wild-peony/bouquet.jpg',
      '/projects/wild-peony/catalog.jpg',
      '/projects/wild-peony/details.jpg',
    ],
    description:
      'Витрина премиального салона флористики. Сдержанный минималистичный дизайн с акцентом на фотографии букетов, оформление заказов через мессенджеры и прозрачную информацию о доставке.',
    keyFeatures: [
      'Удобный каталог цветочных композиций с подробными карточками',
      'Оформление заказа в мессенджер в два клика',
      'Информационный блок условий и зон доставки',
      'Плавная работа на смартфонах с моментальным откликом',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    actionUrl: 'https://wild-peony.vercel.app/',
    actionText: 'Открыть сайт',
  },
  {
    id: 'parista',
    title: 'Париста',
    subtitle: 'Коммерческий онлайн-каталог',
    category: 'commercial',
    categoryLabel: 'Коммерция',
    folder: '/projects/parista/',
    images: ['/projects/parista/showcase.jpg'],
    description:
      'Онлайн-каталог для розничной сети. Быстрый поиск по категориям и брендам, адаптация под мобильные устройства и структурированная витрина для покупателей.',
    keyFeatures: [
      'Мгновенный поиск и фильтрация по категориям и производителям',
      'Оптимизированный мобильный интерфейс для удобного просмотра на ходу',
      'Удобные карточки товаров с ключевыми характеристиками',
      'Минимальное время загрузки страниц даже при слабом интернете',
    ],
    stack: ['Next.js', 'Tailwind CSS', 'PWA'],
    actionUrl: 'https://parista-eosin.vercel.app/',
    actionText: 'Открыть сайт',
  },
  {
    id: 'tooth-king',
    title: 'Зубной Король',
    subtitle: 'Сайт стоматологической клиники',
    category: 'web',
    categoryLabel: 'Веб-сервис',
    folder: '/projects/tooth-king/',
    images: ['/projects/tooth-king/dental-home.jpg'],
    description:
      'Официальный сайт стоматологической клиники. Подробный перечень медицинских направлений, информация о врачах, онлайн-запись на прием и открытые лицензии.',
    keyFeatures: [
      'Структурированный каталог услуг клиники с понятным описанием процедур',
      'Форма онлайн-записи на первичный прием и консультацию',
      'Раздел с лицензиями клиники и подтверждением квалификации врачей',
      'Четкая мобильная версия с быстрым доступом к контактам и адресу',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    actionUrl: 'https://zubnoy-korol.vercel.app/',
    actionText: 'Открыть сайт',
  },
  {
    id: 'zaparom',
    title: 'ZaParom (Mister Hleb)',
    subtitle: 'Каталог с переключением тем',
    category: 'commercial',
    categoryLabel: 'Коммерция',
    folder: '/projects/zaparom/',
    images: [
      '/projects/zaparom/vape-shop.jpg',
      '/projects/zaparom/mrbread.jpg',
    ],
    description:
      'Интерактивный каталог для магазина с возможностью динамического переключения цветовых тем оформления и удобной карточной раскладкой ассортимента.',
    keyFeatures: [
      'Динамическое переключение цветовых схем оформления интерфейса',
      'Наглядные карточки товаров с параметрами и наличием',
      'Удобная навигация по брендам и вкусовым линейкам',
      'Адаптивная верстка под любые разрешения экранов',
    ],
    stack: ['React', 'CSS Engine', 'State Management'],
    actionUrl: 'https://mister-hleb.vercel.app/',
    actionText: 'Открыть сайт',
  },
  {
    id: 'seconder-pc',
    title: 'Seconder for Windows',
    subtitle: 'Автономный трекер продуктивности',
    category: 'desktop-mobile',
    categoryLabel: 'Desktop / Systems',
    folder: '/projects/seconder-pc/',
    images: [
      '/projects/seconder-pc/dashboard.jpg',
      '/projects/seconder-pc/themes.jpg',
      '/projects/seconder-pc/screen-3.jpg',
      '/projects/seconder-pc/screen-4.jpg',
    ],
    description:
      'Автономное Windows-приложение для учета рабочего времени. Отслеживает активность по активному окну с детектом простоя, сопоставляет исполняемые файлы с задачами, строит наглядные диаграммы и хранит данные локально в SQLite без отправки в сеть.',
    keyFeatures: [
      'Точный подсчет времени по фокусу окна через Win32 API и детект бездействия',
      'Автоматическое распознавание процессов (Code.exe в VS Code и др.)',
      'Векторные графики активности на нативном QPainter',
      'Шесть цветовых тем, работа в системном трее и 100% локальное хранение в SQLite',
    ],
    stack: ['C++', 'Qt', 'Win32 API', 'QPainter', 'SQLite'],
    isSoftwareDownload: true,
    actionUrl:
      'https://t.me/kavup?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%B8%D1%82%D1%8C%20%D1%81%D0%B1%D0%BE%D1%80%D0%BA%D1%83%20Seconder%20for%20Windows',
    actionText: 'Запросить сборку для Windows',
  },
  {
    id: 'seconder-android',
    title: 'Seconder for Android',
    subtitle: 'Приватный трекер экранного времени',
    category: 'desktop-mobile',
    categoryLabel: 'Mobile / Android',
    folder: '/projects/seconder-android/',
    images: [
      '/projects/seconder-android/mobile-main.jpg',
      '/projects/seconder-android/statistics.jpg',
      '/projects/seconder-android/screen-3.jpg',
    ],
    description:
      'Мобильное приложение для аналитики экранного времени Android без сторонних облачных серверов. Анализирует журнал переключений приложений, визуализирует диаграммы на Canvas, поддерживает кастомизацию палитр и хранит историю локально.',
    keyFeatures: [
      'Анализ журнала использования через UsageStatsManager с фильтрацией системных процессов',
      'Плавная отрисовка статистики и диаграмм на нативном Android Canvas',
      'Шесть встроенных палитр оформления и детальный RGB-выбор цвета',
      'Полная приватность: локальная база данных SQLite и нулевой сетевой трафик',
    ],
    stack: ['Kotlin', 'Android SDK', 'Canvas API', 'SQLite'],
    isSoftwareDownload: true,
    actionUrl:
      'https://t.me/kavup?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%B8%D1%82%D1%8C%20%D1%81%D0%B1%D0%BE%D1%80%D0%BA%D1%83%20Seconder%20for%20Android',
    actionText: 'Запросить сборку для Android',
  },
];
