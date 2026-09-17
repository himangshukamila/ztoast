# ztoast — documentation site

The marketing and documentation site for [**ztoast**](https://www.npmjs.com/package/ztoast),
a zero-dependency React toast library.

> This repo is the **website**. The library itself lives in its own repo and is published
> to npm; this site installs it like any other consumer and documents whatever version is
> in `package.json`.

**Currently documenting: `ztoast@0.1.9`**

---

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript
- Plain CSS custom properties in `src/app/globals.css` — no CSS framework in use
- `ztoast` itself, installed from npm and used live on the page

## Where the content lives

There is no MDX and no CMS. Every page section is a component under `src/components/`,
with its prose and code samples held in data arrays at the top of the file.

| Section | File | Anchor |
| :--- | :--- | :--- |
| Hero | `src/components/Hero.tsx` | — |
| Getting started | `src/components/Quickstart.tsx` | `#quickstart` |
| Examples | `src/components/Examples.tsx` | `#examples` |
| Positioning | `src/components/PositionDemo.tsx` | `#positions` |
| Playground | `src/components/Playground.tsx` | `#playground` |
| API reference | `src/components/DocsSection.tsx` | `#docs` |
| Upgrading from 0.1.7 | `src/components/Upgrading.tsx` | `#upgrading` |

`src/components/FeaturesGrid.tsx` and `src/components/ComparisonTable.tsx` exist but are
not currently rendered by `src/app/page.tsx`.

## House rules for edits

1. **Every snippet must be real.** The samples on this site are the same code the demo
   buttons execute, so they type-check against the installed `ztoast` types. Do not
   document an option that is not in `ToastConfig`.
2. **No stylesheet import.** ztoast ships its own CSS; there is nothing to import.
3. **Keep the defaults honest.** The API tables state real defaults
   (`duration: 4000`, `progress: true`, `pauseOnHover: true`, `theme: "dark"`,
   `radius: 14`, `gap: 14`, `position: "top-right"`).
4. **Bundle size claims** should come from a measurement, not memory —
   currently 9.1 kB gzipped, 0 dependencies.

## Which build of ztoast this site is using

Normally the site installs `ztoast` from npm like any other consumer. When the
library is being changed alongside the docs, it can temporarily point at a local
build instead — check `dependencies.ztoast` in `package.json`:

| Value | Meaning |
| :--- | :--- |
| `^0.1.9` | the published package from npm — the normal state |
| `file:../…/ztoast-0.1.9.tgz` | a local `npm pack` build, used to preview an unreleased fix |

To go back to the published package after a release:

```bash
npm run use-published   # npm i ztoast@latest
npx tsc --noEmit        # catches every snippet that no longer type-checks
npm run build
```

Then update the version string in `src/components/Hero.tsx`, the
`#upgrading` section, and this README.

## License

MIT
