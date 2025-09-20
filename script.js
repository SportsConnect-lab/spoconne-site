/* ===============================
   script.js  — タブ切替の完全版
   ・index.html（#gs-tabs / #gs-panels）
   ・programs.html（#prog-tabs / #prog-panels）
   ・他要素には一切影響しないスコープ設計
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 年の自動表示（任意） ---------- */
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- 汎用タブセットアップ ---------- */
  const setupTabs = (btnContainerSelector, panelContainerSelector, defaultKey) => {
    const btnContainer   = document.querySelector(btnContainerSelector);
    const panelContainer = document.querySelector(panelContainerSelector);
    if (!btnContainer || !panelContainer) return;

    const buttons = Array.from(btnContainer.querySelectorAll(".tab-btn"));
    const panels  = Array.from(panelContainer.querySelectorAll(".tab-panel"));
    if (!buttons.length || !panels.length) return;

    // data-target -> panelElement の対応表
    const panelMap = new Map();
    panels.forEach(p => panelMap.set(p.id, p));

    const resetButtons = () => {
      buttons.forEach(b => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
    };

    const resetPanels = () => {
      panels.forEach(p => {
        p.classList.remove("is-show");
        p.classList.add("hidden");
      });
    };

    const setActive = (key) => {
      // ボタン
      resetButtons();
      const activeBtn = buttons.find(b => b.dataset.target === key);
      if (activeBtn) {
        activeBtn.classList.add("is-active");
        activeBtn.setAttribute("aria-selected", "true");
      }

      // パネル
      resetPanels();
      const activePanel = panelMap.get(key);
      if (activePanel) {
        activePanel.classList.remove("hidden");
        activePanel.classList.add("is-show");
      }
    };

    // クリックで切替
    buttons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const key = btn.dataset.target;
        if (!key || !panelMap.has(key)) return;
        setActive(key);

        // 小さくスクロール（見出し直下に寄せたい場合）
        const main = document.querySelector("main");
        if (main) window.scrollTo({ top: main.offsetTop - 16, behavior: "smooth" });
      });
    });

    // 初期表示（指定がなければ最初のボタン）
    const firstKey = defaultKey || (buttons[0] ? buttons[0].dataset.target : null);
    if (firstKey && panelMap.has(firstKey)) setActive(firstKey);
  };

  /* ---------- ページごとの初期化 ---------- */
  // programs.html 用
  setupTabs("#prog-tabs", "#prog-panels", "tab-teams");

  // index.html（サービスの始め方）用
  setupTabs("#gs-tabs", "#gs-panels", "tab-teams");

  /* ---------- モバイルナビ（任意） ---------- */
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden");
    });
  }
});
