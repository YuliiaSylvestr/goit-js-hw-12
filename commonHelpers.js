import{S as f,a as p,i as c}from"./assets/vendor-68f1313b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const d=40;let l=1,u="";const e={galleryContainer:document.querySelector(".gallery"),form:document.querySelector(".form"),searchInput:document.querySelector(".input"),loadMoreButton:document.querySelector(".load-button"),loaderContainer:document.querySelector(".loader-container")};function g(n){return n.map(({previewURL:r,largeImageURL:s,tags:o,likes:t,views:a,comments:i,downloads:m})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s}">
          <img
            class="gallery-image"
            src="${r}"
            data-source="${s}"
            alt="${o}"
          />
          <div class="stats">
            <div class="stats-item">
              <span class="stats-item-title">Likes</span>
              <span class="stats-item-value">${t}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Views</span>
              <span class="stats-item-value">${a}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Comments</span>
              <span class="stats-item-value">${i}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Downloads</span>
              <span class="stats-item-value">${m}</span>
            </div>
          </div>
        </a>
      </li>`).join("")}let y=new f(".gallery a",{captionsData:"alt",captionDelay:"250",captionType:"alt"});e.form.addEventListener("submit",async n=>{n.preventDefault(),e.galleryContainer.innerHTML="",e.loaderContainer.innerHTML=`
   <div class="loader"></div>
  `,e.loadMoreButton.classList.add("visually-hidden");try{l=1,u=e.searchInput.value,n.currentTarget.reset();const{data:r}=await p.get(`https://pixabay.com/api/?key=42081820-380f934f7feb19076f66ce532&q=${encodeURI(u)}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=${d}`),s=r.hits;if(l===1&&s.length===0){c.error({title:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#f53d3d",titleColor:"white",progressBar:!1,icon:""}),e.galleryContainer.innerHTML="",e.loaderContainer.innerHTML="";return}s.length<d?e.loadMoreButton.classList.add("visually-hidden"):e.loadMoreButton.classList.remove("visually-hidden");const a=g(s);e.loaderContainer.innerHTML="",e.galleryContainer.innerHTML=a,y.refresh()}catch{e.galleryContainer.innerHTML="",c.error({title:"Sorry, something went wrong. Please try again!",position:"topRight",backgroundColor:"#f53d3d",titleColor:"white",progressBar:!1,icon:""})}});e.loadMoreButton.addEventListener("click",async n=>{try{e.loaderContainer.innerHTML=`
    <div class="loader"></div>
    `,e.loadMoreButton.classList.add("visually-hidden"),l+=1;const{data:r}=await p.get(`https://pixabay.com/api/?key=42081820-380f934f7feb19076f66ce532&q=${encodeURI(u)}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=${d}`),s=r.hits,o=g(s);s.length<d?(e.loadMoreButton.classList.add("visually-hidden"),c.warning({title:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"de9a09",titleColor:"white",progressBar:!1,icon:""})):e.loadMoreButton.classList.remove("visually-hidden"),e.galleryContainer.insertAdjacentHTML("beforeend",o),e.loaderContainer.innerHTML="",y.refresh();const i=e.galleryContainer.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({behavior:"smooth",top:i.height*2})}catch{e.galleryContainer.innerHTML="",c.error({title:"Sorry, something went wrong. Please try again!",position:"topRight",backgroundColor:"#f53d3d",titleColor:"white",progressBar:!1,icon:""})}});
//# sourceMappingURL=commonHelpers.js.map
