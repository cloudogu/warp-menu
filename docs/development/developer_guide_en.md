# Warp menu development

The warp menu is developed in Javascript and CSS. The following components are used:
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Post CSS](https://postcss.org/)

In addition, the Tailwind configuration of the Cloudogu-Tailwind-Theme is used.

## Generate CSS
The CSS required for the warp menu is generated with Tailwind and PostCSS.
This can be started with `yarn tw`.

### 1. Tailwind
Tailwind is used to generate all the required CSS classes.
Tailwind scans all `*.js` files for contained CSS classes and creates them accordingly.
The Tailwind configuration can be found [here](../../tailwind.config.js).

### 2. PostCSS
All `rem` specifications are then converted to `px` with PostCSS.
This is necessary because the warp menu directly integrates the HTML of the individual dogus.
`rem` specifications are relative to the font size in the root `<html>` element and can therefore not be controlled by the warp menu.
The PostCSS configuration can be found [here](../../postcss.config.js).

### Resulting CSS-file
The generated CSS file is stored under [src/generated.css](../../src/generated.css).

#### Watch
With `yarn watch` changes in the code are listened to and the CSS is regenerated accordingly.

## Build
With `yarn build` the CSS is generated as described [above](#css-generate) and additionally the Javascript is packaged and minified.
The resulting files can be found in the `target` directory.
A zip file is also created there from the CSS and JS files, which can be used for a release.

## local dev server
A dev server can be started with `yarn dev` for the local development of the Warp menu.
This is available at http://localhost:4173/sample/index.html.

The sample page for local development can be found in the [sample directory](../../sample).
The configuration of the warp menu is stored here: [menu.json](../../sample/warp/menu.json).

> In addition to the dev server, CSS generation can be started with `yarn watch`.
> Changes are applied immediately and are visible in the browser after reloading the page.


## Test in nginx
To test the warp menu in nginx, it must be copied into the nginx container

1. build warp menu and copy it into the local ecosystem
- `yarn install`
- `vite build`
- `cp -r target/warp <ecosystem/root>`
2. copy warp menu artifacts into the nginx container
- `docker cp warp nginx:/var/www/html/`
- `docker restart nginx`


