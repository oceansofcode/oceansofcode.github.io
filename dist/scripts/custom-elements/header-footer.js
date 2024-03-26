import{getThemeFromPreference as e,themeSwitchEvent as t}from"../theme/theme.js";export class PortfolioHeader extends HTMLElement{mobileMenuToggle;navMenu;constructor(){super()}connectedCallback(){const n=document.createElement("i");n.setAttribute("id","mobile-menu-toggle"),n.setAttribute("class","fas fa-bars hidden"),this.mobileMenuToggle=n,this.appendChild(n);const d=document.createElement("h1");d.setAttribute("id","title");const s=document.createElement("a");s.setAttribute("href","/"),s.appendChild(document.createTextNode("Oceans of Code")),d.appendChild(s),this.appendChild(d);const a=document.createElement("nav");this.appendChild(a);const i=document.createElement("ul");i.setAttribute("id","nav-menu"),this.navMenu=i,a.appendChild(i);const c=document.createElement("li");c.setAttribute("class","drop-down-item");const o=document.createElement("a");o.setAttribute("href","./apps"),o.appendChild(document.createTextNode("Web Apps")),c.appendChild(o);const l=document.createElement("ul");c.setAttribute("class","drop-down"),l.setAttribute("class","drop-down"),c.appendChild(l);const r=document.createElement("li");r.setAttribute("class","drop-down");const p=document.createElement("a");p.setAttribute("href","./apps/gpa"),r.appendChild(p);const u=document.createElement("span");u.setAttribute("class","made-in"),u.appendChild(document.createTextNode("(Angular)")),p.appendChild(u);const m=document.createElement("li");m.setAttribute("class","drop-down-item");const h=document.createElement("a");h.setAttribute("href","./apps/stocks"),m.appendChild(h);const b=document.createElement("span");b.setAttribute("class","made-in"),b.appendChild(document.createTextNode("(React)")),h.appendChild(b);[r,m].forEach((e=>{e.setAttribute("class","drop-down-item"),l.appendChild(e)}));const C=document.createElement("li"),E=document.createElement("a");E.appendChild(document.createTextNode("Web Assembly")),E.setAttribute("href","./wasm"),C.appendChild(E);const A=document.createElement("li"),f=document.createElement("a");f.appendChild(document.createTextNode("Sandbox")),f.setAttribute("href","./sandbox"),A.appendChild(f);[c,C,A].forEach((e=>i.appendChild(e)));const w=document.createElement("i");w.setAttribute("id","theme-switch"),w.setAttribute("class","fas"),this.appendChild(w),w.addEventListener("click",t(w),!1),w.classList.add(e().switchIcon),this.changeOnScroll(),this.setupMobileMenuEvents()}setupMobileMenuEvents(){this.mobileMenuToggle.addEventListener("click",(()=>{"flex"===this.navMenu.style.display?this.navMenu.style.display="none":this.navMenu.style.display="flex"}),!1),window.addEventListener("resize",(()=>{window.innerWidth>=800&&(this.navMenu.style.display=null)}),!1)}changeOnScroll(){window.addEventListener("scroll",(()=>this.setVisibility()),!1)}setVisibility(){window.scrollY>350?this.style.translate="0 -70px":this.style.translate="0 0"}}export class PortfolioFooter extends HTMLElement{year;constructor(){super(),this.year=(new Date).getFullYear().toString()}connectedCallback(){const e=document.createElement("p"),t=document.createTextNode(String.fromCharCode(169)+" ");e.appendChild(t);const n=document.createElement("time");n.setAttribute("id","footer-date"),n.setAttribute("datetime",this.year),n.appendChild(document.createTextNode(this.year)),e.appendChild(n),e.appendChild(document.createTextNode(" Adam A")),this.appendChild(e)}}
//# sourceMappingURL=header-footer.js.map