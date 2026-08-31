# blog/_source/ — 文章原始 Markdown 稿

這個資料夾放每一篇部落格文章的**原始 Markdown 稿**，檔名與文章的 slug 一致：

| Markdown 稿 | 對應的文章頁 |
| --- | --- |
| `wix-website-hidden-costs.md` | `/blog/wix-website-hidden-costs.html` |
| `japan-website-design-7-things.md` | `/blog/japan-website-design-7-things.html` |
| `company-website-pages.md` | `/blog/company-website-pages.html` |
| `website-redesign-or-rebuild.md` | `/blog/website-redesign-or-rebuild.html` |
| `chinese-japanese-bilingual-website.md` | `/blog/chinese-japanese-bilingual-website.html` |
| `japan-market-website-checklist.md` | `/blog/japan-market-website-checklist.html` |

## 為什麼留著

這個網站是靜態網站、沒有 CMS，文章最終是手工排進 `blog/*.html` 的。
把 Markdown 原稿留在版本控制裡，好處有三個：

1. **改文章時先改 Markdown**，確定文字定稿了再同步到 HTML，不會在一堆標籤裡改錯字。
2. **meta 標籤與 FAQ JSON-LD 的來源**：每份稿子的 front matter 與文末段落已經寫好 `title_tag`、
   `description`、`keywords` 與 FAQPage 結構化資料，排版時直接對照著貼。
3. 之後若要接 headless CMS 或改用 SSG，這批 Markdown 就是現成的內容來源。

## 這些檔案不會被瀏覽器讀到

資料夾以底線開頭純粹是慣例上的提醒——GitHub Pages 仍然會照樣部署這些 `.md` 檔案，
但站內沒有任何連結指向它們，也不會出現在 sitemap 或導覽列裡。

## HTML 與 Markdown 之間刻意不同的地方

排進 HTML 時做了幾處調整，改 Markdown 時請一併留意：

- 原稿的「一、貼進 blog-article.html 的 meta 標籤」與「三、FAQPage JSON-LD」兩節，
  在 HTML 版是實際的 `<head>` 標籤與頁尾 `<script type="application/ld+json">`，不是可見內文。
- 原稿的表格改用 `.a-table`、流程圖改用 `.a-flow`、程式碼改用 `.a-code`（樣式見 `/css/article.css`）。
- 原稿「四、內部連結建議」列出的內部連結，已直接寫進 HTML 相對應的段落裡。
- `japan-website-design-7-things` 第 ⑤ 節原稿誤植的「電話号码」，HTML 版已更正為「電話號碼」。
- 原稿內部連結寫成 `/blog/slug`（無副檔名），HTML 版一律補上 `.html`，與站內其他連結一致。
- `wix-website-hidden-costs.md` 文末的「五、改寫說明」是交稿備註，不會出現在文章頁上。

## 舊網址：`webflow-wordpress-static-comparison`

`wix-website-hidden-costs` 是由原本的〈企業官網要用 Webflow、WordPress，還是自己開發？〉
改寫而來，slug 一併換掉。GitHub Pages 沒辦法回 301，所以舊路徑
`/blog/webflow-wordpress-static-comparison.html` 留了一個轉址頁：canonical 指向新文章、
`noindex, follow`、加上 meta refresh。等 Search Console 裡舊網址完全消失之後，那個檔案就可以刪掉。
