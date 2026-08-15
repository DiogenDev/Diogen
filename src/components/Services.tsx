import { services } from "@/lib/content";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="shell">
        <p className="section-label">Услуги</p>
        <h2 className="section-title">
          Что беру <em>в работу</em>
        </h2>

        <ul className={styles.grid}>
          {services.map((s, i) => (
            <li
              className={`reveal glass-card ${styles.card}`}
              key={s.title}
              data-delay={(i % 2) + 1}
            >
              <p className={`caps ${styles.stack}`}>{s.stack}</p>
              <h3 className={`display ${styles.title}`}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
              <p className={styles.deliverable}>
                <span className={`caps ${styles.deliverableLabel}`}>На выходе</span>
                {s.deliverable}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
