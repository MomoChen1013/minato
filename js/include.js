/* ============================================================
   共用元件載入器 include.js
   - 把 /partials/header.html、/partials/footer.html、/partials/icons.html 注入頁面
   - 綁定所有頁面共用的行為：頁首捲動變色、目前分頁高亮、reveal 進場動畫
   使用方式：頁面放入 <div id="site-header"></div>、<div id="site-footer"></div>，
   並在 </body> 前載入 <script src="/js/include.js"></script>
   ============================================================ */
(function () {
  // 依目前網址判斷要高亮哪個導覽項目
  function activeNav() {
    const path = location.pathname;
    let key = '';
    if (path === '/' || path === '/index.html') key = '';        // 首頁不特別高亮
    else if (path.indexOf('/blog') === 0) key = 'blog';          // 部落格與文章頁
    else if (path.indexOf('/plan') === 0) key = 'plan';          // 方案與價格頁
    const link = key && document.querySelector('#hd nav a[data-nav="' + key + '"]');
    if (link) link.classList.add('on');
  }

  // 頁首捲動時加上底色
  function bindHeaderScroll() {
    const hd = document.getElementById('hd');
    if (!hd) return;
    const onScroll = () => hd.classList.toggle('scrolled', scrollY > 40);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 進場動畫（.reveal → .in）
  function bindReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));
  }

  // 載入共用區塊
  function inject(id, url) {
    const slot = document.getElementById(id);
    if (!slot) return Promise.resolve();
    return fetch(url)
      .then((r) => r.text())
      .then((html) => { slot.innerHTML = html; })
      .catch((err) => console.error('include.js 載入失敗 →', url, err));
  }

  function init() {
    Promise.all([
      inject('site-icons', '/partials/icons.html'),
      inject('site-header', '/partials/header.html'),
      inject('site-footer', '/partials/footer.html')
    ]).then(() => {
      bindHeaderScroll();
      activeNav();
    });
    bindReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
