# SolosVue3

A focused Vue 3 starter for business SPAs. It includes stable application foundations without pretending that product-specific integrations are universal defaults.

[中文文档](./README.zh-CN.md)

## Stack

- Vue 3.5, Vite 8, TypeScript 5.9
- Vue Router 5 file-based and typed routing
- Pinia 4, alova, UnoCSS
- Vitest, vue-tsc, ESLint
- CSS-variable design tokens and light/dark themes

## Start

Requires Node `20.19+` or `22.12+` and pnpm 10.

```bash
npx degit fitoe/SolosVue3 my-app
cd my-app
pnpm install
pnpm dev
```

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

## Structure

```text
src/
  app/          bootstrap, configuration, routing, global errors
  api/          alova client, response parsing, domain requests
  components/   base components
  composables/  reusable composition logic
  layouts/      layouts and the typed layout registry
  pages/        file-based routes
  stores/       Pinia state
  styles/       tokens, themes, global styles
test/           state and integration tests
```

## Routing and layouts

Pages live in `src/pages`. Route metadata is declared in each page:

```vue
<route lang="json">
{
  "meta": {
    "title": "Dashboard",
    "layout": "default",
    "requiresAuth": true
  }
}
</route>
```

Add layouts under `src/layouts` and register them in `src/layouts/index.ts`. The route metadata type derives from that registry.

## API and authentication

The API client handles JSON, text, empty responses, and mapped HTTP errors. It automatically injects a Bearer Token when a session exists; a 401 clears the local session and redirects to login.

The included login page creates an explicitly local demo session. Replace it with a real auth service when connecting a backend. The demo stores its token in `localStorage`; security-sensitive applications should choose an HttpOnly Cookie, CSRF, and refresh strategy appropriate to their backend.

## Scope

i18n, PWA, UI libraries, RBAC, mocks, and E2E are intentionally not included. These choices should be implemented and tested for a real product instead of represented by empty presets.

`pnpm check` runs lint, type checking, tests, and a production build. GitHub Actions runs the same gate plus a high-severity dependency audit for main and pull requests; Dependabot checks npm and Actions updates weekly.
