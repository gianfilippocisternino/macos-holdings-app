# Screenshot assets

The home pages show each screenshot **inside a CSS device mockup** (MacBook, iPad,
iPhone). Each device auto-rotates through a set of screenshots with a crossfade
(see the rotator script at the bottom of `index.html` / `it/index.html`).

Files are numbered per device; `*-1` is shown first. To change the order, rename;
to add/remove a slide, add/remove the matching `<img class="shot">` in both
`index.html` and `it/index.html`.

| Device  | Files            | Notes |
|---------|------------------|-------|
| Mac     | `mac-1..5.png`   | macOS **window captures with transparent margins** — they float on the wallpaper drawn in CSS (`.macbook .screen` background). Shown with `object-fit: contain`. |
| iPad    | `ipad-1..4.png`  | Full-screen iPad captures (opaque), 4:3 landscape, `object-fit: cover`. |
| iPhone  | `iphone-1..7.png`| Full-screen iPhone captures (opaque), 9:19.5 portrait, `object-fit: cover`. |

Source captures live on the Desktop (`screenshot-app/`), resized for web with
ImageMagick (`-resize 1300x` Mac, `1000x` iPad, `520x` iPhone). Keep new files
under ~300 KB each.

## Social card (separate folder)

`../social/og-card.png` — **1200×630** Open Graph / Twitter card for link previews.
