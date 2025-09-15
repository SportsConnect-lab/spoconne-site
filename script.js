// ===== 年の自動表示 =====
(function(){
  const y=document.getElementById("y");
  if(y) y.textContent=new Date().getFullYear();
})();

// ===== 始め方：タブ切替 =====
(function(){
  const tabs=document.querySelectorAll(".tab-btn");
  const panels=document.querySelectorAll(".tab-panel");
  if(!tabs.length) return;

  function show(targetId){
    tabs.forEach(b=>b.dataset.active=(b.dataset.target===targetId)?"true":"false");
    panels.forEach(p=>p.classList.toggle("hidden", p.id!==targetId));
  }
  tabs.forEach(b=>{
    b.addEventListener("click", ()=> show(b.dataset.target));
  });
})();
// Netlify フォーム送信完了を検知してメッセージ表示
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.search.includes("submitted=true")) {
    const success = document.getElementById("success-message");
    if (success) {
      success.classList.remove("hidden");
      // 数秒後に自動で消す場合は以下を有効化
      // setTimeout(() => success.classList.add("hidden"), 5000);
    }
  }
});
// script.js に追加
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // すべてのボタンから active 状態を外す
      tabButtons.forEach((b) =>
        b.classList.remove("bg-brand", "text-white")
      );

      // クリックされたボタンに active 状態を付与
      btn.classList.add("bg-brand", "text-white");

      // 全てのパネルを非表示
      tabPanels.forEach((panel) => panel.classList.add("hidden"));

      // 対応するパネルを表示
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        target.classList.remove("hidden");
      }
    });
  });
});


// ===== モバイルナビ =====
(function(){
  const btn=document.getElementById("menuBtn");
  const nav=document.getElementById("mobileNav");
  if(!btn || !nav) return;
  btn.addEventListener("click", ()=> nav.classList.toggle("hidden"));
})();
