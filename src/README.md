# src/ — 網站圖片素材資料夾

這個資料夾集中放置網站用到的圖片與品牌素材（logo、favicon、社群分享圖等）。

## 目前已有的檔案

| 檔案 | 用途 |
| --- | --- |
| `favicon.svg` | 瀏覽器分頁小圖示。三個頁面的 `<link rel="icon">` 都指向這個檔案。 |
| `logo.svg` | 品牌港灣標誌（向量檔），可用於簡報、名片或其他外部素材。頁首 header 內另有一份 inline SVG（見 `/partials/header.html`）。 |

## 待補上的檔案（放進來即可自動生效）

以下檔案目前在各頁的 meta 已經預留連結，只要把實際圖檔放到本資料夾、檔名一致即可：

| 建議檔名 | 用途 | 建議尺寸 |
| --- | --- | --- |
| `og-cover.jpg` | 首頁 / 部落格列表頁的社群分享預覽圖（Open Graph / Twitter Card） | 1200 × 630 |
| `logo.png` | JSON-LD 結構化資料中 `Organization.logo` 使用的點陣 logo | 建議 512 × 512 以上、去背 PNG |

> 文章內頁若要各自的分享圖，可另外放在 `src/og/` 下（例如 `src/og/japan-localization.jpg`），
> 並於該文章的 `og:image` / `twitter:image` / JSON-LD `image` 指向它。

## 路徑寫法

網站以網域根目錄部署（GitHub Pages），請一律用「根目錄絕對路徑」引用，
這樣不論在 `/` 或 `/blog/` 底下都能正確載入：

```html
<link rel="icon" type="image/svg+xml" href="/src/favicon.svg">
<meta property="og:image" content="https://minato.3udesign.website/src/og-cover.jpg">
```
