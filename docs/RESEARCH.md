# Research firmy i audyt treści

Data researchu: 2026-10-01. Zasada projektu: **na stronie jest wyłącznie to, co udało się potwierdzić**. Wszystko inne zostało pominięte albo oznaczone jako miejsce do uzupełnienia (`TODO(klient)` w `index.html`).

## Ograniczenia researchu (ważne)

Środowisko, w którym powstała strona, ma politykę sieciową blokującą większość domen. **Nie udało się otworzyć**: Google Maps (podany link z CID), Facebooka, trojmiasto.pl, orlyflorystyki.pl, katalogów firm (aleo.com, owg.pl, kwiatyyy.pl). Blokady nie były obchodzone.

Dane pochodzą więc z wyników wyszukiwarki (kilka niezależnych zapytań) — nie z bezpośredniego odczytu wymienionych stron. Dane, które powtarzały się we wszystkich zapytaniach, uznano za potwierdzone; dane sprzeczne lub pojawiające się jednorazowo — pominięto.

**Niezweryfikowane założenie:** link Google Maps (`cid=7036620546033664155`) nie mógł zostać otwarty, więc nie sprawdzono bezpośrednio, że wskazuje na tę firmę. Założenie opiera się na nazwie repozytorium (Kwiaciarnia „Wiecha Kwiatów") i na zgodności wyników wyszukiwania. **Proszę otworzyć link i potwierdzić, że to ta sama wizytówka.**

## Dane użyte na stronie (potwierdzone w wielu zapytaniach)

| Informacja | Wartość | Gdzie na stronie |
|---|---|---|
| Nazwa | Kwiaciarnia „Wiecha Kwiatów" | wszędzie, JSON-LD |
| Miasto | Gdynia | hero, o nas, kontakt, JSON-LD |
| Adres | ul. Legionów 107K/2U | hero, kontakt, stopka, JSON-LD |
| Telefon | +48 726 560 460 | CTA, kontakt, stopka, JSON-LD |
| E-mail | wiechakwiatow@gmail.com | kontakt, stopka, JSON-LD |
| Zakres oferty | bukiety, kompozycje kwiatowe, kwiaty doniczkowe, dekoracje kwiatowe, wieńce pogrzebowe | hero, oferta, o nas |
| Opis | „kompozycje przygotowywane z dbałością o szczegóły i zgodnie z indywidualnymi oczekiwaniami klientów" (opis z profilu firmy w serwisie Orły Florystyki) | O kwiaciarni |
| Link do wizytówki Google | `https://www.google.com/maps?cid=7036620546033664155` (podany przez zleceniodawcę) | przyciski, JSON-LD `hasMap` |

## Znalezione, ale celowo NIE użyte

| Informacja | Powód pominięcia | Jak dodać po weryfikacji |
|---|---|---|
| Kod pocztowy (81-525 **lub** 81-472) | Wyniki są sprzeczne | Wpisać potwierdzony kod w sekcji kontaktu i `postalCode` w JSON-LD |
| Ocena Google 4,6 (ok. 51 opinii) | Wartość zmienna w czasie, niezweryfikowana u źródła; statyczna liczba szybko stałaby się nieprawdziwa | Podlinkowano wizytówkę Google („Zobacz opinie w Google"). Można dodać widget opinii |
| Laureat plebiscytu „Orły Florystyki" (lata 2022–2025) | Wyniki zgodne co do udziału, ale **sprzeczne co do medali/lat**; to twierdzenie o wyróżnieniu, więc wymaga źródła | Potwierdzić na profilu w orlyflorystyki.pl i dodać sekcję z dokładnymi latami |
| Płatność kartą / NFC, dostęp dla osób z niepełnosprawnościami | Pojedyncze źródło, atrybuty Google niezweryfikowane | Potwierdzić z właścicielem |
| Profil na Facebooku (`facebook.com/p/Kwiaciarnia-Wiecha-Kwiatów-100067391216454`) | Nie udało się otworzyć i potwierdzić, że to ta sama firma | Po potwierdzeniu dodać link w stopce i `sameAs` w JSON-LD |
| Dane właściciela / podmiotu z CEIDG | Rozbieżne wpisy, dane osobowe, nie są potrzebne do strony | Dane rejestrowe (nazwa podmiotu, NIP) dodać do stopki po dostarczeniu przez klienta |
| „6. miejsce w rankingu florystów Gdyni" i podobne hasła z podsumowań wyszukiwarki | Jednorazowe, bez możliwości sprawdzenia | — |
| Godziny otwarcia | **Nie znaleziono** | Sekcja „Godziny otwarcia" odsyła do Google Maps; po otrzymaniu godzin wpisać je i dodać `openingHoursSpecification` |
| Własna strona www, Instagram | **Nie znaleziono** | — |
| Zdjęcia firmy | **Brak dostępu** do materiałów, które można legalnie wykorzystać | Klient dostarcza zdjęcia → patrz README |
| Logo | **Nie znaleziono** | Strona opiera się na typografii; favicon „W" jest tymczasowy |

## Czego na stronie świadomie nie ma

Cen, promocji, historii firmy, liczby lat doświadczenia, statystyk, opinii klientów, nazwisk pracowników/właściciela, certyfikatów, gwarancji, realizacji i galerii, partnerów, informacji o dostawie, zdjęć (w tym generowanych przez AI lub stockowych). Ilustracja w hero to **wektorowa dekoracja** narysowana w SVG, a nie zdjęcie ani logo firmy.

## Dane strukturalne (JSON-LD)

Typ `Florist` zawiera wyłącznie: nazwę, URL, telefon, e-mail, adres (ulica + miasto + kraj) i link do mapy. Celowo brak: `openingHoursSpecification`, `geo`, `image`, `priceRange`, `aggregateRating`, `sameAs`, `postalCode` — nie zostały potwierdzone.
