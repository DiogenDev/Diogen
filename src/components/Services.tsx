import { services } from "@/lib/content";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="shell">
        <p className="section-label">Услуги</p>
        <h2 className="section-title">Что беру в работу</h2>

        <ul className={styles.grid}>
          {services.map((s) => (
            <li className={`reveal glass-card ${styles.card}`} key={s.title}>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
