# src/ — 網站圖片素材資料夾

這個資料夾集中放置網站用到的圖片與品牌素材（logo、favicon、社群分享圖等）。

## 目前已有的檔案

| 檔案 | 用途 |
| --- | --- |
| `favicon.svg` | 瀏覽器分頁小圖示。全站 7 個頁面的 `<link rel="icon">` 都指向這個檔案。 |
| `logo500.png` | 501 × 501 白底方形 logo（圖＋中英文字）。目前身兼三個用途：**① apple-touch-icon**（iOS 加到主畫面的圖示，全站 7 頁）、**② JSON-LD 的 `logo`**（首頁 `ProfessionalService` ＋ 部落格列表頁與兩篇文章的 `Organization`，共 4 處）、**③ 暫代的社群分享預覽圖**（見下方待補說明）。 |
| `S-logo.svg` | 方形版 logo（圖 ＋「小港製作所」，無英文），100 × 100。目前網站未使用，備用素材。 |
| `logo-f.svg` | 完整版 logo（圖 ＋「小港製作所 MINATO DESIGN STUDIO」字），淺色底用。**頁首 header 使用這一份**（見 `/partials/header.html`）。原始比例 438.68 × 128.23。 |
| `logo-on-dark.svg` | 完整版 logo 的白色版本，深色底用。**深色底的頁尾 footer 使用這一份**（見 `/partials/footer.html`）。比例同 `logo-f.svg`。 |
| `logo.svg` | 只有圖、沒有文字的品牌港灣標誌（100 × 100）。網站目前未直接引用（JSON-LD 的 `logo` 已改用點陣的 `logo500.png`），保留給簡報、名片等外部素材使用。 |

## ⚠️ 待補上的檔案（目前仍缺，放進來即可自動生效）

> **2026.08 更新：原本缺的 `logo.png` 已由 `logo500.png` 補上，JSON-LD 不再 404。**
> 剩下 `og-cover.jpg` 仍缺，目前由 `logo500.png` 暫代——分享出去不會是空的，但會是一張方形品牌 logo，
> 不是為分享情境設計的橫幅。**這是目前優先度最高的素材缺口。**

| 建議檔名 | 用途 | 建議尺寸 | 目前狀態 |
| --- | --- | --- | --- |
| `og-cover.jpg` | 首頁 / 方案頁 / 關於頁 / 部落格列表頁 / 隱私權頁的社群分享預覽圖（Open Graph / Twitter Card） | 1200 × 630 | ⚠️ 未上傳，暫由 `logo500.png` 代替 |

### `og-cover.jpg` 上線後要改的地方

不是放進來就好，有兩個地方要一起改（每個頁面的 `<head>` 都有註解標記）：

1. 五頁的 `og:image` / `twitter:image` 改指向 `og-cover.jpg`，並把 `og:image:width` / `height` 從 `501` 改成 `1200` / `630`。
2. 五頁的 `twitter:card` 從 `summary` 改回 `summary_large_image`。
   （方形圖配 `summary_large_image` 會被 X 裁成 1.91:1、上下切掉，所以暫時降成小卡的 `summary`。）

已經有各自分享圖、不受影響的頁面：兩篇文章內頁（`src/og/japan-localization.jpg`、`src/og/beautiful-website-no-inquiry.jpg`，皆為 1200 × 630）。

> 文章內頁若要各自的分享圖，可另外放在 `src/og/` 下（例如 `src/og/japan-localization.jpg`），
> 並於該文章的 `og:image` / `twitter:image` / JSON-LD `image` 指向它。

## 路徑寫法

網站以網域根目錄部署（GitHub Pages），請一律用「根目錄絕對路徑」引用，
這樣不論在 `/` 或 `/blog/` 底下都能正確載入：

```html
<link rel="icon" type="image/svg+xml" href="/src/favicon.svg">
<meta property="og:image" content="https://minato.3udesign.website/src/og-cover.jpg">
```

> GitHub Pages 的路徑**區分大小寫**，檔名請一律用小寫、不要有空白，
> 以免 `/src/Logo500.png` 與 `/src/logo500.png` 被當成兩個不同的檔案而 404。
