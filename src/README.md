# src/ — 網站圖片素材資料夾

這個資料夾集中放置網站用到的圖片與品牌素材（logo、favicon、社群分享圖等）。

## 目前已有的檔案

| 檔案 | 用途 |
| --- | --- |
| `favicon.svg` | 瀏覽器分頁小圖示。三個頁面的 `<link rel="icon">` 都指向這個檔案。 |
| `logo.svg` | 品牌港灣標誌（向量檔），可用於簡報、名片或其他外部素材。頁首 header 內另有一份 inline SVG（見 `/partials/header.html`）。 |

## ⚠️ 待補上的檔案（目前仍缺，放進來即可自動生效）

> **2026.08 稽核確認：以下兩個檔案尚未上傳，但全站共有 11 處 meta／JSON-LD 已經指向它們。**
> 也就是說，**首頁、方案頁、關於頁、部落格列表頁分享到 LINE／Facebook／Threads 時，目前沒有預覽圖**（會退成純文字卡）。
> 這是目前優先度最高的素材缺口——檔名照下表放進本資料夾即可，不需要改任何一行程式碼。

| 建議檔名 | 用途 | 建議尺寸 | 目前狀態 |
| --- | --- | --- | --- |
| `og-cover.jpg` | 首頁 / 方案頁 / 關於頁 / 部落格列表頁的社群分享預覽圖（Open Graph / Twitter Card），共 8 處引用 | 1200 × 630 | ❌ 未上傳 |
| `logo.png` | JSON-LD 結構化資料中 `Organization.logo` 使用的點陣 logo（部落格列表頁與兩篇文章共 3 處引用） | 建議 512 × 512 以上、去背 PNG。Google 結構化資料僅接受 JPG／PNG／GIF，**不能用 `logo.svg` 代替** | ❌ 未上傳 |

> 首頁 JSON-LD 的 `ProfessionalService.logo` 已改指向現有的 `logo.svg`（至少不會 404）；
> 但文章頁的 `Organization.logo` 依 Google 規範仍必須是點陣圖，這一項只能等 `logo.png` 上傳。

已經有各自分享圖、不受影響的頁面：兩篇文章內頁（`src/og/japan-localization.jpg`、`src/og/beautiful-website-no-inquiry.jpg`）。

> 文章內頁若要各自的分享圖，可另外放在 `src/og/` 下（例如 `src/og/japan-localization.jpg`），
> 並於該文章的 `og:image` / `twitter:image` / JSON-LD `image` 指向它。

## 路徑寫法

網站以網域根目錄部署（GitHub Pages），請一律用「根目錄絕對路徑」引用，
這樣不論在 `/` 或 `/blog/` 底下都能正確載入：

```html
<link rel="icon" type="image/svg+xml" href="/src/favicon.svg">
<meta property="og:image" content="https://minato.3udesign.website/src/og-cover.jpg">
```
