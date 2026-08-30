# blog/_source/ — 文章原始 Markdown 稿

這個資料夾放每一篇部落格文章的**原始 Markdown 稿**，檔名與文章的 slug 一致：

| Markdown 稿 | 對應的文章頁 |
| --- | --- |
| `webflow-wordpress-static-comparison.md` | `/blog/webflow-wordpress-static-comparison.html` |
| `japan-website-design-7-things.md` | `/blog/japan-website-design-7-things.html` |

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
