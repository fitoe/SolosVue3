# SolosVue3

面向现代 SPA 的开源 Vue 3 脚手架。使用 Vite 8、类型化文件路由、layouts、Pinia、UnoCSS tokens、alova 请求层、最小鉴权骨架，以及可删除 demo。

## 为什么做它

- 结构参考 [Vitesse](https://github.com/antfu-collective/vitesse)。
- 但不照搬它的 SSG / Markdown / PWA 默认路线。
- 更适合 2026 年偏业务型 SPA 基座。

## 环境要求

- Node `20.19+` 或 `22.12+`
- pnpm `10+`

## Base 默认包含

- Vue 3.5
- Vite 8
- Vue Router 4 文件路由 + 类型生成
- layouts
- Pinia
- UnoCSS + CSS variables tokens
- alova 请求客户端
- 最小 auth skeleton
- Vitest + vue-tsc + ESLint flat

## Base 明确不带

- SSG
- PWA
- i18n
- Markdown 页面
- 重 UI 组件库
- E2E 测试器

## 常用命令

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 作为模板使用

可以直接点 GitHub 的 template 按钮，或用 `degit` 拉一份干净副本：

```bash
npx degit fitoe/SolosVue3 my-app
cd my-app
pnpm install
pnpm dev
```

## 目录约定

- `src/pages`：页面路由文件
- `src/layouts`：页面壳层
- `src/modules`：启动安装模块
- `src/api`：alova client 和接口 method
- `src/stores`：全局状态
- `src/styles`：tokens、主题、全局样式
- `presets`：可选增强能力

## 如何加页面

新增 `src/pages/xxx.vue`。需要 meta 时，写 `<route>` block。

## 如何加布局

新增 `src/layouts/<name>.vue`，然后在页面 route meta 里指定 `layout`。

## 如何加 API

在 `src/api/modules` 新建文件，导入 `alovaClient`，返回 `Get/Post/...` method。

## 鉴权骨架说明

- token 持久化到 localStorage
- `requiresAuth` 路由自动跳登录页
- `guestOnly` 路由已登录自动跳首页
- 当前登录逻辑只是 demo，占位给真实接口替换

## 删除 demo

```bash
pnpm demo:remove
```

执行后，需要把导航里的 demo 链接一并替换或删除，再构建。

## Presets

当前占位：

- `i18n`
- `pwa`
- `admin-auth`
- `ui-naive`
- `mock`
- `e2e-playwright`

每个 preset 目录都有说明和依赖意图。
