# Index — HTML shell, metadata and favicon

`frontend/index.html` is the single HTML shell for the Vite/React app. React mounts into `#root`; everything visible on the page is rendered from `src/main.jsx`.

## What lives here

| Item | Purpose |
| --- | --- |
| `viewport` | Makes the one-page layout scale correctly on phones |
| `theme-color` | Colors the browser UI on supported mobile browsers with the site's dark green background |
| `description` | Search result and link-preview summary for `Alina (lirriya)` and the full-stack web internship positioning |
| `author` | Public-facing author name/handle |
| `canonical` | Declares `https://byalina.dev/` as the preferred URL for the site |
| Open Graph (`og:*`) | Title, description, URL, site name and type used by social/link previews |
| Twitter Card (`twitter:*`) | Title, description and card type used by Twitter/X previews |
| Google Fonts preconnect | Warms the connection before loading JetBrains Mono |
| `/favicon.svg` | Browser tab icon: a compact lotus based on the `PinkLotus` SVG in `About.jsx` |

## Favicon source

The favicon reuses the same petal paths and colors as the pink lotus in `About.jsx`, scaled into a `100 x 100` viewBox with a dark rounded square behind it for contrast on both light and dark browser tabs.

```mermaid
flowchart LR
  About[About.jsx PinkLotus] --> Favicon[/favicon.svg]
  Favicon --> Tab[Browser tab icon]
  Browser[Browser] --> Shell[index.html]
  Shell --> Meta[description / canonical / og / twitter]
  Meta --> Preview[Search and social previews]
```

## Notes

- The site is English-first, so the metadata is written in English while using `Alina (lirriya)` instead of a full legal name.
- Open Graph and Twitter previews here do not set an image: most social crawlers do not render SVG reliably, so the lotus is used as the favicon rather than as a broken preview image.
- If the final canonical host changes from `byalina.dev`, update both `canonical` and `og:url` in `index.html`.
