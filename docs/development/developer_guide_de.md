# Warp-Menü entwickeln

Das Warp-Menü wird in Javascript und CSS entwickelt. Dabei kommen die folgenden Komponenten zum Einsatz:
* [Vite](https://vitejs.dev/) 
* [Tailwind CSS](https://tailwindcss.com/)
* [Post CSS](https://postcss.org/)

Zusätzlich wird die Tailwind-Konfiguration des Cloudogu-Tailwind-Themes verwendet.

## CSS generieren
Mit Tailwind und PostCSS wird das für das Warp-Menü benötigte CSS generiert.
Dies kann mit `yarn tw` gestartet werden.

### 1. Tailwind
Mit Tailwind werden alle benötigten CSS-Klassen generiert.
Dabei scannt Tailwind alle `*.js`-Dateien auf enthaltene CSS-Klassen und erstellt diese entsprechend.
Die Tailwind-Konfiguration ist [hier](../../tailwind.config.js) zu finden. 

### 2. PostCSS
Anschließend werden mit PostCSS alle `rem`-Angaben in `px` umgerechnet.
Diese ist nötig, da das Warp-Menü direkt das HTML der einzelnen Dogus eingebunden wird.
`rem`-Angaben sind relativ zur Schriftgröße im Root-`<html>`-Element und könne somit nicht vom Warp-Menü kontrolliert werden.
Die PostCSS-Konfiguration ist [hier](../../postcss.config.js) zu finden.

### Resultierende CSS-Datei
Die generierte CSS-Datei wird unter [src/generated.css](../../src/generated.css) abgelegt.

#### Watch
Mit `yarn watch` wird auf Änderungen im Code gehorcht und das CSS entsprechend neu generiert.

## Bauen
Mit `yarn build` wird das CSS wie [oben](#css-generieren) beschrieben generiert und zusätzlich das Javascript verpackt und minifiziert.
Die resultierenden Dateien sind im `target`-Verzeichnis zu finden.
Außerdem wird dort eine Zip-Datei mit aus den CSS- und JS-Dateien erstellt, die für ein Release verwendet werden kann.

## lokale Dev-Server

Für die lokale Entwicklung des Warp-Menüs kann mit `yarn dev` ein Dev-Server gestartet werden.
Dieser ist unter http://localhost:4173/sample/index.html verfügbar.

Die Beispiel-Seite für die lokale Entwicklung ist im [sample-Verzeichnis](../../sample) zu finden.
Hier ist die Konfiguration des Warp-Menüs abgelegt: [menu.json](../../sample/warp/menu.json).

> Zusätzlich zum Dev-Server kann mit `yarn watch` die CSS-Generierung gestartet werden. 
> So werden Änderungen sofort übernommen und sind nach einem Neuladen der Seite im Browser sichtbar.


## Im nginx testen
Um das Warp-Menü im nginx zu testen, muss es in den nginx-Container kopiert werden

1. Warp-Menu bauen und in das lokale Ecosystem kopieren
  - `yarn install`
  - `vite build`
  - `cp -r target/warp <ecosystem/root>`
2. Warp-Menü-Artefakte in den nginx-Container kopieren
  - `docker cp warp nginx:/var/www/html/`
  - `docker restart nginx`


