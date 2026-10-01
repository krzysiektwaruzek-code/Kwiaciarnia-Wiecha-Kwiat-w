#!/usr/bin/env bash
# Szybka kontrola przed publikacją: czy nie została domena-placeholder i czy istnieją pliki wymagane przez <head>.
set -uo pipefail
cd "$(dirname "$0")/.."
fail=0

if grep -rn "TWOJA-DOMENA" index.html robots.txt sitemap.xml >/dev/null; then
  echo "✗ W plikach nadal jest placeholder domeny (TWOJA-DOMENA.pl) – uruchom scripts/set-domain.sh"
  fail=1
else
  echo "✓ Domena ustawiona"
fi

for f in index.html 404.html robots.txt sitemap.xml site.webmanifest .htaccess \
         assets/css/styles.css assets/js/main.js assets/img/favicon.svg assets/img/favicon-32.png \
         assets/img/apple-touch-icon.png assets/img/og-image.png \
         assets/fonts/fraunces-latin.woff2 assets/fonts/fraunces-latin-ext.woff2 \
         assets/fonts/manrope-latin.woff2 assets/fonts/manrope-latin-ext.woff2; do
  if [[ ! -f "$f" ]]; then echo "✗ Brak pliku: $f"; fail=1; fi
done
[[ $fail -eq 0 ]] && echo "✓ Wszystkie wymagane pliki są na miejscu"

if grep -n "TODO(" index.html >/dev/null; then
  echo "ℹ W index.html są oznaczone miejsca do uzupełnienia (TODO(klient) / TODO(integracja)):"
  grep -n "TODO(" index.html | sed 's/^/   /'
fi
exit $fail
