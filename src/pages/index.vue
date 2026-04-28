<route lang="json">
{
  "meta": {
    "title": "概览",
    "layout": "default"
  }
}
</route>

<script setup lang="ts">
import AppContainer from '~/components/app/AppContainer.vue'

const badges = ['Vite 8', '文件路由', 'Pinia 3', 'UnoCSS', 'alova']

const layers = [
  {
    name: '够完整',
    summary: '常用能力已经在位，拿来就能开始写页面。',
    items: ['Vue 3.5', 'Router 4', 'Pinia', 'alova'],
  },
  {
    name: '不过重',
    summary: '默认能力克制，后面不会被模板反过来牵着走。',
    items: ['ESLint', 'Vitest', 'vue-tsc', 'build'],
  },
  {
    name: '好接手',
    summary: '结构清楚，删示例和继续扩展都比较顺手。',
    items: ['i18n', 'pwa', 'admin-auth', 'mock'],
  },
]

const launchSteps = [
  {
    index: '01',
    title: '复制下来',
    text: '先拿到一个干净起点。',
    code: 'npx degit fitoe/SolosVue3 my-app',
  },
  {
    index: '02',
    title: '装好就跑',
    text: '不用先花时间修模板。',
    code: 'pnpm install && pnpm dev',
  },
  {
    index: '03',
    title: '按自己来改',
    text: '保留、删减、继续扩展都可以。',
    code: 'pnpm demo:remove',
  },
]

const suitability = [
  {
    title: '适合',
    items: ['后台项目', '业务工具', '内部系统'],
  },
  {
    title: '不默认适合',
    items: ['内容站', '营销页', 'SSR 项目'],
  },
]
</script>

