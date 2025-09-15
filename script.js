// ==== 年の自動表示 ====
(function () {
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
})();

// ==== タブ切替 ====
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  if (!tabButtons.length) return;

  const show = (btn) => {
    // すべてのボタンから active クラスを外す
    tabButtons.forEach(b => {
      b.classList.remove("bg-brand", "text-white", "bg-sky-500", "bg-green-500");
    });

    // 押されたボタンに応じて色付け
    if (btn.dataset.target === "tab-teams") {
      btn.classList.add("bg-brand", "text-white"); // オレンジ
    } else if (btn.dataset.target === "tab-coaches") {
      btn.classList.add("bg-sky-500", "text-white"); // 水色
    } else if (btn.dataset.target === "tab-companies") {
      btn.classList.add("bg-green-500", "text-white"); // 緑
    }

    // 全パネルを非表示
    tabPanels.forEach(p => p.classList.add("hidden"));

    // 対応パネルを表示
    const target = document.getElementById(btn.dataset.target);
    if (target) target.classList.remove("hidden");
  };

  // ボタンにクリックイベント付与
  tabButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      show(btn);
    });
  });

  // 初期表示（最初のボタンを有効化）
  show(tabButtons[0]);
});

// ==== モバイルナビ ====
(function () {
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => nav.classList.toggle("hidden"));
})();
