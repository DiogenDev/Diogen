import ThemeToggle from "./ThemeToggle";
import { site } from "@/lib/site";
import styles from "./Header.module.css";

const nav = [
  { href: "#projects", label: "Проекты" },
  { href: "#stack", label: "Стек" },
  { href: "#experience", label: "Опыт" },
  { href: "#contact", label: "Контакты" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`shell ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
          {site.nickPlain}
          <span className={styles.dot} aria-hidden="true" />
        </a>

        <nav className={styles.nav} aria-label="Разделы страницы">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
