// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 正式網域（換網域只需改這裡 + public/CNAME）
export default defineConfig({
  site: 'https://minato.3udesign.website',
  // 乾淨網址：/blog/ 與 /blog/文章slug/（結尾帶斜線，GitHub Pages 標準做法）
  trailingSlash: 'always',
  // 首頁是 public/index.html 靜態檔（非 Astro route），手動補進 sitemap
  integrations: [sitemap({ customPages: ['https://minato.3udesign.website/'] })],
});
