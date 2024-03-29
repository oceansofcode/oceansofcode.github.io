import{getThemeFromPreference as e,themeSwitchEvent as t}from"../theme/theme.js";export class PortfolioHeader extends HTMLElement{mobileMenuToggle;navMenu;previousScrollPosition=window.scrollY;constructor(){super()}connectedCallback(){const n=[],i=document.createElement("i");i.setAttribute("id","mobile-menu-toggle"),i.setAttribute("class","fas fa-bars"),this.mobileMenuToggle=i,this.appendChild(i);const o=document.createElement("h1");o.setAttribute("id","title");const s=document.createElement("a");s.setAttribute("href","/"),s.appendChild(document.createTextNode("Oceans of Code")),o.appendChild(s),this.appendChild(o);const l=document.createElement("nav");this.appendChild(l);const d=document.createElement("ul");d.setAttribute("id","nav-menu"),this.navMenu=d,l.appendChild(d);const c=document.createElement("li"),r=document.createElement("a");r.setAttribute("href","/clients"),r.appendChild(document.createTextNode("Clients")),r.addEventListener("click",(e=>{e.preventDefault(),document.location.href="/#clients"})),c.appendChild(r),n.push(c),n.forEach((e=>d.appendChild(e)));const a=document.createElement("i");a.setAttribute("id","theme-switch"),a.setAttribute("class","fas"),this.appendChild(a),a.addEventListener("click",t(a),!1),a.classList.add(e().switchIcon),this.previousScrollPosition=window.scrollY,this.scrollEndEvent(),this.setupMobileMenuEvents(),this.listenToThemeSwitch()}setupMobileMenuEvents(){this.mobileMenuToggle.addEventListener("click",(()=>this.toggleMobileMenu(this.navMenu)),!1),window.addEventListener("resize",(()=>{window.innerWidth>=801&&(this.navMenu.style.display=null)}),!1)}toggleMobileMenu(e){window.innerWidth<=800&&"flex"===e.style.display?e.style.display="none":e.style.display="flex"}closeMobileMenu(e){window.innerWidth<=800&&(e.style.display="none")}scrollEndEvent(){window.addEventListener("scroll",(()=>{const e=this.previousScrollPosition,t=window.scrollY;t>500&&e<t?(this.style.translate="0 -70px",this.closeMobileMenu(this.navMenu)):this.style.translate="0 0",this.changeBackgroundColorOpacity(),this.previousScrollPosition=t}),!1)}changeBackgroundColorOpacity(){const e=window.scrollY>300?.99:.75,t=getComputedStyle(this).getPropertyValue("background-color").replace(/0?\.?\d+\)$/,`${e.toString()})`);this.style.backgroundColor=t}listenToThemeSwitch(){window.addEventListener("themeSwitched",(()=>this.style.removeProperty("background-color")),!1)}}export class PortfolioFooter extends HTMLElement{year;constructor(){super(),this.year=(new Date).getFullYear().toString()}connectedCallback(){const e=document.createElement("p"),t=document.createTextNode(String.fromCharCode(169)+" ");e.appendChild(t);const n=document.createElement("time");n.setAttribute("id","footer-date"),n.setAttribute("datetime",this.year),n.appendChild(document.createTextNode(this.year)),e.appendChild(n),e.appendChild(document.createTextNode(" Adam A")),this.appendChild(e)}}
//# sourceMappingURL=header-footer.js.map