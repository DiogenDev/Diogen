import { projects } from "@/lib/projects";
import styles from "./Projects.module.css";

const GithubIcon = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="shell">
        <p className="section-label">Проекты</p>
        <h2 className="section-title">Избранные работы</h2>

        <div className={styles.grid}>
          {projects.map((p) => (
            <article className={`reveal glass-card ${styles.card}`} key={p.id}>
              {p.previews.length > 0 && (
                <div className={styles.previewWrap}>
                  <div className={styles.preview} data-kind={p.previews[0].kind}>
                    {p.previews.some((v) => !v.pending) ? (
                      /* Обычный <img>: картинок мало и они уже сжаты,
                         а /_next/image — лишняя динамическая ручка. */
                      p.previews
                        .filter((v) => !v.pending)
                        .map((v) => (
                          <img
                            key={v.src}
                            src={v.src}
                            alt={v.alt}
                            loading="lazy"
                            decoding="async"
                            data-zoomable
                            data-gallery={p.id}
                          />
                        ))
                    ) : (
                      <span className={styles.pending} role="img" aria-label={p.previews[0].alt}>
                        скриншот готовится
                      </span>
                    )}
                  </div>

                  {p.previews.some((v) => !v.pending) && (
                    <span className={styles.hint} aria-hidden="true">
                      {p.previews.filter((v) => !v.pending).length > 1
                        ? "Листайте · нажмите, чтобы увеличить"
                        : "Нажмите, чтобы увеличить"}
                    </span>
                  )}
                </div>
              )}

              <div className={styles.body}>
                <header className={styles.head}>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={`mono ${styles.platform}`}>{p.platform}</p>
                </header>

                <p className={styles.summary}>{p.summary}</p>

                <ul className={styles.badges}>
                  {p.stack.map((s) => (
                    <li className={styles.badge} key={s}>
                      {s}
                    </li>
                  ))}
                </ul>

                <div className={styles.links}>
                  {p.repo ? (
                    <a
                      className={styles.link}
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon />
                      Репозиторий
                    </a>
                  ) : (
                    <span className={styles.linkMuted}>Исходники закрыты</span>
                  )}

                  {p.demo ? (
                    <a
                      className={styles.link}
                      href={p.demo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Демо · {p.demo.label}
                    </a>
                  ) : (
                    <span className={styles.linkMuted}>Десктоп — демо нет</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
