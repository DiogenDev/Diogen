"""
Собирает резюме в PDF из тех же данных, что и сайт (сейчас — две страницы).

Запуск:  python scripts/build_cv.py
Результат: public/rinat-diogendev-cv.pdf

Кириллица требует TTF с юникодом — берём системный Segoe UI, при его
отсутствии откатываемся на Arial.
"""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "rinat-diogendev-cv.pdf"
FONTS = Path("C:/Windows/Fonts")

INK = (15, 23, 42)
MUTED = (71, 85, 105)
ACCENT = (4, 120, 87)
LINE = (203, 213, 225)

CONTACTS = "github.com/diogendev   ·   t.me/diogendev   ·   vk.ru/id1117580536"

SUMMARY = (
    "Разработчик полного цикла. Пять лет в разработке, основной язык — Python. "
    "Довожу проекты до собранного файла, который запускается на чужой машине: "
    "от модели данных до интерфейса, сборки и деплоя."
)

STACK = [
    ("Языки", "Python, Kotlin, TypeScript, JavaScript, SQL, C++, C#"),
    ("Фреймворки", "Next.js, React, Node.js, Jetpack Compose, PySide6 / Qt, wxPython, aiogram"),
    ("Данные и инструменты", "SQLite, Redis, Git, Android Studio, PyInstaller, ffmpeg, Vercel"),
]

PROJECTS = [
    (
        "Seconder — трекер экранного времени",
        "Windows · Python, PySide6 / Qt 6, SQLite, WinAPI",
        [
            "Учёт времени по активному окну с детектом простоя и отсевом системных процессов.",
            "Почасовые корзины «приложение + день + час»: тысячи строк в базе за год вместо миллионов.",
            "Графики на QPainter без внешних библиотек, шесть тем, экспорт в CSV, сборка в один exe.",
        ],
    ),
    (
        "Seconder for Android",
        "Android 8.0+ · Kotlin, Jetpack Compose, SQLite, WorkManager",
        [
            "Чтение системного журнала через UsageStatsManager вместо собственной службы опроса.",
            "Фоновая задача раз в три часа переносит события в свою базу до их удаления системой.",
            "Разрешение INTERNET не запрашивается: приложение технически не может отправить данные.",
        ],
    ),
    (
        "YouTube Downloader",
        "Windows · Python, wxPython, yt-dlp, ffmpeg",
        [
            "Загрузка до 2160p60 со склейкой раздельных дорожек видео и звука через ffmpeg.",
            "Предпросмотр в окне через локальный сервер на 127.0.0.1 в обход ошибки 153.",
            "Свои виджеты на wx.GraphicsContext ради корректной тёмной темы.",
        ],
    ),
    (
        "Портфолио diogendev.vercel.app",
        "Веб · Next.js 15, TypeScript, CSS Modules",
        [
            "Статическая сборка без серверных обработчиков и внешних доменов.",
            "Content-Security-Policy от default-src 'none', HSTS, nosniff, Permissions-Policy.",
        ],
    ),
]

SERVICES = (
    "Телеграм-боты и мини-аппы (aiogram, webhook, платежи, проверка initData) · "
    "сайты под ключ · десктоп под Windows · Android и проектирование хранения данных."
)


def pick_font() -> tuple[Path, Path]:
    """Возвращает пути к обычному и жирному начертанию юникодного шрифта."""
    for regular, bold in (("segoeui.ttf", "segoeuib.ttf"), ("arial.ttf", "arialbd.ttf")):
        r, b = FONTS / regular, FONTS / bold
        if r.exists() and b.exists():
            return r, b
    raise SystemExit("Не найден системный TTF с кириллицей (segoeui/arial).")


class CV(FPDF):
    def header(self) -> None:  # noqa: D102 — шапки на страницах не нужно
        pass

    def footer(self) -> None:
        self.set_y(-12)
        self.set_font("ui", "", 7.5)
        self.set_text_color(*MUTED)
        self.cell(0, 4, f"diogendev.vercel.app   ·   стр. {self.page_no()}", align="C")

    def rule(self) -> None:
        self.set_draw_color(*LINE)
        self.set_line_width(0.2)
        y = self.get_y()
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(2.5)

    def section(self, label: str) -> None:
        self.ln(3)
        self.set_font("ui", "B", 8.5)
        self.set_text_color(*ACCENT)
        self.cell(0, 4.5, label.upper(), new_x="LMARGIN", new_y="NEXT")
        self.ln(0.8)
        self.rule()


def build() -> None:
    regular, bold = pick_font()

    pdf = CV(format="A4")
    pdf.set_margins(18, 16, 18)
    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.add_font("ui", "", str(regular))
    pdf.add_font("ui", "B", str(bold))
    pdf.set_title("Ринат — diogen(dev) — резюме")
    pdf.set_author("Ринат (diogen(dev))")
    pdf.add_page()

    # ---------- шапка ----------
    pdf.set_font("ui", "B", 22)
    pdf.set_text_color(*INK)
    pdf.cell(0, 9, "Ринат — diogen(dev)", new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("ui", "", 11)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 6, "Разработчик полного цикла", new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("ui", "", 8.5)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 5, CONTACTS, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)
    pdf.rule()

    # ---------- о себе ----------
    pdf.set_font("ui", "", 9.5)
    pdf.set_text_color(*INK)
    pdf.multi_cell(0, 4.8, SUMMARY)

    # ---------- стек ----------
    pdf.section("Стек")
    for category, items in STACK:
        pdf.set_font("ui", "B", 9)
        pdf.set_text_color(*INK)
        pdf.cell(38, 4.8, category)
        pdf.set_font("ui", "", 9)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(0, 4.8, items, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(0.6)

    # ---------- проекты ----------
    pdf.section("Проекты")
    for title, meta, points in PROJECTS:
        pdf.set_font("ui", "B", 10)
        pdf.set_text_color(*INK)
        pdf.cell(0, 5, title, new_x="LMARGIN", new_y="NEXT")

        pdf.set_font("ui", "", 8.5)
        pdf.set_text_color(*MUTED)
        pdf.cell(0, 4.4, meta, new_x="LMARGIN", new_y="NEXT")

        pdf.set_font("ui", "", 9)
        pdf.set_text_color(*INK)
        for point in points:
            x = pdf.get_x()
            pdf.cell(4, 4.6, "—")
            pdf.set_x(x + 4)
            pdf.multi_cell(0, 4.6, point, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(2)

    # ---------- услуги ----------
    pdf.section("Беру в работу")
    pdf.set_font("ui", "", 9)
    pdf.set_text_color(*INK)
    pdf.multi_cell(0, 4.8, SERVICES)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"OK: {OUT}  ({OUT.stat().st_size} байт)")


if __name__ == "__main__":
    build()
