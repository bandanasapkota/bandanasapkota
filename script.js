document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.querySelector(".menu-btn"),nav=document.querySelector(".nav"),links=document.querySelectorAll(".nav a");

 if(menu&&nav){
  menu.onclick=()=>{
   nav.classList.toggle("active");
   const open=nav.classList.contains("active");
   menu.textContent=open?"✕":"☰";
   menu.setAttribute("aria-expanded",open);
   menu.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu");
  };
  links.forEach(l=>l.onclick=()=>{nav.classList.remove("active");menu.textContent="☰";menu.setAttribute("aria-expanded","false")});
  document.onclick=e=>{
   if(!nav.contains(e.target)&&!menu.contains(e.target)&&nav.classList.contains("active")){
    nav.classList.remove("active");menu.textContent="☰";menu.setAttribute("aria-expanded","false");
   }
  };
 }

 document.querySelectorAll('a[href^="#"]').forEach(l=>l.onclick=e=>{
  const t=document.querySelector(l.getAttribute("href"));
  if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"})}
 });

 const header=document.querySelector(".header");
 const update=()=>header?.classList.toggle("scrolled",scrollY>50);
 addEventListener("scroll",update,{passive:true});update();

 const items=document.querySelectorAll(".section-heading,.about-text,.feature-card,.card,.contact-box,.contact-buttons");
 items.forEach(e=>e.classList.add("reveal"));

 if("IntersectionObserver"in window){
  const observer=new IntersectionObserver((entries,o)=>{
   entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");o.unobserve(e.target)}});
  },{threshold:.15});
  items.forEach(e=>observer.observe(e));
 }else items.forEach(e=>e.classList.add("show"));

 document.querySelectorAll(".btn,.contact-btn").forEach(b=>b.onclick=e=>{
  const r=document.createElement("span"),x=b.getBoundingClientRect();
  r.style.cssText=`position:absolute;width:10px;height:10px;border-radius:50%;background:#ffffff59;transform:translate(-50%,-50%);pointer-events:none;left:${e.clientX-x.left}px;top:${e.clientY-x.top}px`;
  b.style.position="relative";b.style.overflow="hidden";b.appendChild(r);
  r.animate([{width:"10px",height:"10px",opacity:.7},{width:"400px",height:"400px",opacity:0}],{duration:600,easing:"ease-out"});
  setTimeout(()=>r.remove(),600);
 });

 const loader=document.getElementById("page-loader");
 if(loader){
  document.body.style.overflow="hidden";
  setTimeout(()=>{loader.classList.add("hide");document.body.style.overflow=""},3500);
 }
});
