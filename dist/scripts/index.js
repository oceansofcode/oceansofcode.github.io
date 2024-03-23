var __awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function c(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((r=r.apply(e,t||[])).next())}))},__generator=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(s){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(a=0)),a;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,r=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){a.label=c[1];break}if(6===c[0]&&a.label<o[1]){a.label=o[1],o=c;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(c);break}o[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}},__extends=this&&this.__extends||function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)};return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();define("theme/interfaces/theme-enums",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})})),define("theme/interfaces/theme-switch-types",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})})),define("theme/theme",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.themeInit=t.themeSwitchEvent=t.getCurrentTheme=t.getThemeFromPreference=void 0;var n,r={name:"light",switchIcon:"fa-moon"},o={name:"dark",switchIcon:"fa-sun"};t.getThemeFromPreference=function(){return window.matchMedia("(prefers-color-scheme: ".concat(r.name,")")).matches?r:o};t.getCurrentTheme=function(){return(null==n?void 0:n.classList.contains(r.name))?r:(null==n?void 0:n.classList.contains(o.name))?o:null};var i=function(e,t){n&&(n.classList.add(e.newTheme.name),e.oldTheme&&n.classList.remove(e.oldTheme.name)),t&&(t.classList.add(e.newTheme.switchIcon),e.oldTheme&&t.classList.remove(e.oldTheme.switchIcon))};t.themeSwitchEvent=function(e){var t={newTheme:o,oldTheme:r},a={newTheme:r,oldTheme:o},c="color-theme-in-transition",s=1500,d=function(){return i(t,e)},u=function(){return i(a,e)};return window.matchMedia("(prefers-color-scheme: ".concat(r.name,")")).addEventListener("change",(function(e){return e.matches?u():d()})),function(){n.classList.add(c),setTimeout((function(){return n.classList.remove(c)}),s),n.classList.contains(r.name)?d():u()}};t.themeInit=function(){return __awaiter(void 0,void 0,void 0,(function(){var e;return __generator(this,(function(t){switch(t.label){case 0:return[4,(a=100,new Promise((function(e,t){var n=setInterval((function(){var r=document.querySelector("body");r?(e(r),clearInterval(n)):--a<0&&(t("Could not query select body element"),clearInterval(n))}),10)})))];case 1:return n=t.sent(),e=function(e){return i({newTheme:e},void 0)},window.matchMedia("(prefers-color-scheme: ".concat(r.name,")")).matches?e(r):e(o),[2]}var a}))}))}})),define("custom-elements/header-footer",["require","exports","theme/theme"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PortfolioFooter=t.PortfolioHeader=void 0;var r=function(e){function t(){return e.call(this)||this}return __extends(t,e),t.prototype.connectedCallback=function(){var e=document.createElement("i");e.setAttribute("id","mobile-menu-toggle"),e.setAttribute("class","fas fa-bars"),this.mobileMenuToggle=e,this.appendChild(e);var t=document.createElement("h1");t.setAttribute("id","title");var r=document.createElement("a");r.setAttribute("href","/"),r.appendChild(document.createTextNode("Oceans of Code")),t.appendChild(r),this.appendChild(t);var o=document.createElement("nav");this.appendChild(o);var i=document.createElement("ul");i.setAttribute("id","nav-menu"),this.navMenu=i,o.appendChild(i);var a=document.createElement("li");a.setAttribute("class","drop-down-item");var c=document.createElement("a");c.setAttribute("href","./apps"),c.appendChild(document.createTextNode("Web Apps")),a.appendChild(c);var s=document.createElement("ul");a.setAttribute("class","drop-down"),s.setAttribute("class","drop-down"),a.appendChild(s);var d=document.createElement("li");d.setAttribute("class","drop-down");var u=document.createElement("a");u.setAttribute("href","./apps/gpa"),d.appendChild(u);var l=document.createElement("span");l.setAttribute("class","made-in"),l.appendChild(document.createTextNode("(Angular)")),u.appendChild(l);var m=document.createElement("li");m.setAttribute("class","drop-down-item");var h=document.createElement("a");h.setAttribute("href","./apps/stocks"),m.appendChild(h);var p=document.createElement("span");p.setAttribute("class","made-in"),p.appendChild(document.createTextNode("(React)")),h.appendChild(p),[d,m].forEach((function(e){e.setAttribute("class","drop-down-item"),s.appendChild(e)}));var f=document.createElement("li"),v=document.createElement("a");v.appendChild(document.createTextNode("Web Assembly")),v.setAttribute("href","./wasm"),f.appendChild(v);var b=document.createElement("li"),w=document.createElement("a");w.appendChild(document.createTextNode("Sandbox")),w.setAttribute("href","./sandbox"),b.appendChild(w),[a,f,b].forEach((function(e){return i.appendChild(e)}));var y=document.createElement("i");y.setAttribute("id","theme-switch"),y.setAttribute("class","fas"),this.appendChild(y),y.addEventListener("click",(0,n.themeSwitchEvent)(y),!1),y.classList.add((0,n.getThemeFromPreference)().switchIcon),this.setupMobileMenuEvents()},t.prototype.setupMobileMenuEvents=function(){var e=this;this.mobileMenuToggle.addEventListener("click",(function(){"flex"===e.navMenu.style.display?e.navMenu.style.display="none":e.navMenu.style.display="flex"}),!1),window.addEventListener("resize",(function(){window.innerWidth>=800&&(e.navMenu.style.display=null)}),!1)},t}(HTMLElement);t.PortfolioHeader=r;var o=function(e){function t(){var t=e.call(this)||this;return t.year=(new Date).getFullYear().toString(),t}return __extends(t,e),t.prototype.connectedCallback=function(){var e=document.createElement("p"),t=document.createTextNode(String.fromCharCode(169)+" ");e.appendChild(t);var n=document.createElement("time");n.setAttribute("id","footer-date"),n.setAttribute("datetime",this.year),n.appendChild(document.createTextNode(this.year)),e.appendChild(n),e.appendChild(document.createTextNode(" Adam A")),this.appendChild(e)},t}(HTMLElement);t.PortfolioFooter=o})),define("main",["require","exports","theme/theme","custom-elements/header-footer"],(function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),(0,n.themeInit)().then((function(){customElements.define("portfolio-header",r.PortfolioHeader,{extends:"header"}),customElements.define("portfolio-footer",r.PortfolioFooter,{extends:"footer"})})).catch((function(e){return document.write(e)}))})),define("custom-elements/experience-card",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ExperienceCard=void 0;var n=function(e){function t(){var t=e.call(this)||this,n=document.getElementById("experience-card").content;return t.attachShadow({mode:"open"}).appendChild(n.cloneNode(!0)),t}return __extends(t,e),t}(HTMLElement);t.ExperienceCard=n})),define("pages/home",["require","exports","custom-elements/experience-card"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),customElements.define("experience-card",n.ExperienceCard)}));