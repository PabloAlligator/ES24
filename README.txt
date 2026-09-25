ES24 — glass header

Что добавлено:
- site/components/header.html — отдельный компонент хедера;
- site/js/main.js — загрузка компонента + dropdown + mobile menu + search + hide/show on scroll;
- site/scss/header.scss — исходный SCSS хедера;
- site/css/header.css — готовый runtime CSS, поэтому пересобирать SCSS для проверки не нужно;
- index.html — preload компонента, подключение header.css и slot для компонента;
- hero-intro.js / hero-smoke.js — текущие версии сохранены без изменения.

Поведение:
- скролл вниз: header скрывается;
- скролл вверх: header появляется;
- в начале страницы всегда видим;
- после 24px скролла glass становится чуть плотнее;
- desktop hover/focus на «Мотоциклы» открывает dropdown;
- поиск открывает glass search panel;
- mobile <= 900px: burger + logo + search + favorite + «В наличии»;
- mobile menu и вложенный пункт «Мотоциклы» работают отдельно;
- Escape закрывает поиск/меню;
- prefers-reduced-motion учтён.

Маршруты сейчас заложены как будущие страницы:
index.html, motorcycles.html, equipment.html, company.html, contacts.html, partners.html, favorites.html.
Если имена страниц в проекте будут другими — меняются только href в header.html.
