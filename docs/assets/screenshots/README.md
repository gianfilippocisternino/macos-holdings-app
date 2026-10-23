# Screenshot assets

The home pages show each screenshot **inside a CSS device mockup** (MacBook, iPad,
iPhone). Each device auto-rotates through a set of screenshots with a crossfade
(see the rotator script at the bottom of `index.html` / `it/index.html`).

Files are numbered per device; `*-1` is shown first. To change the order, rename;
to add/remove a slide, add/remove the matching `<img class="shot">` in both
`index.html` and `it/index.html`.

| Device  | Files            | Notes |
|---------|------------------|-------|
| Mac     | `mac-1..5.webp`   | macOS **window captures with transparent margins** — they float on the wallpaper drawn in CSS (`.macbook .screen` background). Shown with `object-fit: contain`. |
| iPad    | `ipad-1..4.webp`  | Full-screen iPad captures (opaque), 3:4 **portrait**, `object-fit: cover`. |
| iPhone  | `iphone-1..7.webp`| Full-screen iPhone captures (opaque), 9:19.5 portrait, `object-fit: cover`. |

Source captures are the raw App Store captures in the app repo
(`macos-holdings/marketing/app-store-screenshots/screenshots/{mac,ipad,iphone}/`,
taken from the Holdings Demo build), converted with ImageMagick:

```bash
SRC=../macos-holdings/marketing/app-store-screenshots/screenshots
# iPhone 1..7: trend overview geography sectors monthly assets live-prices
magick $SRC/iphone/<name>.png -resize 520x -quality 82 iphone-N.webp
# iPad 1..4: monthly overview assets live-prices
magick $SRC/ipad/<name>.png -resize 750x -quality 82 ipad-N.webp
# Mac 1..5: trend monthly live-prices overview assets
magick $SRC/mac/<name>.png -resize 1292x792 -background none -gravity center \
  -extent 1300x800 -quality 85 -define webp:alpha-quality=100 mac-N.webp
```

Keep new files under ~300 KB each.

## Social card (separate folder)

`../social/og-card-2.png` — **1200×630** Open Graph / Twitter card for link previews (the 1.2 design: dark glow background, iPhone Duo + iPhone). Give a new design a new file name, since social networks cache previews by URL.
