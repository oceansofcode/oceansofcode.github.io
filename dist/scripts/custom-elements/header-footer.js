import{getThemeFromPreference as e,themeSwitchEvent as t}from"../theme/theme.js";export class PortfolioHeader extends HTMLElement{mobileMenuToggle;navMenu;previousScrollPosition=window.scrollY;constructor(){super()}connectedCallback(){const n=document.createElement("i");n.setAttribute("id","mobile-menu-toggle"),n.setAttribute("class","fas fa-bars hidden"),this.mobileMenuToggle=n,this.appendChild(n);const o=document.createElement("h1");o.setAttribute("id","title");const d=document.createElement("a");d.setAttribute("href","/"),d.appendChild(document.createTextNode("Oceans of Code")),o.appendChild(d),this.appendChild(o);const s=document.createElement("nav");this.appendChild(s);const i=document.createElement("ul");i.setAttribute("id","nav-menu"),this.navMenu=i,s.appendChild(i);const a=document.createElement("li");a.setAttribute("class","drop-down-item");const c=document.createElement("a");c.setAttribute("href","./apps"),c.appendChild(document.createTextNode("Web Apps")),a.appendChild(c);const l=document.createElement("ul");a.setAttribute("class","drop-down"),l.setAttribute("class","drop-down"),a.appendChild(l);const r=document.createElement("li");r.setAttribute("class","drop-down");const p=document.createElement("a");p.setAttribute("href","./apps/gpa"),r.appendChild(p);const u=document.createElement("span");u.setAttribute("class","made-in"),u.appendChild(document.createTextNode("(Angular)")),p.appendChild(u);const m=document.createElement("li");m.setAttribute("class","drop-down-item");const h=document.createElement("a");h.setAttribute("href","./apps/stocks"),m.appendChild(h);const b=document.createElement("span");b.setAttribute("class","made-in"),b.appendChild(document.createTextNode("(React)")),h.appendChild(b);[r,m].forEach((e=>{e.setAttribute("class","drop-down-item"),l.appendChild(e)}));const C=document.createElement("li"),E=document.createElement("a");E.appendChild(document.createTextNode("Web Assembly")),E.setAttribute("href","./wasm"),C.appendChild(E);const w=document.createElement("li"),A=document.createElement("a");A.appendChild(document.createTextNode("Sandbox")),A.setAttribute("href","./sandbox"),w.appendChild(A);[a,C,w].forEach((e=>i.appendChild(e)));const g=document.createElement("i");g.setAttribute("id","theme-switch"),g.setAttribute("class","fas"),this.appendChild(g),g.addEventListener("click",t(g),!1),g.classList.add(e().switchIcon),this.previousScrollPosition=window.scrollY,this.scrollEndEvent(),this.setupMobileMenuEvents(),this.listenToThemeSwitch()}setupMobileMenuEvents(){this.mobileMenuToggle.addEventListener("click",(()=>{"flex"===this.navMenu.style.display?this.navMenu.style.display="none":this.navMenu.style.display="flex"}),!1),window.addEventListener("resize",(()=>{window.innerWidth>=800&&(this.navMenu.style.display=null)}),!1)}scrollEndEvent(){window.addEventListener("scroll",(()=>{const e=this.previousScrollPosition,t=window.scrollY;this.style.translate=t>500&&e<t?"0 -70px":"0 0",this.changeBackgroundColorOpacity(),this.previousScrollPosition=t}),!1)}changeBackgroundColorOpacity(){const e=window.scrollY>300?.99:.75,t=getComputedStyle(this).getPropertyValue("background-color").replace(/0?\.?\d+\)$/,`${e.toString()})`);this.style.backgroundColor=t}listenToThemeSwitch(){window.addEventListener("themeSwitch",(()=>this.style.removeProperty("background-color")),!1)}}export class PortfolioFooter extends HTMLElement{year;constructor(){super(),this.year=(new Date).getFullYear().toString()}connectedCallback(){const e=document.createElement("p"),t=document.createTextNode(String.fromCharCode(169)+" ");e.appendChild(t);const n=document.createElement("time");n.setAttribute("id","footer-date"),n.setAttribute("datetime",this.year),n.appendChild(document.createTextNode(this.year)),e.appendChild(n),e.appendChild(document.createTextNode(" Adam A")),this.appendChild(e)}}
//# sourceMappingURL=header-footer.js.map