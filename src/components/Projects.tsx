import { projects, type Project } from "@/lib/projects";
import styles from "./Projects.module.css";

const GithubIcon = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10" />
  </svg>
);

/**
 * Превью кейса.
 *
 * Ролик лежит на диске, и карточка показывает его: без звука,
 * зациклено, запуск по наведению. Файла нет, остаётся скриншот,
 * который при наведении медленно проезжает сверху вниз. Второе
 * не замена первому, а работающий вариант на то время, пока
 * записи экрана не сняты.
 */
function Preview({ p }: { p: Project }) {
  const shots = p.previews.filter((v) => !v.pending);
  const kind = p.previews[0]?.kind ?? "desktop";

  if (p.clip) {
    return (
      <div className={styles.preview} data-kind="clip">
        <video
          className={styles.clip}
          poster={shots[0]?.src}
          muted
          loop
          playsInline
          preload="none"
          aria-label={shots[0]?.alt ?? p.title}
        >
          {p.clip.webm && <source src={p.clip.webm} type="video/webm" />}
          {p.clip.mp4 && <source src={p.clip.mp4} type="video/mp4" />}
        </video>
      </div>
    );
  }

  if (shots.length === 0) {
    return (
      <div className={styles.preview} data-kind={kind}>
        <span className={styles.pending} role="img" aria-label={p.previews[0]?.alt ?? p.title}>
          скриншот готовится
        </span>
      </div>
    );
  }

  return (
    <div className={styles.preview} data-kind={kind}>
      {shots.map((v) => (
        /* Обычный <img>: картинок мало и они уже сжаты,
           а /_next/image это лишняя динамическая ручка. */
        <img
          key={v.src}
          src={v.src}
          alt={v.alt}
          loading="lazy"
          decoding="async"
          data-zoomable
          data-gallery={p.id}
        />
      ))}
    </div>
  );
}

function Card({ p, index }: { p: Project; index: number }) {
  const hasPreview = p.previews.length > 0 || p.clip !== null;

  return (
    <article
      className={`reveal glass-card ${styles.card}`}
      data-col={p.col}
      data-lead={p.lead || undefined}
      data-delay={(index % 2) + 1}
    >
      {hasPreview && (
        <div className={styles.previewWrap}>
          <Preview p={p} />
          <span className={`caps ${styles.index}`} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}

      <div className={styles.body}>
        <header className={styles.head}>
          <h3 className={`display ${styles.title}`}>{p.title}</h3>
          <p className={`caps ${styles.platform}`}>{p.platform}</p>
        </header>

        {/* Роль отдельной строкой: на кейсе она отвечает на вопрос
            «что делал именно ты», и её ищут первой. */}
        <p className={styles.role}>{p.role}</p>

        <p className={styles.summary}>{p.summary}</p>

        {p.metrics.length > 0 && (
          <dl className={styles.metrics}>
            {p.metrics.map((m) => (
              <div key={m.label} className={styles.metric}>
                <dt className={styles.metricValue}>{m.value}</dt>
                <dd className={styles.metricLabel}>{m.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className={styles.badges}>
          {p.stack.map((s) => (
            <li className={`caps ${styles.badge}`} key={s}>
              {s}
            </li>
          ))}
        </ul>

        <div className={styles.links}>
          {p.repo ? (
            <a className={styles.link} href={p.repo} target="_blank" rel="noopener noreferrer">
              <GithubIcon />
              Репозиторий
            </a>
          ) : (
            <span className={styles.linkMuted}>Исходники закрыты</span>
          )}

          {p.demo ? (
            <a className={styles.link} href={p.demo.href} target="_blank" rel="noopener noreferrer">
              {p.demo.label}
              <ArrowIcon />
            </a>
          ) : (
            <span className={styles.linkMuted}>Десктоп, демо нет</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="shell">
        <p className="section-label">Проекты</p>
        <h2 className="section-title">
          Избранные <em>работы</em>
        </h2>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <Card key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
