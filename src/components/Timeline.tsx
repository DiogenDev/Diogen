import { timeline } from "@/lib/content";
import styles from "./Timeline.module.css";

export default function Timeline() {
  return (
    <section className="section" id="experience">
      <div className="shell">
        <p className="section-label">Опыт</p>
        <h2 className="section-title">
          Путь <em>в разработке</em>
        </h2>

        <ol className={styles.list}>
          {timeline.map((entry) => (
            <li className={`reveal ${styles.item}`} key={entry.title}>
              <div className={styles.marker} aria-hidden="true" />

              <div className={styles.content}>
                <p className={`mono ${styles.period}`}>{entry.period}</p>
                <h3 className={`display ${styles.title}`}>{entry.title}</h3>
                <p className={`mono ${styles.meta}`}>{entry.meta}</p>

                <ul className={styles.points}>
                  {entry.points.map((point) => (
                    <li className={styles.point} key={point}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
