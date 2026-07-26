/* ============================================================
   Google Analytics 4 共用載入器 ga.js
   - 全站共用的 GA4 追蹤片段，評估 ID 集中在此一處管理
   - 使用方式：在每頁 <head> 內盡早載入 <script src="/js/ga.js"></script>
   - 會建立全域 window.gtag，供各頁自訂事件（如 home.js）使用
   ============================================================ */
(function () {
  var GA_ID = 'G-HN6LVF62V9';

  // 載入 gtag.js 主程式
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  // 初始化 dataLayer 與 gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID);
})();
