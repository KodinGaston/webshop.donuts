(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(r){if(r.ep)return;r.ep=!0;const t=n(r);fetch(r.href,t)}})();const i=[{name:"Strawberry",price:25,images:[{src:"webshop.donut.1.webp",alt:"Strawberry munk",loading:"lazy",referrerpolicy:"no-referrer noopener"},{src:"1.webp",alt:"Strawberry munk",loading:"lazy",referrerpolicy:"no-referrer noopener"}],rating:4.5,category:"sweet",amount:0,selectedImageIndex:0},{name:"Chocolate",price:30,images:[{src:"webshop.donut.2.webp",alt:"En choklad munk",loading:"lazy",referrerpolicy:"no-referrer noopener"},{src:"2.webp",alt:"Red munk",loading:"lazy",referrerpolicy:"no-referrer noopener"}],rating:4.7,category:"sweet",amount:0,selectedImageIndex:0},{name:"Vanilla",price:20,images:[{src:"webshop.donut.3.webp",alt:"Vanilj munk",loading:"lazy",referrerpolicy:"no-referrer noopener"},{src:"3.webp",alt:"En vanilj munk",loading:"lazy",referrerpolicy:"no-referrer noopener"}],rating:3,category:"sweet",amount:0,selectedImageIndex:0},{name:"Original",price:25,images:[{src:"webshop.donut.4.webp",alt:"En socker munk",loading:"lazy",referrerpolicy:"no-referrer noopener"},{src:"4.webp",alt:"En socker munk",loading:"lazy",referrerpolicy:"no-referrer noopener"}],rating:3.7,category:"sweet",amount:0,selectedImageIndex:0},{name:"Chocolate party",price:45,images:[{src:"webshop.donut.5.webp",alt:"En chocklad munk",loading:"lazy",referrerpolicy:"no-referrer noopener"},{src:"5.webp",alt:"En chocklad munk",loading:"lazy",referrerpolicy:"no-referrer noopener"}],rating:5,category:"sweet",amount:0,selectedImageIndex:0},{name:"Caramel",price:40,images:[{src:"webshop.donut.6.webp",alt:"En karamell munk",loading:"lazy",referrerpolicy:"no-referrer noopener"},{src:"6.webp",alt:"En karamell munk",loading:"lazy",referrerpolicy:"no-referrer noopener"}],rating:5,category:"sweet",amount:0,selectedImageIndex:0}],O=Array.from(document.querySelectorAll('input[name="payment-option"]')),u=document.querySelector("#creditCardNumber"),h=document.querySelector("#creditCardYear"),b=document.querySelector("#creditCardMonth"),p=document.querySelector("#creditCardCvc"),g=document.querySelector("#personalId"),k=document.querySelector("#invoice"),E=document.querySelector("#card"),y=document.querySelector("#orderBtn"),d=document.querySelector("#errorContainer");document.querySelector("#confirmationMessage");let m="card";const A=/^(\d{10}|\d{12}|\d{6}-\d{4})$/,z=/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;function $(){u.value="5100080000000000",h.value="xx",b.value="xx",p.value="xxx",g.value="19850505-1234",q()}function l(e){d.textContent=e,d.classList.remove("hidden"),d.classList.add("visible")}function q(){d.textContent="",d.classList.remove("visible"),d.classList.add("hidden")}function T(){if(q(),y.setAttribute("disabled",""),m==="invoice"){if(console.log("Validating ID: ",g.value),!A.test(g.value)){l("Ogiltigt personnummer.");return}}else if(m==="card"){if(console.log("Validating credit card: ",u.value),u.value==="5100080000000000"){l("Ange ett giltigt kortnummer.");return}if(!z.test(u.value)){l("Ogiltigt kortnummer.");return}const e=Number(b.value);if(console.log("Month out-of-date",e),isNaN(e)||e<1||e>12){l("Ange månader från 01 till 12.");return}const n=Number(h.value),o=Number(String(new Date().getFullYear()).slice(-2));if(isNaN(n)||n<o||n>o+10){l("Ogiltig år");return}if(p.value.length!==3||isNaN(p.value)){l("CVC måste ha 3 siffror");return}}y.removeAttribute("disabled")}function H(){const e=document.getElementById("confirmationMessage");e.innerHTML='<span class="icon">🎉</span> Tack! Vi kommer att behandla din beställning.',console.log("Contenido insertado:",e.innerHTML),e.classList.add("visible"),setTimeout(()=>{e.classList.remove("visible")},5e3)}function D(e){m=e.target.value,m==="card"?(E.classList.remove("hidden"),k.classList.add("hidden"),$()):m==="invoice"&&(k.classList.remove("hidden"),E.classList.add("hidden"),g.value="YYMMDD-XXXX"),T()}document.addEventListener("DOMContentLoaded",()=>{$()});O.forEach(e=>{e.addEventListener("change",D)});[u,h,b,p,g].forEach(e=>{e.addEventListener("input",T)});y.addEventListener("click",()=>{console.log("Clic en el botón Beställ detectado."),y.disabled||(console.log("Button activated"),H())});let x;function P(){alert("► 🎉 Du får 10% rabatt! Gäller på fredagar efter kl. 15:00 och måndagar innan kl. 15:00. ☺ ◄")}function f(){clearTimeout(x),x=setTimeout(P,15*60*1e3)}function V(){window.addEventListener("mousemove",f),window.addEventListener("keydown",f),window.addEventListener("scroll",f),f()}V();const M=document.querySelector("#donutContainer"),c=document.querySelector("#cart"),L=new Date,C=L.getDay()===5,N=L.getDay()===1,v=L.getHours();function B(){return C&&v>=15||N&&v<15?.9:1}function I(){M.innerHTML="",i.forEach((e,n)=>{const o=X(e.rating),r=e.selectedImageIndex||0;M.innerHTML+=`
      <div class="donut-card">
        <div class="donut-img-container">
          <img src="${e.images[r].src}" alt="${e.images[r].alt}" class="donut-img" id="donut-img-${n}">
          <div class="image-controls">
            <button class="prev-img" data-id="${n}">◀</button>
            <button class="next-img" data-id="${n}">▶</button>
          </div>
        </div>        
        <div class="donut-info">
          <span class="donut-name">${e.name}</span>
          <span class="donut-price">${e.price} kr</span>
        </div>
        <div class="donut-rating">
          <span>Rating: ${o}</span>
        </div>
        <div class="donut-actions">
          <button class="minus" data-id="${n}">-</button>
          <span class="donut-amount">Amount: ${e.amount}</span>
          <button class="plus" data-id="${n}">+</button>
        </div>
      </div>
    `}),F(),Y(),R()}function F(){const e=document.querySelectorAll(".prev-img"),n=document.querySelectorAll(".next-img");e.forEach(o=>{o.addEventListener("click",()=>{const r=parseInt(o.dataset.id,10),t=i[r];t.selectedImageIndex=(t.selectedImageIndex||0)-1,t.selectedImageIndex<0&&(t.selectedImageIndex=t.images.length-1),S(r)})}),n.forEach(o=>{o.addEventListener("click",()=>{const r=parseInt(o.dataset.id,10),t=i[r];t.selectedImageIndex=(t.selectedImageIndex||0)+1,t.selectedImageIndex>=t.images.length&&(t.selectedImageIndex=0),S(r)})})}function S(e){const n=i[e],o=n.selectedImageIndex||0,r=document.getElementById(`donut-img-${e}`);r.src=n.images[o].src,r.alt=n.images[o].alt}function X(e){let n="";const o=Math.floor(e),r=e-o;for(let t=0;t<o;t++)n+="★";r>=.25&&r<.75?n+="⯪":r>=.75&&(n+="★");for(let t=o+(r>=.25?1:0);t<5;t++)n+="☆";return n}function Y(){const e=document.querySelectorAll("button.minus"),n=document.querySelectorAll("button.plus");e.forEach(o=>o.addEventListener("click",j)),n.forEach(o=>o.addEventListener("click",G))}function j(e){const n=e.currentTarget.dataset.id;i[n].amount=Math.max(0,i[n].amount-1),I()}function G(e){const n=e.currentTarget.dataset.id;i[n].amount+=1,I()}function R(){c.innerHTML="";let e=0,n=0,o="",r=B();if(i.forEach(a=>{if(n+=a.amount,a.amount>0){let s=a.price;a.amount>=10&&(s*=.9);const w=s*r;e+=a.amount*w,c.innerHTML+=`
        <article>
          <span>${a.name}</span> | <span>${a.amount}</span> | <span>${(a.amount*w).toFixed(2)} kr</span>
        </article>
      `}}),e<=0)return;(N&&v<15||C&&v>=15)&&(e*=.9,o+="<p>Måndagsrabatt: 10% på hela beställningen</p>");const t=Math.round(e);c.innerHTML+=`<h1>Total = ${e.toFixed(2)} kr</h1>`,c.innerHTML+=`<div>${o}</div>`,t>=80&&(c.innerHTML+="<p>Gratis frakt om shipping > 80 kr!</p>"),n>15?c.innerHTML+="<h2>Shipping = 0 kr</h2>":c.innerHTML+=`<h2>Shipping = ${Math.round(25+.1*e)} kr</h2>`}I();