#!/usr/bin/env bash
# Podmienia adres domeny we wszystkich plikach (canonical, Open Graph, JSON-LD, sitemap, robots).
# Użycie:  ./scripts/set-domain.sh https://twoja-domena.pl            (z placeholdera)
#          ./scripts/set-domain.sh https://nowa.pl https://stara.pl   (zmiana już ustawionej domeny)
set -euo pipefail

NEW="${1:-}"
OLD="${2:-https://TWOJA-DOMENA.pl}"

if [[ -z "$NEW" || ! "$NEW" =~ ^https?://[^/]+$ ]]; then
  echo "Podaj adres w formacie https://domena.pl (bez końcowego ukośnika)." >&2
  exit 1
fi

cd "$(dirname "$0")/.."
FILES=(index.html robots.txt sitemap.xml)
for f in "${FILES[@]}"; do
  sed -i "s|${OLD}|${NEW}|g" "$f"
done
echo "Zamieniono ${OLD} → ${NEW} w: ${FILES[*]}"
