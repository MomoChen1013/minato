// 全站共用常數。換網域 / 改品牌名只需改這裡（與 astro.config.mjs 的 site、public/CNAME）
export const SITE = {
  name: '小港製作所 Minato Studio',
  logoPath: '/logo.png', // 建議放一張 512×512 的品牌 logo 於 public/logo.png（JSON-LD publisher 用）
  ogFallback: '/og-cover.jpg', // 沒有指定封面時，分享卡使用的預設圖（放於 public/）
};

// 文章分類：key 用於 frontmatter category，zh 為中文標籤，en 為文章頁上方英文小標
export const CATEGORIES = {
  localization: { zh: '跨境在地化', en: 'Cross-border Localization' },
  market: { zh: '日本市場', en: 'Japan Market' },
  guide: { zh: '實作指南', en: 'Practical Guide' },
  case: { zh: '案例', en: 'Case Study' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
