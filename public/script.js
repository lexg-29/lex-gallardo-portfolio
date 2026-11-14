const projectDetails={
  bytesized:{type:"MOBILE APPLICATION / CAPSTONE",title:"ByteSized",description:"ByteSized is a mobile application for image compression and residual-based reconstruction using WebP coding. The project explores reducing image file sizes while retaining reconstruction quality, with SSIM and MSE used for evaluation. It is a capstone project for iOS and Android.",tags:["iOS / Android","WebP","Residual-based reconstruction","SSIM","MSE"],status:"CAPSTONE PROJECT — ADD YOUR DEMO OR REPOSITORY LINK WHEN AVAILABLE."},
  fightledger:{type:"WEB APPLICATION",title:"FightLedger",description:"A combat sports companion designed for MMA fighters and enthusiasts. It includes a training log, personal fight record, weight tracker with weigh-in history and target weight, plus an events watchlist.",tags:["HTML","CSS","JavaScript","Local Storage","Responsive UI"],status:"PERSONAL PROJECT — BROWSER-BASED DATA STORAGE."},
  applylog:{type:"PRODUCTIVITY WEB APPLICATION",title:"ApplyLog",description:"A job application tracker for organizing job opportunities, company contacts, follow-up dates, interview schedules, application progress, and job-search statistics.",tags:["HTML","CSS","JavaScript","Local Storage","CSV Export"],status:"PERSONAL PROJECT — BROWSER-BASED DATA STORAGE."},
  vaulta:{type:"PERSONAL FINANCE WEB APPLICATION",title:"Vaulta",description:"A personal expense tracker project for recording income and expenses, organizing transactions, and reviewing spending activity. Update this description to match the final feature set of your Vaulta build.",tags:["HTML","CSS","JavaScript"],status:"PERSONAL PROJECT — UPDATE WITH YOUR FINAL FEATURE LIST."}
};
const modal=document.getElementById("project-modal");
document.querySelectorAll("[data-open]").forEach(btn=>btn.addEventListener("click",()=>{
 const p=projectDetails[btn.dataset.open];if(!p)return;
 document.getElementById("modal-type").textContent=p.type;
 document.getElementById("modal-title").textContent=p.title;
 document.getElementById("modal-description").textContent=p.description;
 document.getElementById("modal-tags").innerHTML=p.tags.map(t=>`<b>${t}</b>`).join("");
 document.getElementById("modal-status").textContent=p.status;
 modal.showModal();
}));
document.getElementById("modal-close").addEventListener("click",()=>modal.close());
modal.addEventListener("click",e=>{if(e.target===modal)modal.close()});

const menuToggle=document.getElementById("menu-toggle"),nav=document.getElementById("main-nav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open))});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const glow=document.querySelector(".cursor-glow");
if(window.matchMedia("(pointer:fine)").matches){window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true})}

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".nav-link")];
const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>activeObserver.observe(s));
document.getElementById("year").textContent=new Date().getFullYear();


