# SolosVue3

Open Vue 3 scaffold for modern SPA work. Uses Vite 8, typed file routes, layouts, Pinia, UnoCSS tokens, alova request client, auth skeleton, and removable demos.

## Why this exists

- Inspired by [Vitesse](https://github.com/antfu-collective/vitesse) structure.
- Trimmed for SPA-first teams in 2026.
- Keeps base small. Keeps optional capabilities in presets.

## Requirements

- Node `20.19+` or `22.12+`
- pnpm `10+`

## Included

- Vue 3.5
- Vite 8
- Vue Router 4 with file-based typed routes
- Layouts
- Pinia
- UnoCSS + CSS variable tokens
- alova request client
- Auth skeleton
- Vitest + vue-tsc + ESLint flat config

## Not included in base

- SSG
- PWA
- i18n
- Markdown pages
- Heavy UI libraries
- E2E runner

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Use as a template

Use GitHub template button, or clone a clean copy with `degit`:

```bash
npx degit fitoe/SolosVue3 my-app
cd my-app
pnpm install
pnpm dev
```

## Structure

- `src/pages`: route files
- `src/layouts`: page shells
- `src/modules`: startup installers
- `src/api`: alova client and method modules
- `src/stores`: global state only
- `src/styles`: tokens, themes, global styles
- `presets`: optional enhancements

## Add a page

Create `src/pages/my-page.vue`. Use a `<route>` block when you need meta.

## Add a layout

Create `src/layouts/<name>.vue`, then set `meta.layout` in the page route block.

## Add an API method

Create a file in `src/api/modules`, import `alovaClient`, return `Get/Post/...` methods.

## Auth skeleton

- Token persisted in local storage
- `requiresAuth` route redirect
- `guestOnly` route redirect
- Demo login/logout only

## Remove demos

```bash
pnpm demo:remove
```

Then remove demo links or replace them with real pages before building.

## Presets

Current placeholders:

- `i18n`
- `pwa`
- `admin-auth`
- `ui-naive`
- `mock`
- `e2e-playwright`

Check each preset directory for notes and dependency intent.
