# Kwiaciarnia „Wiecha Kwiatów" — strona internetowa

Jednostronicowa strona-wizytówka kwiaciarni z Gdyni (ul. Legionów 107K/2U). Czysty HTML + CSS + niewielki JavaScript, bez frameworków i bez kroku budowania — gotowa do wgrania na Hostingera.

**Dlaczego one-page?** Potwierdzonych publicznie informacji o firmie jest niewiele (nazwa, adres, telefon, e-mail, zakres oferty). Zgodnie z założeniem „zero zmyślania" nie dodano podstron ani treści, których nie da się poprzeć faktami. Pełny audyt źródeł: [`docs/RESEARCH.md`](docs/RESEARCH.md).

## Zawartość strony

Hero z CTA → szybki kontakt → oferta (5 potwierdzonych kategorii) → o kwiaciarni → kontakt (dane, godziny, formularz, mapa) → stopka. Na mobile: dolny pasek „Zadzwoń / Dojazd".

## Struktura plików

```
index.html              strona główna (treść, meta SEO, JSON-LD)
404.html                strona błędu
assets/css/styles.css   style (tokeny kolorów na górze pliku)
assets/js/main.js       menu, animacje wejścia, formularz, mapa na kliknięcie
assets/fonts/           fonty Fraunces i Manrope (self-hosted, licencja OFL)
assets/img/             favicon, ikony, grafika Open Graph
scripts/                set-domain.sh, predeploy-check.sh, og-image.html (źródło grafiki OG)
robots.txt, sitemap.xml, site.webmanifest, .htaccess
docs/RESEARCH.md        źródła i audyt treści
```

## Podgląd lokalny

```bash
python3 -m http.server 8000
# otwórz http://localhost:8000
```

## Przed publikacją (checklista)

1. **Ustaw domenę** (canonical, Open Graph, JSON-LD, sitemap i robots używają placeholdera `https://TWOJA-DOMENA.pl`):
   ```bash
   ./scripts/set-domain.sh https://twoja-domena.pl
   ./scripts/predeploy-check.sh
   ```
2. **Potwierdź, że link Google Maps wskazuje właściwą firmę** (patrz `docs/RESEARCH.md`).
3. Po aktywacji SSL w hPanel odkomentuj przekierowanie HTTPS w `.htaccess`.
4. Przetestuj mapę i przyciski „Dojazd" na żywej domenie (w środowisku, w którym powstała strona, Google był zablokowany, więc osadzenie mapy nie było testowane na żywo).
5. Po publikacji: dodaj stronę w Google Search Console i wyślij `sitemap.xml`, a w wizytówce Google Business Profile wpisz adres strony.

## Wdrożenie na Hostingerze

- **Z Gita:** hPanel → Strony → Zaawansowane → Git → podłącz to repozytorium i wybierz gałąź do wdrożenia (katalog docelowy: `public_html`).
- **Ręcznie:** wgraj zawartość repozytorium (bez `.git`, `docs`, `scripts`) do `public_html` przez Menedżer plików lub FTP.

Statyczne pliki nie wymagają PHP ani bazy danych.

## Uzupełnianie treści (gdy klient dostarczy materiały)

Miejsca do uzupełnienia są oznaczone w `index.html` komentarzami `TODO(klient)` / `TODO(integracja)`.

| Co | Gdzie / jak |
|---|---|
| **Godziny otwarcia** | Sekcja `.hours` w `#kontakt` — zamień akapit na listę `<dl>` z dniami i godzinami. Dodaj też `openingHoursSpecification` do JSON-LD w `<head>`. |
| **Formularz kontaktowy** | Wpisz adres usługi w atrybucie `data-endpoint` formularza `#contact-form`. Formularz wysyła `POST` z JSON-em `{name, email, phone, topic, message}`. Pasują m.in. Formspree, Web3Forms lub własny skrypt PHP na Hostingerze. Do czasu podpięcia pokazuje komunikat z przyciskiem „napisać e-mailem". |
| **Polityka prywatności / dane firmy** | Zlinkuj w zgodzie przy formularzu i w stopce (komentarze `TODO(klient)`). Do uzupełnienia przez klienta lub jego prawnika. |
| **Zdjęcia / realizacje** | Wrzuć do `assets/img/`, zoptymalizuj (WebP/AVIF, szerokość ≤ 1600 px) i dodaj sekcję galerii z `loading="lazy"`, `width`/`height` i opisowym `alt`. **Tylko prawdziwe zdjęcia firmy.** |
| **Logo** | Podmień tekstowy wordmark w `.brand` i `assets/img/favicon.svg` (obecny favicon „W" jest tymczasowy). |
| **Opinie** | Dodawaj wyłącznie prawdziwe, z imieniem/zgodą autora, albo osadź widget Google. |
| **Social media, kod pocztowy, nagrody** | Po potwierdzeniu (lista w `docs/RESEARCH.md`) dodaj do stopki i JSON-LD (`sameAs`, `postalCode`). |
| **Dekoracje tła** | Każda sekcja ma warstwę `.bg-decor` (gradienty, siatka kropek, gałązki, kontury kwiatów, okręgi, płatki). Rysunki to symbole `#d-sprig`, `#d-bloom`, `#d-arch`, `#d-petal` w sprite na górze `index.html`; pozycje i krycie są w sekcji „10. DEKORACJE TŁA" w `styles.css`. Aby coś wyłączyć, usuń element z `.bg-decor`. Płatki dryfują bardzo wolno, a przy `prefers-reduced-motion` stoją w miejscu. |
| **Kolory** | Tokeny w `:root` na górze `assets/css/styles.css` (kontrast sprawdzony wg WCAG AA — po zmianie sprawdź ponownie). |
| **Nowa pozycja oferty** | Skopiuj `<li class="offer-item">` w `#oferta` i dodaj `<option>` o tej samej wartości w `<select id="f-topic">`. |

## Jakość i dostępność

- Lighthouse (lokalnie, mobile i desktop): Performance / Accessibility / Best Practices / SEO — **100 / 100 / 100 / 100**; CLS 0.
- Semantyczny HTML, jeden `H1`, skip-link, widoczne style `:focus-visible`, obsługa klawiaturą (menu zamykane `Esc`), `aria-*` w menu i formularzu, kontrast WCAG AA.
- `prefers-reduced-motion` wyłącza animacje; bez JavaScriptu cała treść jest widoczna.
- Brak ciasteczek i trackerów. Mapa Google ładuje się dopiero po kliknięciu.
- Waga: ok. 130 KB przy pierwszym wejściu (bez kompresji serwera).

## Technologia

HTML5, CSS (zmienne, grid, `clamp()`), vanilla JS. Fonty: [Fraunces](https://github.com/undercasetype/Fraunces) i [Manrope](https://github.com/sharanda/manrope) na licencji SIL OFL (podzbiór łaciński + polskie znaki, pliki licencji w `assets/fonts/`).
