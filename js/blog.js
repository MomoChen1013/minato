/* 部落格列表頁：分類篩選 */
(function () {
  const btns = [...document.querySelectorAll('.filters button')];
  const cards = [...document.querySelectorAll('#grid .card')];
  const empty = document.getElementById('empty');
  if (!btns.length) return;

  btns.forEach((b) => b.addEventListener('click', () => {
    const cat = b.dataset.cat;
    btns.forEach((x) => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    let shown = 0;
    cards.forEach((c) => {
      const hit = cat === 'all' || c.dataset.cat === cat;
      c.style.display = hit ? '' : 'none';
      if (hit) shown++;
    });
    empty.style.display = shown ? 'none' : 'block';
  }));
})();