<template>
  <AppContainer class="home-page pb-16 pt-8 space-y-7 md:space-y-9">
    <section class="home-hero relative overflow-hidden border border-[var(--color-border)] rounded-[40px] px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:px-10 md:py-10 xl:px-12 xl:py-12">
      <div class="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_62%)] blur-3xl" />
      <div class="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.06),transparent_68%)] blur-3xl" />

      <div class="relative">
        <div class="max-w-3xl space-y-6">
          <div class="flex flex-wrap items-center gap-2">
            <span class="border border-[var(--color-border)] rounded-full bg-[var(--color-surface-raised)] px-3 py-1 text-[11px] text-[var(--color-text-muted)] font-medium tracking-[0.26em] uppercase">
              SolosVue3
            </span>
            <span class="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-[11px] text-[var(--color-accent)] font-medium tracking-[0.18em] uppercase">
              Vue 3 SPA Scaffold
            </span>
          </div>

          <div class="space-y-4 md:space-y-5">
            <h1 class="max-w-[10ch] text-4xl font-semibold leading-[1.04] md:max-w-none sm:max-w-[11ch] md:text-5xl xl:text-[4rem]">
              一个适合直接开工的 Vue 3 模板。
            </h1>
            <p class="max-w-2xl text-base text-[var(--color-text-soft)] leading-8 md:text-lg">
              它先把常用部分接好，又不会预设太多，让你能更快开始，也更容易接着改成自己的项目。
            </p>
          </div>

          <div class="max-w-md flex flex-col gap-3 sm:max-w-none sm:flex-row">
            <a class="inline-flex items-center justify-center border border-[var(--color-border)] rounded-full bg-[var(--color-surface-raised)] px-6 py-3 text-sm font-medium transition hover:bg-[var(--color-surface)]" href="https://github.com/fitoe/SolosVue3/generate" rel="noreferrer" target="_blank">
              用作模板
            </a>
          </div>

          <div class="max-w-xl flex flex-wrap gap-2">
            <span
              v-for="badge in badges"
              :key="badge"
              class="border border-[var(--color-border)] rounded-full bg-[var(--color-surface-raised)] px-3 py-2 text-xs text-[var(--color-text-soft)] font-medium"
            >
              {{ badge }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="home-panel overflow-hidden border border-[var(--color-border)] rounded-[40px] shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
      <div class="border-b border-[var(--color-border)] px-6 py-6 md:px-10 xl:px-12">
        <p class="text-xs text-[var(--color-text-muted)] tracking-[0.22em] uppercase">
          概览
        </p>
        <h2 class="mt-3 max-w-[12ch] text-2xl font-semibold leading-[1.15] md:max-w-none md:text-[2rem]">
          适合当作一个清爽的起点。
        </h2>
        <p class="mt-4 max-w-3xl text-sm text-[var(--color-text-soft)] leading-7">
          不想从空目录开始，也不想接一个过度设计的模板时，这一类项目会更顺手。
        </p>
      </div>

      <div class="grid gap-0 xl:grid-cols-[0.95fr_1.05fr]">
        <div class="grid gap-0 md:grid-cols-2 xl:grid-cols-1 xl:border-r xl:border-[var(--color-border)]">
          <div class="border-b border-[var(--color-border)] px-6 py-6 md:px-10 xl:px-12">
            <p class="text-sm font-medium">
              已经带上的
            </p>
            <p class="mt-3 text-sm text-[var(--color-text-soft)] leading-7">
              Vue 3.5、Router 4、Pinia、UnoCSS、alova。
            </p>
          </div>
          <div class="px-6 py-6 md:border-l xl:border-l-0 md:border-[var(--color-border)] md:px-10 xl:px-12">
            <p class="text-sm font-medium">
              可以直接开的
            </p>
            <p class="mt-3 text-sm text-[var(--color-text-soft)] leading-7">
              lint、typecheck、test、build 已接好。
            </p>
          </div>
        </div>

        <div class="border-t border-[var(--color-border)] px-6 py-6 xl:border-t-0 md:px-10 xl:px-12">
          <p class="text-xs text-[var(--color-text-muted)] tracking-[0.22em] uppercase">
            Terminal
          </p>
          <div class="mt-4 max-w-xl rounded-[24px] bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.88))] px-5 py-5 text-sm text-slate-100 font-mono shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
            <p><span class="text-slate-500">$</span> pnpm install</p>
            <p class="mt-2">
              <span class="text-slate-500">$</span> pnpm dev
            </p>
            <p class="mt-4 text-emerald-300">
              ready -> localhost:5173
            </p>
            <p class="mt-2 text-slate-400">
              lint / typecheck / test / build already wired
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="home-band overflow-hidden border border-[var(--color-border)] rounded-[40px] shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
      <div class="px-6 py-7 md:px-10 md:py-8 xl:px-12">
        <p class="text-xs text-[var(--color-text-muted)] tracking-[0.24em] uppercase">
          为什么会选它
        </p>
        <h2 class="mt-4 max-w-[13ch] text-3xl font-semibold leading-[1.12] md:max-w-none md:text-[2.6rem]">
          它不是功能最多，但很适合作为起点。
        </h2>
        <p class="mt-5 max-w-3xl text-sm text-[var(--color-text-soft)] leading-8 md:text-base">
          你不需要先决定所有技术细节，也不用先花时间清理一堆不想要的默认能力。
        </p>
      </div>

      <div class="grid gap-0 border-t border-[var(--color-border)] xl:grid-cols-3">
        <div
          v-for="layer in layers"
          :key="layer.name"
          class="border-b border-[var(--color-border)] px-6 py-7 last:border-b-0 xl:border-b-0 xl:border-r md:px-10 xl:px-12 last:xl:border-r-0"
        >
          <p class="text-lg font-semibold">
            {{ layer.name }}
          </p>
          <p class="mt-3 max-w-md text-sm text-[var(--color-text-soft)] leading-7">
            {{ layer.summary }}
          </p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="item in layer.items"
              :key="item"
              class="rounded-full bg-[var(--color-surface-raised)] px-3 py-1.5 text-xs text-[var(--color-text-soft)] ring-1 ring-[var(--color-border)]"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="home-surface overflow-hidden border border-[var(--color-border)] rounded-[40px] shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
      <div class="px-6 py-7 md:px-10 md:py-8 xl:px-12">
        <p class="text-xs text-[var(--color-text-muted)] tracking-[0.24em] uppercase">
          怎么开始
        </p>
        <h2 class="mt-4 max-w-[12ch] text-3xl font-semibold leading-[1.12] md:max-w-none md:text-[2.5rem]">
          很快就能跑起来。
        </h2>
        <p class="mt-5 max-w-3xl text-sm text-[var(--color-text-soft)] leading-8 md:text-base">
          先跑起来，再决定保留什么、删掉什么、继续加什么。
        </p>
      </div>

      <div class="grid gap-0 border-t border-[var(--color-border)] xl:grid-cols-3">
        <div
          v-for="item in launchSteps"
          :key="item.index"
          class="border-b border-[var(--color-border)] px-6 py-7 last:border-b-0 xl:border-b-0 xl:border-r md:px-10 xl:px-12 last:xl:border-r-0"
        >
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-lg font-semibold">
              {{ item.title }}
            </h3>
            <span class="text-xs text-[var(--color-text-muted)] font-semibold tracking-[0.2em]">
              {{ item.index }}
            </span>
          </div>
          <p class="mt-3 text-sm text-[var(--color-text-soft)] leading-7">
            {{ item.text }}
          </p>
          <div class="mt-5 overflow-x-auto rounded-2xl bg-slate-950 px-4 py-3 text-xs text-slate-100 font-mono">
            {{ item.code }}
          </div>
        </div>
      </div>
    </section>

    <section class="home-band overflow-hidden border border-[var(--color-border)] rounded-[40px] shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
      <div class="grid gap-0 xl:grid-cols-2">
        <div
          v-for="column in suitability"
          :key="column.title"
          class="border-b border-[var(--color-border)] px-6 py-7 last:border-b-0 xl:border-b-0 xl:border-r md:px-10 xl:px-12 last:xl:border-r-0"
        >
          <p class="text-xs text-[var(--color-text-muted)] tracking-[0.24em] uppercase">
            {{ column.title === '适合' ? '适用范围' : '边界说明' }}
          </p>
          <h2 class="mt-3 text-3xl font-semibold">
            {{ column.title }}
          </h2>
          <ul class="mt-5 space-y-3">
            <li
              v-for="item in column.items"
              :key="item"
              class="flex items-start gap-3 text-sm text-[var(--color-text-soft)] leading-7 md:text-base"
            >
              <span class="mt-2 size-2 rounded-full bg-[var(--color-accent)]/78" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </AppContainer>
</template>

<style scoped>
.home-hero {
  background: linear-gradient(135deg, rgb(37 99 235 / 9%), rgb(255 255 255 / 95%) 36%, rgb(255 255 255 / 98%));
}

.home-panel,
.home-surface {
  background: var(--color-surface);
}

.home-band {
  background: linear-gradient(
    180deg,
    var(--color-surface-raised),
    color-mix(in srgb, var(--color-bg-soft) 74%, white 26%)
  );
}

:global(html.theme-dark) .home-hero,
:global(html[data-theme='dark']) .home-hero {
  background: linear-gradient(135deg, rgb(96 165 250 / 12%), rgb(7 17 31 / 94%) 34%, rgb(15 23 42 / 98%));
}

:global(html.theme-dark) .home-band,
:global(html[data-theme='dark']) .home-band {
  background: linear-gradient(180deg, rgb(15 23 42 / 92%), rgb(7 17 31 / 96%));
}
</style>
