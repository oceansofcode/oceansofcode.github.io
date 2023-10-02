var __extends=this&&this.__extends||function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)};return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();define("theme/interfaces/theme-enums",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})})),define("theme/interfaces/theme-switch-types",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})})),define("theme/theme-switch",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.themeInit=t.themeSwitchEvent=t.cachedDom=t.getStoredTheme=void 0;var n={name:"light-theme",switchIcon:"fa-moon"},o={name:"dark-theme",switchIcon:"fa-sun"};t.getStoredTheme=function(){return JSON.parse(window.localStorage.getItem("theme"))};var r=function(e,n){var o,r=(0,t.cachedDom)().body;null==r||r.classList.add(e.newTheme.name),e.oldTheme&&(null==r||r.classList.remove(e.oldTheme.name)),null==n||n.classList.add(e.newTheme.switchIcon),e.oldTheme&&(null==n||n.classList.remove(e.oldTheme.switchIcon)),o=e.newTheme,window.localStorage.setItem("theme",JSON.stringify(o))};t.themeSwitchEvent=function(e){var i=(0,t.cachedDom)().body,a={newTheme:o,oldTheme:n},d={newTheme:n,oldTheme:o},c="color-theme-in-transition",s=1500;return function(){null==i||i.classList.add(c),setTimeout((function(){return null==i?void 0:i.classList.remove(c)}),s),(null==i?void 0:i.classList.contains(n.name))?r(a,e):r(d,e)}};t.themeInit=function(){var e,i;t.cachedDom=(e=document.querySelector("body"),i=document.querySelector("#intro-background"),function(){return{body:e,mainImage:i}});var a=(0,t.getStoredTheme)();r(a?{newTheme:a}:{newTheme:window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?n:o},void 0)}})),define("custom-elements/header-footer",["require","exports","theme/theme-switch"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PortfolioFooter=t.PortfolioHeader=void 0;var o=function(e){function t(){return e.call(this)||this}return __extends(t,e),t.prototype.connectedCallback=function(){var e=document.createElement("i");e.setAttribute("id","mobile-menu-toggle"),e.setAttribute("class","fas fa-bars"),this.mobileMenuToggle=e,this.appendChild(e);var t=document.createElement("h1");t.setAttribute("id","title");var o=document.createElement("a");o.setAttribute("href","/"),o.appendChild(document.createTextNode("Oceans of Code")),t.appendChild(o),this.appendChild(t);var r=document.createElement("nav");this.appendChild(r);var i=document.createElement("ul");i.setAttribute("id","nav-menu"),this.navMenu=i,r.appendChild(i);var a=document.createElement("li");a.setAttribute("class","drop-down-item");var d=document.createElement("a");d.setAttribute("href","./apps"),d.appendChild(document.createTextNode("Web Apps")),a.appendChild(d);var c=document.createElement("ul");a.setAttribute("class","drop-down"),c.setAttribute("class","drop-down"),a.appendChild(c);var s=document.createElement("li");s.setAttribute("class","drop-down");var l=document.createElement("a");l.setAttribute("href","./apps/gpa"),s.appendChild(l);var u=document.createElement("span");u.setAttribute("class","made-in"),u.appendChild(document.createTextNode("(Angular)")),l.appendChild(u);var m=document.createElement("li");m.setAttribute("class","drop-down-item");var h=document.createElement("a");h.setAttribute("href","./apps/stocks"),m.appendChild(h);var p=document.createElement("span");p.setAttribute("class","made-in"),p.appendChild(document.createTextNode("(React)")),h.appendChild(p),[s,m].forEach((function(e){e.setAttribute("class","drop-down-item"),c.appendChild(e)}));var f=document.createElement("li"),v=document.createElement("a");v.appendChild(document.createTextNode("Web Assembly")),v.setAttribute("href","./wasm"),f.appendChild(v);var b=document.createElement("li"),w=document.createElement("a");w.appendChild(document.createTextNode("Sandbox")),w.setAttribute("href","./sandbox"),b.appendChild(w),[a,f,b].forEach((function(e){return i.appendChild(e)}));var y=document.createElement("i");y.setAttribute("id","theme-switch"),y.setAttribute("class","fas"),this.appendChild(y),y.addEventListener("click",(0,n.themeSwitchEvent)(y),!1),y.classList.add((0,n.getStoredTheme)().switchIcon),this.setupMobileMenuEvents()},t.prototype.setupMobileMenuEvents=function(){var e=this;this.mobileMenuToggle.addEventListener("click",(function(){"flex"===e.navMenu.style.display?e.navMenu.style.display="none":e.navMenu.style.display="flex"}),!1),window.addEventListener("resize",(function(){window.innerWidth>=800&&(e.navMenu.style.display=null)}),!1)},t}(HTMLElement);t.PortfolioHeader=o;var r=function(e){function t(){var t=e.call(this)||this;return t.year=(new Date).getFullYear().toString(),t}return __extends(t,e),t.prototype.connectedCallback=function(){var e=document.createElement("p"),t=document.createTextNode(String.fromCharCode(169)+" ");e.appendChild(t);var n=document.createElement("time");n.setAttribute("id","footer-date"),n.setAttribute("datetime",this.year),n.appendChild(document.createTextNode(this.year)),e.appendChild(n),e.appendChild(document.createTextNode(" Adam A")),this.appendChild(e)},t}(HTMLElement);t.PortfolioFooter=r})),define("main",["require","exports","theme/theme-switch","custom-elements/header-footer"],(function(e,t,n,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),(0,n.themeInit)(),customElements.define("portfolio-header",o.PortfolioHeader,{extends:"header"}),customElements.define("portfolio-footer",o.PortfolioFooter,{extends:"footer"})}));