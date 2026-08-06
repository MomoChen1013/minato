# src/ — 網站圖片素材資料夾

這個資料夾集中放置網站用到的圖片與品牌素材（logo、favicon、社群分享圖等）。

## 目前已有的檔案

| 檔案 | 用途 |
| --- | --- |
| `favicon.svg` | 瀏覽器分頁小圖示。全站 6 個頁面的 `<link rel="icon">` 都指向這個檔案。 |
| `OG-index.png` | 1200 × 630 白底社群分享預覽圖（Open Graph / Twitter Card）。**首頁／方案／部落格列表／隱私權 4 頁共用這一張**。 |
| `logo500.png` | 501 × 501 白底方形 logo（圖＋中英文字）。兩個用途：**① apple-touch-icon**（iOS 加到主畫面的圖示，全站 6 頁）、**② JSON-LD 的 `logo`**（首頁 `ProfessionalService` ＋ 部落格列表頁與兩篇文章的 `Organization`，共 4 處）。分享預覽圖已改用 `OG-index.png`，這裡不再兼任。 |
| `S-logo.svg` | 方形版 logo（圖 ＋「小港製作所」，無英文），100 × 100。目前網站未使用，備用素材。 |
| `logo-f.svg` | 完整版 logo（圖 ＋「小港製作所 MINATO DESIGN STUDIO」字），淺色底用。**頁首 header 使用這一份**（見 `/partials/header.html`）。原始比例 438.68 × 128.23。 |
| `logo-on-dark.svg` | 完整版 logo 的白色版本，深色底用。**深色底的頁尾 footer 使用這一份**（見 `/partials/footer.html`）。比例同 `logo-f.svg`。 |
| `logo.svg` | 只有圖、沒有文字的品牌港灣標誌（100 × 100）。網站目前未直接引用（JSON-LD 的 `logo` 已改用點陣的 `logo500.png`），保留給簡報、名片等外部素材使用。 |
| `space-office-1.jpg` | 首頁全幅照片橫幅①（設計稿 Section - SPACE），位置在 **SERVICE MARQUEE 之後、SERVICES DARK 之前**。**目前是 1 × 1 的白色佔位圖**，請用同名檔案覆蓋。 |
| `space-office-2.jpg` | 首頁全幅照片橫幅②（設計稿 Section - SPACE），位置在 **FAQ 之後、INQUIRY 之前**。**目前是 1 × 1 的白色佔位圖**，請用同名檔案覆蓋。 |

### 照片橫幅（space-band）上傳規格

兩張橫幅都是滿版出血，版位高度為 `clamp(240px, 33vw, 480px)`（桌機最高 480px），
以 `object-fit:cover` 置中裁切（`object-position:center 60%`）。

- 建議尺寸：**2880 × 960**（＝設計稿 1440 × 480 的 2 倍圖）
- 格式：`.jpg`，檔名一律小寫、不要有空白
- 覆蓋 `src/space-office-1.jpg` / `src/space-office-2.jpg` 即可，`index.html` 不用動
- 兩張想用同一張照片也可以，就把同一個檔案存成兩個檔名

## 素材缺口

> **2026.08 更新：先前缺的兩個檔案都補齊了。**
> `logo.png` 由 `logo500.png` 取代（JSON-LD 不再 404）；`og-cover.jpg` 由 `OG-index.png` 取代
> （1200 × 630，`twitter:card` 維持 `summary_large_image`，不會被裁切）。目前沒有 404 的引用。

若之後想讓各頁有**各自的**分享圖（而非四頁共用 `OG-index.png`），做法是照 `OG-plan.png`、
`OG-blog.png` 之類命名放進本資料夾，再把該頁 `<head>` 裡的 `og:image` / `twitter:image` 改指向它——
尺寸一律 1200 × 630，其餘 meta 不用動。

兩篇文章內頁已各自有分享圖（`src/og/japan-localization.jpg`、`src/og/beautiful-website-no-inquiry.jpg`，皆為 1200 × 630），不共用 `OG-index.png`。

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
