/* ===================================
   script.js - タブ切替の完全版
   index.html  → #gs-tabs / #gs-panels
   programs.html → #prog-tabs / #prog-panels
   他要素には影響なしスコープ設計
=================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 年の自動表示（任意）
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  // 汎用タブセットアップ関数
  const setupTabs = (btnContainerSelector, panelContainerSelector, defaultKey) => {
    const btnContainer = document.querySelector(btnContainerSelector);
    const panelContainer = document.querySelector(panelContainerSelector);
    if (!btnContainer || !panelContainer) return;

    const buttons = Array.from(btnContainer.querySelectorAll(".tab-btn"));
    const panels = Array.from(panelContainer.querySelectorAll(".tab-panel"));
    if (!buttons.length || !panels.length) return;

    // data-target → panel の対応表
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
      // ボタン切替
      resetButtons();
      const activeBtn = buttons.find(b => b.dataset.target === key);
      if (activeBtn) {
        activeBtn.classList.add("is-active");
        activeBtn.setAttribute("aria-selected", "true");
      }

      // パネル切替
      resetPanels();
      const activePanel = panelMap.get(key);
      if (activePanel) {
        activePanel.classList.remove("hidden");
        activePanel.classList.add("is-show");
      }
    };

    // クリックで切替
    buttons.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const key = btn.dataset.target;
        if (!key || !panelMap.has(key)) return;
        setActive(key);
      });
    });

    // 初期表示
    const firstKey = defaultKey || buttons[0]?.dataset.target;
    if (firstKey) setActive(firstKey);
  };

  // index.html 用
  setupTabs("#gs-tabs", "#gs-panels", "tab-teams");

  // programs.html 用
  setupTabs("#prog-tabs", "#prog-panels", "team");
});
