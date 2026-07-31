# SolosVue3

面向业务型 SPA 的 Vue 3 起点：保留稳定、常用的基础能力，不预装具体业务方案。

## 技术栈

- Vue 3.5、Vite 8、TypeScript 5.9
- Vue Router 5 文件路由与类型化路由
- Pinia 4、alova、UnoCSS
- Vitest、vue-tsc、ESLint
- CSS Variables 设计令牌与明暗主题

## 开始

需要 Node `20.19+` 或 `22.12+`，以及 pnpm 10。

```bash
npx degit fitoe/SolosVue3 my-app
cd my-app
pnpm install
pnpm dev
```

常用命令：

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

## 目录

```text
src/
  app/          应用启动、配置、路由和全局错误处理
  api/          alova client、响应解析和领域请求
  components/   基础组件
  composables/  可复用组合逻辑
  layouts/      页面布局及布局注册表
  pages/        文件路由页面
  stores/       Pinia 状态
  styles/       tokens、主题和全局样式
test/           关键状态与集成测试
```

## 路由与布局

页面放在 `src/pages`。路由元信息写在页面的 `<route>` 块中：

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

新增布局时：

1. 在 `src/layouts` 创建组件。
2. 在 `src/layouts/index.ts` 注册；`layout` 类型会自动同步。

## 请求与鉴权

- `src/api/client.ts` 统一处理 JSON、文本、空响应和 HTTP 错误。
- API client 会在存在 session 时自动注入 Bearer Token，业务方法无需重复配置。
- 401 响应会清理本地 session，并跳转登录页。
- 登录页使用明确标识的本地演示 session；接入后端时，用真实 auth service 替换它。

演示 Token 存在 `localStorage`，适合展示 SPA 流程，不代表所有项目的安全方案。高安全需求应根据后端架构选择 HttpOnly Cookie、CSRF 防护及刷新策略。

环境变量：

```bash
VITE_APP_TITLE=SolosVue3
VITE_API_BASE_URL=/api
VITE_PROXY_TARGET=http://localhost:3000
```

## 设计取向

基础项目不默认包含 i18n、PWA、UI 组件库、RBAC、mock 或 E2E。它们通常依赖具体产品选择，不应该以空占位或不可验证的 preset 出现。

`src/styles/tokens.css` 与 `src/styles/themes.css` 是视觉变量真相源；UnoCSS 负责消费这些变量。

## 质量门

`pnpm check` 依次运行 lint、类型检查、测试和生产构建。GitHub Actions 会在 main 分支和 Pull Request 上执行同一门禁及高危依赖审计，Dependabot 每周检查 npm 与 Actions 更新。
