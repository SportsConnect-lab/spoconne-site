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

// ===== モバイルナビ =====
(function(){
  const btn=document.getElementById("menuBtn");
  const nav=document.getElementById("mobileNav");
  if(!btn || !nav) return;
  btn.addEventListener("click", ()=> nav.classList.toggle("hidden"));
})();
