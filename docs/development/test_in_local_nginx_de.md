# Kopiere lokales warp-menu in den nginx

## Baue warp-menu Artefakte und kopiere diese ins lokale Ecosystem
innerhalb des Warp-Menü-Repos ausführen
- yarn install
- gulp
- cp -r target/warp <ecosystem/root>

## Kopieren von warp-menu Artefakten in den nginx Container
- docker cp warp nginx:/var/www/html/
- docker restart nginx
