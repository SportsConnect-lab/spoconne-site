// ==== 年の自動表示 ====
(() => {
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
})();

// ==== タブ切替（色：チーム=オレンジ / コーチ=水色 / 企業=緑）====
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels  = document.querySelectorAll(".tab-panel");
  if (!buttons.length) return;

  const resetBtn = (btn) => {
    // 余計な色を全部外す（過去に残った bg-brand も含む）
    btn.classList.remove(
      "bg-orange-500","bg-sky-500","bg-emerald-500","bg-brand",
      "text-white","border-transparent","shadow"
    );
    // 非アクティブの基本見た目に戻す
    btn.classList.add("text-slate-700","border-slate-300");
    btn.setAttribute("aria-selected","false");
  };

  const activateBtn = (btn) => {
    resetBtn(btn);
    const t = btn.dataset.target;
    if (t === "tab-teams")       btn.classList.add("bg-orange-500");
    else if (t === "tab-coaches")btn.classList.add("bg-sky-500");
    else                         btn.classList.add("bg-emerald-500");
    btn.classList.add("text-white","border-transparent","shadow");
    btn.classList.remove("text-slate-700","border-slate-300");
    btn.setAttribute("aria-selected","true");
  };

  const show = (btn) => {
    // ボタンの見た目
    buttons.forEach(resetBtn);
    activateBtn(btn);
    // パネル表示
    panels.forEach(p => p.classList.add("hidden"));
    const panel = document.getElementById(btn.dataset.target);
    if (panel) panel.classList.remove("hidden");
  };

  // クリック
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      show(btn);
    });
  });

  // 初期表示：最初のボタンをアクティブ
  show(buttons[0]);
});

// ==== モバイルナビ ====
(() => {
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => nav.classList.toggle("hidden"));
})();

// ===== Programs タブ切り替え（色＆表示）=====
document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(document.querySelectorAll('.tab-btn'));
  const panels = {
    'tab-teams'     : document.getElementById('tab-teams'),
    'tab-coaches'   : document.getElementById('tab-coaches'),
    'tab-companies' : document.getElementById('tab-companies'),
  };

  function show(id) {
    // ボタン状態
    buttons.forEach(b => {
      const active = b.dataset.target === id;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // パネル状態
    Object.entries(panels).forEach(([key, el]) => {
      el.classList.toggle('is-show', key === id);
    });

    // 見出しの近くまで少しスクロール（任意）
    const main = document.querySelector('main') || document.body;
    window.scrollTo({ top: (main.offsetTop || 0) + 16, behavior: 'smooth' });
  }

  // クリック
  buttons.forEach(b => b.addEventListener('click', () => show(b.dataset.target)));

  // 初期表示：チームにしたい場合は 'tab-teams'、コーチなら 'tab-coaches'
  show('tab-teams');
});
