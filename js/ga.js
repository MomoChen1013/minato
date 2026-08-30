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

  // 全站共用的送出函式；各頁自訂事件（如 home.js）一律走這裡
  window.track = function (name, params) {
    if (typeof gtag === 'function') gtag('event', name, params || {});
  };

  // ---- 全站共用事件 --------------------------------------------------
  function bindCommon() {
    // ① 標了 data-ev 的連結／按鈕（LINE、案例卡等）
    document.addEventListener('click', function (e) {
      var el = e.target.closest && e.target.closest('[data-ev]');
      if (!el) return;
      track(el.dataset.ev, { label: el.dataset.evLabel || el.textContent.trim().slice(0, 60) });
    }, true);

    // ② 捲動深度 25/50/75/90，各只送一次
    var marks = [25, 50, 75, 90], sent = {};
    function onScroll() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - innerHeight;
      if (max <= 0) return;
      var pct = (scrollY / max) * 100;
      marks.forEach(function (m) {
        if (!sent[m] && pct >= m) { sent[m] = 1; track('scroll_depth', { percent: m }); }
      });
      if (sent[90]) removeEventListener('scroll', onScroll);
    }
    addEventListener('scroll', onScroll, { passive: true });

    // ③ 進到成果展示頁 / 方案頁 / Demo 頁時各記一次
    //    （/plan 已從站內導覽移除，這個事件現在等同「直接輸入網址進來的人」）
    var path = location.pathname;
    if (path.indexOf('/works') === 0) track('works_view');
    if (path.indexOf('/plan') === 0) track('plan_view');
    if (path.indexOf('/demo') === 0) track('demo_view');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindCommon);
  } else {
    bindCommon();
  }
})();
