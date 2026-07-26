import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 部落格文章集合。新增文章＝在 src/content/blog/ 放一個 .md 檔，填好下面的欄位即可。
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    // ── 必填 ──
    title: z.string(),                 // 文章標題（純文字；作為 <title> / og:title / 麵包屑 / 卡片）
    titleHtml: z.string().optional(),  // 選填：h1 專用，可加 <br> 或 <span class="hl"> 上色（省略＝用 title）
    description: z.string(),           // 摘要，120–155 字，含關鍵字（meta description / og:description）
    date: z.coerce.date(),             // 發佈日期，例：2026-07-26

    // ── 選填 ──
    updated: z.coerce.date().optional(),                 // 更新日期（省略＝同發佈日）
    category: z
      .enum(['localization', 'market', 'guide', 'case'])
      .default('localization'),                          // 分類（對應 src/consts.ts）
    cover: z.string().optional(),                        // 封面圖，放 public/blog/covers/ 後填 /blog/covers/xxx.jpg
    coverAlt: z.string().optional(),                     // 封面圖 alt 文字（SEO / 無障礙）
    readingTime: z.string().optional(),                  // 閱讀時間，省略時自動估算
    lead: z.string().optional(),                         // 開場導言（大字段落），支援 HTML
    tldr: z.array(z.string()).default([]),               // 重點摘要（GEO 友善），每項支援 <strong> 等 HTML
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]), // 常見問題（可見內容＋JSON-LD 自動同步）
    keywords: z.array(z.string()).default([]),           // 關鍵字
    draft: z.boolean().default(false),                   // true＝不發佈（僅本機預覽）
  }),
});

export const collections = { blog };
