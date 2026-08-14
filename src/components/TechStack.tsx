import { stackGroups } from "@/lib/content";
import styles from "./TechStack.module.css";

export default function TechStack() {
  return (
    <section className="section" id="stack">
      <div className="shell">
        <p className="section-label">Стек</p>
        <h2 className="section-title">Чем работаю</h2>

        <div className={styles.groups}>
          {stackGroups.map((group) => (
            <div className={`reveal ${styles.group}`} key={group.category}>
              <h3 className={styles.category}>{group.category}</h3>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li className={styles.badge} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
