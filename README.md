# 小港製作所 Minato Studio 官網

首頁是手刻的 `public/index.html`；**部落格**用 [Astro](https://astro.build/) + Markdown 自動產生，
push 到 `main` 後由 GitHub Actions 自動建置並部署到 `minato.3udesign.website`。

---

## ✍️ 新增一篇文章（3 步驟）

### 1. 建立 Markdown 檔
在 `src/content/blog/` 新增一個 `.md`，**檔名就是網址**：
`src/content/blog/my-article.md` → `https://minato.3udesign.website/blog/my-article/`

### 2. 填上方欄位（frontmatter）
```markdown
---
title: "文章標題（純文字，會用在分享卡與瀏覽器分頁）"
titleHtml: "文章標題，可加 <br> 換行或 <span class=\"hl\">上色</span>（選填）"
description: "摘要 120–155 字，含關鍵字。用於 Google 搜尋結果與社群分享。"
date: 2026-08-01
category: localization        # localization / market / guide / case
cover: /blog/covers/my.jpg    # 選填，封面圖（見下方「上傳封面圖」）
coverAlt: "封面圖的文字說明"    # 選填，SEO 與無障礙
readingTime: "6 分鐘"          # 選填，省略會自動估算
lead: "開場導言，會以大字呈現。"  # 選填
tldr:                          # 選填，重點摘要（GEO 友善）
  - "重點一，可用 <strong>粗體</strong>。"
  - "重點二。"
faq:                           # 選填，常見問題（可見內容＋JSON-LD 會自動同步）
  - q: "問題一？"
    a: "答案一。"
keywords: ["關鍵字1", "關鍵字2"]  # 選填
draft: false                   # true = 先不發佈，只在本機看得到
---

## 第一段標題
內文用 Markdown 寫……
```

### 3. 寫內文，然後推送
內文用純 Markdown（見下方語法）。完成後：
```bash
git add . && git commit -m "新增文章：我的標題" && git push
```
push 到 `main` 後約 1–2 分鐘自動上線。**目次、列表頁、相關文章、sitemap、JSON-LD 全部自動更新**，不用手動改。

---

## 🖼️ 上傳封面圖
1. 把圖片（建議 1200×630）放進 `public/blog/covers/`，例如 `public/blog/covers/my.jpg`
2. 在 frontmatter 填 `cover: /blog/covers/my.jpg` 與 `coverAlt: "說明文字"`

沒填 `cover` 時，文章主視覺會顯示品牌漸層底、分享卡用預設圖 `public/og-cover.jpg`。

---

## 📝 內文 Markdown 語法
| 想要的效果 | 寫法 |
|---|---|
| 段落標題（**會自動進目次**） | `## 標題` |
| 小標題 | `### 小標` |
| 粗體重點（自帶螢光底線） | `**文字**` |
| 條列 | `- 項目` |
| 編號清單 | `1. 項目` |
| 引言 | `> 引言文字` |
| 連結 | `[文字](/index.html#inquiry)` |

### 特殊區塊（直接把下面貼進 Markdown 即可）
**深色現場筆記卡：**
```html
<div class="callout">
  <span class="tag">跨境現場筆記</span>
  <p>你的內容……</p>
</div>
```
**機翻 vs 在地化對照表：**
```html
<div class="cmp">
  <div class="cmp-row cmp-head">
    <div class="cmp-cell bad">左欄標題</div>
    <div class="cmp-cell good">右欄標題</div>
  </div>
  <div class="cmp-row">
    <div class="cmp-cell bad">左欄內容</div>
    <div class="cmp-cell good">右欄內容</div>
  </div>
</div>
```

---

## 💻 本機預覽
```bash
npm install      # 第一次才需要
npm run dev      # 開 http://localhost:4321/blog/
npm run build    # 產出 dist/（部署前檢查用）
```

---

## ⚙️ 一次性設定（首次導入時）
1. **GitHub Pages 部署來源**：GitHub → repo → **Settings → Pages → Build and deployment → Source** 改成 **GitHub Actions**（原本可能是 "Deploy from a branch"）。
2. 之後每次 push 到 `main`，`.github/workflows/deploy.yml` 會自動建置並部署。

## 🔧 換網域 / 改品牌
- 網域：改 `astro.config.mjs` 的 `site`、`public/CNAME`，以及 `src/consts.ts`。
- 品牌名 / 分類：改 `src/consts.ts`。

## 📁 結構速覽
```
public/            # 原樣輸出的靜態檔
  index.html       #   首頁（手刻）
  CNAME robots.txt
  blog/covers/     #   文章封面圖放這
src/
  consts.ts        # 網域、品牌名、分類設定
  content.config.ts# 文章欄位規則
  content/blog/    # ← 文章 .md 都放這
  layouts/ pages/ components/ styles/
.github/workflows/deploy.yml  # 自動部署
```
