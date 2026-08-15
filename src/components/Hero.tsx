import CanvasField from "./CanvasField";
import { site, TELEGRAM_USER, RESUME_URL } from "@/lib/site";
import styles from "./Hero.module.css";

/* Цифры проверяемые: проекты пересчитываются по массиву кейсов,
   платформы перечислены поимённо. Ничего про клиентов и конверсии
   здесь нет и быть не может: таких данных у меня нет. */
const facts = [
  { value: "5", label: "лет в разработке" },
  { value: "8", label: "проектов в портфолио" },
  { value: "4", label: "платформы: Windows, Android, веб, Telegram" },
  { value: "1", label: "человек на всю цепочку работ" },
];

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      {/* Точечное поле и мягкое свечение живут под текстом */}
      <div className={styles.field}>
        <CanvasField />
      </div>
      <div className={styles.glow} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <p className={`caps ${styles.kicker}`}>
          {site.nick}
          <span className={styles.sep} aria-hidden="true" />
          {site.role}
        </p>

        <h1 className={`display ${styles.title}`}>
          Десктоп, Android и веб: <em>от схемы данных</em> до боевого домена.
        </h1>

        <p className={styles.subtitle}>
          Пять лет в разработке, основной язык Python. Проекты в портфолио сделаны
          целиком одним человеком: модель данных, интерфейс, сборка, деплой.
        </p>

        <div className={styles.actions}>
          <a className="btn btn--primary" href="#projects" data-magnet>
            <span>Смотреть работы</span>
          </a>

          {RESUME_URL && (
            <a className="btn btn--glass" href={RESUME_URL} download data-magnet>
              <span>Скачать резюме</span>
            </a>
          )}

          <a
            className="btn btn--glass"
            href={`https://t.me/${TELEGRAM_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            data-magnet
          >
            <span>Написать в Telegram</span>
          </a>
        </div>

        <dl className={styles.facts}>
          {facts.map((f) => (
            <div key={f.label} className={styles.fact}>
              <dt className={styles.factValue}>{f.value}</dt>
              <dd className={styles.factLabel}>{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
