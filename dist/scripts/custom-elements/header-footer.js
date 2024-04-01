import{getThemeFromPreference as e,themeSwitchEvent as t}from"../theme/theme.js";export class PortfolioHeader extends HTMLElement{mobileMenuToggle;navMenu;previousScrollPosition=window.scrollY;constructor(){super()}connectedCallback(){const n=[],i=document.createElement("i");i.setAttribute("id","mobile-menu-toggle"),i.setAttribute("class","fas fa-bars"),this.mobileMenuToggle=i,this.appendChild(i);const o=document.createElement("h1");o.setAttribute("id","title");const l=document.createElement("a");l.setAttribute("href","/"),l.appendChild(document.createTextNode("Oceans of Code")),o.appendChild(l),this.appendChild(o);const s=document.createElement("nav");this.appendChild(s);const a=document.createElement("ul");a.setAttribute("id","nav-menu"),this.navMenu=a,s.appendChild(a);const d=this.createNavigiationItem("Clients","/clients","/#clients");n.push(d),n.forEach((e=>a.appendChild(e)));const c=document.createElement("i");c.setAttribute("id","theme-switch"),c.setAttribute("class","fas"),this.appendChild(c),c.addEventListener("click",t(c),!1),c.classList.add(e().switchIcon),this.previousScrollPosition=window.scrollY,this.handleScrollEvent(),this.handleMobileMenuEvents(),this.handleThemeSwitchEvent()}createNavigiationItem(e,t,n){const i=document.createElement("li"),o=document.createElement("a");return o.setAttribute("href",t),o.appendChild(document.createTextNode(e)),n&&o.addEventListener("click",(e=>{e.preventDefault(),document.location.href=n})),i.appendChild(o),i}handleMobileMenuEvents(){this.mobileMenuToggle.addEventListener("click",(()=>this.toggleMobileMenu(this.navMenu)),!1),window.addEventListener("resize",(()=>{window.innerWidth>=801&&(this.navMenu.style.display=null)}),!1)}toggleMobileMenu(e){window.innerWidth<=800&&"flex"===e.style.display?e.style.display="none":e.style.display="flex"}closeMobileMenu(e){window.innerWidth<=800&&(e.style.display="none")}handleScrollEvent(){window.addEventListener("scroll",(()=>{const e=this.previousScrollPosition,t=window.scrollY;t>500&&e<t?(this.style.translate="0 -70px",this.closeMobileMenu(this.navMenu)):this.style.translate="0 0",this.changeBackgroundColorOpacity(),this.previousScrollPosition=t}),!1)}changeBackgroundColorOpacity(){const e=window.scrollY>300?.99:.75,t=getComputedStyle(this).getPropertyValue("background-color").replace(/0?\.?\d+\)$/,`${e.toString()})`);this.style.backgroundColor=t}handleThemeSwitchEvent(){window.addEventListener("themeSwitched",(()=>this.style.removeProperty("background-color")),!1)}}export class PortfolioFooter extends HTMLElement{year;constructor(){super(),this.year=(new Date).getFullYear().toString()}connectedCallback(){const e=document.createElement("p"),t=document.createTextNode(String.fromCharCode(169)+" "),n=document.createElement("time");n.setAttribute("id","footer-date"),n.setAttribute("datetime",this.year),n.appendChild(document.createTextNode(this.year)),e.appendChild(t),e.appendChild(n),e.appendChild(document.createTextNode(" Adam A"));const i=this.createSocialLink("fa-github","https://github.com/oceansofcode"),o=this.createSocialLink("fa-linkedin-in","https://www.linkedin.com/in/adam-a-085a31163");this.appendChild(o),this.appendChild(e),this.appendChild(i)}createSocialLink(e,t){const n=document.createElement("a");n.setAttribute("href",t),n.setAttribute("target","_blank");const i=document.createElement("i");return i.classList.add("fa-brands","link-icon",e),n.appendChild(i),n}}
//# sourceMappingURL=header-footer.js.map