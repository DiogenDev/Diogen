import CanvasField from "./CanvasField";
import { site, TELEGRAM_USER, RESUME_URL } from "@/lib/site";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      {/* Точечное поле и мягкое свечение живут под текстом */}
      <div className={styles.field}>
        <CanvasField />
      </div>
      <div className={styles.glow} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <h1 className={styles.title}>
          Привет, я {site.name}.
          <br />
          Я создаю <span className={styles.accent}>десктопные приложения</span>,{" "}
          <span className={styles.accent}>Android-клиенты</span> и{" "}
          <span className={styles.accent}>телеграм-ботов</span>.
        </h1>

        <p className={styles.subtitle}>
          Пять лет в разработке, основной язык — Python. Берусь за задачу целиком
          и довожу до работающего результата, а не до папки с исходниками.
        </p>

        <div className={styles.actions}>
          <a className="btn btn--primary" href="#projects">
            <span>Смотреть проекты</span>
          </a>

          {RESUME_URL && (
            <a className="btn btn--glass" href={RESUME_URL} download>
              <span>Скачать резюме</span>
            </a>
          )}

          <a
            className="btn btn--glass"
            href={`https://t.me/${TELEGRAM_USER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Написать в Telegram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
