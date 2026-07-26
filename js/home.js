/* 首頁：跑馬燈複製、諮詢表單多步驟流程、Calendly 預約彈窗 */

// duplicate marquee sets for seamless loop
['mqset', 'tkset'].forEach(id => {
  const set = document.getElementById(id);
  if (set) { set.parentElement.appendChild(set.cloneNode(true)); }
});

/* ============ inquiry form ============ */
(function () {
  const form = document.getElementById('inqForm');
  if (!form) return;
  const card = form.closest('.inq-card');
  const pages = [...form.querySelectorAll('.inq-page')];
  const done = form.querySelector('.inq-done');
  const backBtn = document.getElementById('inqBack');
  const nextBtn = document.getElementById('inqNext');
  const submitBtn = document.getElementById('inqSubmit');
  const countB = card.querySelector('.inq-count b');
  const steps = [...card.querySelectorAll('.istep')];
  const iline = card.querySelector('.iline');
  const progress = card.querySelector('.inq-progress');
  let cur = 0;

  // selectable pill visual state (works without :has)
  form.querySelectorAll('.opt input').forEach(inp => {
    inp.addEventListener('change', () => {
      if (inp.type === 'radio') {
        form.querySelectorAll('input[name="' + inp.name + '"]').forEach(o => {
          o.closest('.opt').classList.toggle('sel', o.checked);
        });
      } else {
        inp.closest('.opt').classList.toggle('sel', inp.checked);
      }
    });
  });

  // reveal contact-handle fields
  form.querySelectorAll('.opt[data-reveal]').forEach(opt => {
    const inp = opt.querySelector('input');
    const tgt = form.querySelector('#' + opt.dataset.reveal);
    inp.addEventListener('change', () => {
      tgt.hidden = !inp.checked;
      const el = tgt.querySelector('input,textarea');
      if (inp.checked) { el && el.focus(); } else if (el) { el.value = ''; tgt.classList.remove('bad'); }
    });
  });

  // reveal "其他" fields
  form.querySelectorAll('.q').forEach(q => {
    const field = q.querySelector('[data-other-field]');
    if (!field) return;
    q.querySelectorAll('input[type=radio]').forEach(r => {
      r.addEventListener('change', () => {
        const other = q.querySelector('.opt[data-other] input');
        const showF = !!(other && other.checked);
        field.hidden = !showF;
        const el = field.querySelector('input,textarea');
        if (showF) { el && el.focus(); } else if (el) { el.value = ''; }
      });
    });
  });

  function show(i) {
    pages.forEach((p, idx) => p.hidden = idx !== i);
    done.hidden = true; cur = i;
    backBtn.hidden = i === 0;
    nextBtn.hidden = i === pages.length - 1;
    submitBtn.hidden = i !== pages.length - 1;
    countB.textContent = i + 1;
    steps.forEach((s, idx) => s.classList.toggle('on', idx <= i));
    iline.classList.toggle('on', i >= 1);
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function validate(i) {
    let ok = true, firstBad = null;
    pages[i].querySelectorAll('.q[data-required]').forEach(q => {
      const t = q.dataset.type; let filled = false;
      if (t === 'multi') { filled = !!q.querySelector('input:checked'); }
      else if (t === 'single') {
        filled = !!q.querySelector('input:checked');
        const other = q.querySelector('.opt[data-other] input');
        if (other && other.checked) {
          const tx = q.querySelector('[data-other-field] textarea,[data-other-field] input');
          if (tx && !tx.value.trim()) filled = false;
        }
      } else {
        const inp = q.querySelector('.q-input'); filled = !!(inp && inp.value.trim());
      }
      q.classList.toggle('bad', !filled);
      if (!filled) { ok = false; firstBad = firstBad || q; }
    });
    // contact handles required when their checkbox is on
    pages[i].querySelectorAll('.opt[data-reveal] input:checked').forEach(cb => {
      const tgt = form.querySelector('#' + cb.closest('.opt').dataset.reveal);
      const inp = tgt.querySelector('input,textarea');
      const bad = inp && !inp.value.trim();
      tgt.classList.toggle('bad', !!bad);
      if (bad) { ok = false; firstBad = firstBad || tgt; }
    });
    if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return ok;
  }

  nextBtn.addEventListener('click', () => { if (validate(cur) && cur < pages.length - 1) show(cur + 1); });
  backBtn.addEventListener('click', () => { if (cur > 0) show(cur - 1); });

  form.addEventListener('input', e => {
    e.target.closest('.q') && e.target.closest('.q').classList.remove('bad');
    e.target.closest('.reveal-field') && e.target.closest('.reveal-field').classList.remove('bad');
  });
  form.addEventListener('change', e => {
    e.target.closest('.q') && e.target.closest('.q').classList.remove('bad');
  });

  /* ===== Web3Forms 設定 ===== */
  const WEB3FORMS_KEY = '47e88bb1-37e5-4e2a-877f-1cfdd23dc496';

  // 欄位名稱 → 信件中顯示的中文標籤（讓收到的信更好讀）
  const LABELS = {
    name: '名字', contact: '偏好聯絡方式', contact_email: 'Email',
    contact_line: 'LINE ID', contact_ig: 'IG／Threads',
    location: '所在地', location_other: '所在地（其他）',
    need: '需求', market: '目標市場', lang: '需要語言',
    goal: '目標', goal_other: '目標（其他）',
    pain: '痛點', pain_other: '痛點（其他）',
    assets: '現有素材', links: '現有網站／連結', refs: '參考風格',
    budget: '預算', timeline: '時程', decider: '決策方式',
    source: '從何得知', source_other: '從何得知（其他）', notes: '補充'
  };

  // 錯誤提示元素
  const errBox = document.createElement('p');
  errBox.className = 'inq-error'; errBox.setAttribute('role', 'alert'); errBox.hidden = true;
  errBox.style.cssText = 'color:#c0392b;margin:12px 0 0;font-size:.92rem;';
  form.querySelector('.inq-nav').insertAdjacentElement('beforebegin', errBox);

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate(cur)) return;

    // 收集欄位（多選合併成陣列）
    const data = {};
    new FormData(form).forEach((v, k) => {
      if (data[k] !== undefined) data[k] = [].concat(data[k], v); else data[k] = v;
    });

    // 組成給 Web3Forms 的送出內容，key 換成中文標籤、陣列合併成文字
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: '小港製作所｜新的諮詢來訊' + (data.name ? '（' + data.name + '）' : ''),
      from_name: data.name || '網站訪客'
    };
    Object.keys(data).forEach(k => {
      const val = Array.isArray(data[k]) ? data[k].join('、') : data[k];
      payload[LABELS[k] || k] = val;
    });

    errBox.hidden = true;
    const oldTxt = submitBtn.textContent;
    submitBtn.disabled = true; submitBtn.textContent = '送出中…';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(r => r.json())
      .then(res => {
        if (!res.success) throw new Error(res.message || '送出失敗');
        if (window.gtag) gtag('event', 'generate_lead', { form_name: 'inquiry', budget: data.budget || '', timeline: data.timeline || '' });
        pages.forEach(p => p.hidden = true);
        done.hidden = false;
        backBtn.hidden = nextBtn.hidden = submitBtn.hidden = true;
        if (progress) progress.style.display = 'none';
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      })
      .catch(err => {
        console.error('Web3Forms 送出錯誤 →', err);
        errBox.textContent = '送出時發生了一點問題，請稍後再試一次，或直接用下方的 LINE 與我聯絡。';
        errBox.hidden = false;
        submitBtn.disabled = false; submitBtn.textContent = oldTxt;
        errBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
  });

  /* ===== Calendly 預約彈窗 ===== */
  const CALENDLY_URL = 'https://calendly.com/minatodesign-studio/20min';
  const calBtn = document.getElementById('calBtn');
  if (calBtn) {
    calBtn.addEventListener('click', () => {
      if (window.gtag) gtag('event', 'schedule_click', { source: 'form_done' });
      if (window.Calendly) {
        Calendly.initPopupWidget({ url: CALENDLY_URL });
      } else {
        window.open(CALENDLY_URL, '_blank', 'noopener');
      }
    });
  }
})();
