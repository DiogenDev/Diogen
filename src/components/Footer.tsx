import { socials, site, TELEGRAM_USER } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`textured ${styles.footer}`} id="contact">
      <div className="shell">
        <div className={styles.cta}>
          <p className={`caps ${styles.ctaLabel}`}>Контакты</p>
          <h2 className={`display ${styles.ctaTitle}`}>
            Обсудим <em>задачу</em>
          </h2>
          <p className={styles.ctaBody}>
            Напишите, что нужно сделать. Техническое задание не обязательно:
            разберусь по описанию и назову сроки и цену.
          </p>
          <a
            className={`btn btn--primary ${styles.ctaButton}`}
            href={`https://t.me/${TELEGRAM_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            data-magnet
          >
            <span>Написать в Telegram</span>
          </a>
        </div>

        <div className={styles.bottom}>
          <p className={`mono ${styles.copy}`}>
            © {new Date().getFullYear()} {site.name} · {site.nick}
          </p>

          <ul className={styles.links}>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  className={styles.link}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
