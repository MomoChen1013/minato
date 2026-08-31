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
| `space-office-1.png` | 首頁全幅照片橫幅①（設計稿 Section - SPACE），位置在 **SERVICE MARQUEE 之後、SERVICES DARK 之前**。1940 × 934。 |
| `japan-street.png` | 首頁全幅照片橫幅②（設計稿 Section - SPACE），位置在 **FAQ 之後、INQUIRY 之前**。1941 × 811。 |
| `works/minato-studio-site.png` | 成果展示頁 Case 01 的主要圖片（本站首頁截圖）。1600 × 1000。 |
| `works/ngo-mission-care.svg` | 成果展示頁 Case 02 的主要圖片。**目前是暫用的品牌示意圖**，拿到可公開的實際畫面後直接換掉。 |

### 成果展示（/works/）主要圖片上傳規格

成果展示頁每一則案例只有兩樣東西：**一張主要圖片、一段文字說明**。
圖片放在 `src/works/`，檔名用案例的英文 slug，並在 `/works/index.html` 對應的
`<img src="/src/works/…">` 指過去。

- 建議尺寸：**1600 × 1000**（比例 8:5，與版位的 `aspect-ratio:8/5` 一致）
- 版位會以 `object-fit:cover`、`object-position:top center` 裁切，**主體請放上半部**
- 格式：實際畫面截圖用 `.png`（介面截圖），照片類請用 `.jpg` 或 `.webp`
- 尚未能公開的案例，先放一張品牌示意圖（例如 `ngo-mission-care.svg`），
  並在 `<article>` 上加 `class="case reveal soon"`，拿到實際畫面後換掉檔案即可
- 新增案例：複製 `/works/index.html` 裡整個 `<article class="case reveal">` 區塊，
  換 id、圖片、編號與文字說明就好，左右兩欄會自動交替

### 照片橫幅（space-band）上傳規格

兩張橫幅都是滿版出血，**有捲動視差**：版位（窗口）高度為 `clamp(240px, 33vw, 480px)`
（桌機最高 480px），圖片實際渲染高度是版位的 **140%**，多出來的 40% 就是捲動時上下位移的行程
——跟設計稿把 1440 × 672 的圖放進 1440 × 480 的框裡是同一件事。

- 建議尺寸：**2880 × 1344**（＝設計稿 1440 × 672 的 2 倍圖，比例約 15:7）
- 構圖時請記得：**任何一個瞬間只看得到中間約 7 成的高度**，主體放中間、上下留安全區
- 格式：照片請用 `.jpg` 或 `.webp`（**不要用 `.png`**，同一張照片會大上 5–10 倍），檔名一律小寫、不要有空白
- 換圖時直接覆蓋 `src/space-office-1.png` / `src/japan-street.png`（換檔名的話要一起改 `index.html`）
- 兩張想用同一張照片也可以，就把同一個檔案存成兩個檔名

視差本體是 CSS scroll-driven animation（`css/home.css` 的 `space-parallax`），
舊瀏覽器由 `js/home.js` 的後備程式接手；使用者開啟「減少動態效果」時兩者都會停用，
變成單純的置中裁切。

## 素材缺口

> **2026.08 更新：先前缺的兩個檔案都補齊了。**
> `logo.png` 由 `logo500.png` 取代（JSON-LD 不再 404）；`og-cover.jpg` 由 `OG-index.png` 取代
> （1200 × 630，`twitter:card` 維持 `summary_large_image`，不會被裁切）。目前沒有 404 的引用。

若之後想讓各頁有**各自的**分享圖（而非四頁共用 `OG-index.png`），做法是照 `OG-plan.png`、
`OG-blog.png` 之類命名放進本資料夾，再把該頁 `<head>` 裡的 `og:image` / `twitter:image` 改指向它——
尺寸一律 1200 × 630，其餘 meta 不用動。

## 文章封面圖（`src/og/`）

**每篇文章一張封面圖，同一個檔案身兼兩用**：社群分享圖（OG／Twitter／JSON-LD）與
部落格列表頁的卡片縮圖。目前 8 篇文章都有各自的封面，沒有任何一篇再共用 `OG-index.png`。

- 位置：`src/og/`
- 命名：**`<slug>.jpg`**，與文章的 slug 一致，全小寫、不要空白
- 尺寸：目前這批是 **1600 × 900**（16:9）。比例不強制，但 `og:image:width` /
  `og:image:height` 兩個 meta **必須與實際檔案一致**，否則社群平台的版位會算錯
- 格式：`.jpg`

| 封面檔 | 文章 |
| --- | --- |
| `chinese-japanese-bilingual-website.jpg` | 中日雙語網站怎麼規劃？ |
| `japan-market-website-checklist.jpg` | 台灣企業進日本市場，網站需要準備什麼？ |
| `wix-website-hidden-costs.jpg` | 還在用 Wix 做網站嗎？ |
| `company-website-pages.jpg` | 公司網站要放哪些內容？ |
| `website-redesign-or-rebuild.jpg` | 官網該改版、重做，還是只調整？ |
| `japan-website-design-7-things.jpg` | 日本市場網站設計和台灣有什麼不同？ |
| `japan-localization.jpg` | 為什麼做真正的多語系網站…（檔名為簡稱，非完整 slug） |
| `beautiful-website-no-inquiry.jpg` | 網站很漂亮，為什麼卻沒有人詢問？ |

### 換圖或新增一篇時要改的四個地方

上傳檔案本身不會讓網站更新，還要把引用指過去。三處在文章檔、一處在列表頁：

1. `blog/<slug>.html` 的 `og:image`（連同 `og:image:width` / `og:image:height` / `og:image:alt`）
2. `blog/<slug>.html` 的 `twitter:image`
3. `blog/<slug>.html` 頁尾 JSON-LD 的 `"image"`
4. `blog/index.html` 該篇卡片的縮圖：

```html
<span class="thumb"><img class="thumb-img" src="/src/og/<slug>.jpg"
     alt="" loading="lazy" width="1600" height="900"></span>
```

卡片版位是 16:10、用 `object-fit:contain` 完整顯示（不裁切），比例對不上時上下會留帶狀空白，
該處已用品牌深色 `--dark` 當底色（見 `css/blog.css`），所以看起來是外框而不是破圖。
封面圖本身已經有分類 kicker 與標題，卡片上就不再疊 `.rc-cat` 標籤。
`alt` 留空是刻意的——卡片的 `<h2>` 已經把標題講過一次，重複朗讀反而吵。

> **既有的兩個檔案有格式不符**：`japan-localization.jpg` 與
> `beautiful-website-no-inquiry.jpg` 副檔名是 `.jpg`，實際內容卻是 PNG（1200 × 630）。
> 瀏覽器會自行判讀所以顯示正常，但部分社群爬蟲對 MIME 與副檔名不一致較敏感。
> 之後有空可以轉成真正的 JPEG 或改回 `.png` 副檔名（記得一併改引用）。

## 路徑寫法

網站以網域根目錄部署（GitHub Pages），請一律用「根目錄絕對路徑」引用，
這樣不論在 `/` 或 `/blog/` 底下都能正確載入：

```html
<link rel="icon" type="image/svg+xml" href="/src/favicon.svg">
<meta property="og:image" content="https://minato.3udesign.website/src/og-cover.jpg">
```

> GitHub Pages 的路徑**區分大小寫**，檔名請一律用小寫、不要有空白，
> 以免 `/src/Logo500.png` 與 `/src/logo500.png` 被當成兩個不同的檔案而 404。
