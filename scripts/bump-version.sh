#!/usr/bin/env bash
# Dopisuje do linków CSS/JS parametr ?v=<skrót zawartości pliku> (cache-busting).
# Uruchom po KAŻDEJ zmianie assets/css/styles.css lub assets/js/main.js, przed commitem.
# Dzięki temu przeglądarka (i cache Hostingera) nigdy nie połączy nowego HTML-a ze starym CSS-em/JS-em.
set -euo pipefail
cd "$(dirname "$0")/.."

hash_of() { sha1sum "$1" | cut -c1-8; }
CSS_V="$(hash_of assets/css/styles.css)"
JS_V="$(hash_of assets/js/main.js)"

for f in index.html 404.html; do
  [[ -f "$f" ]] || continue
  sed -i -E \
    -e "s#(assets/css/styles\.css)(\?v=[0-9a-f]+)?#\1?v=${CSS_V}#g" \
    -e "s#(assets/js/main\.js)(\?v=[0-9a-f]+)?#\1?v=${JS_V}#g" "$f"
done
echo "Wersje: styles.css?v=${CSS_V}, main.js?v=${JS_V}"
