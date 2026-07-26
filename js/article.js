/* 文章內頁：閱讀進度條 + 目錄（TOC）滾動高亮 */
(function () {
  // 閱讀進度條
  const prog = document.getElementById('prog');
  if (prog) {
    addEventListener('scroll', () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      prog.style.width = p + '%';
    }, { passive: true });
  }

  // 目錄滾動高亮
  const heads = [...document.querySelectorAll('.article-body h2[id]')];
  const links = [...document.querySelectorAll('.toc a')];
  if (heads.length && links.length) {
    const spy = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    heads.forEach((h) => spy.observe(h));
  }
})();
