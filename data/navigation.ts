import { GLOBAL_TELEGRAM_CTA } from './projects';

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Проекты', href: '#projects' },
  { label: 'Диплом и квалификация', href: '#credentials' },
  { label: 'Направления работы', href: '#services' },
  { label: 'Контакты', href: '#contact' },
];

export const AUTHOR_INFO = {
  name: 'Ринат Ахтемов',
  alias: 'Diogen (Диоген разработка)',
  tag: 'DiogenDev',
  role: 'Full-Stack & Systems Engineer',
  status: 'Открыт к проектам',
  academicStatus: 'Дипломированный IT-специалист (IT ВШП)',
  telegramHandle: '@kavup',
  telegramUrl: GLOBAL_TELEGRAM_CTA,
  vkHandle: 'vk.ru/DiogenDev',
  vkUrl: 'https://vk.ru/DiogenDev',
};
