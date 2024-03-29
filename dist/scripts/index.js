var __awaiter=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{s(o.next(e))}catch(e){i(e)}}function a(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((o=o.apply(e,t||[])).next())}))},__generator=this&&this.__generator||function(e,t){var n,o,r,i,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(c=0)),c;)try{if(n=1,o&&(r=2&a[0]?o.return:a[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,a[1])).done)return r;switch(o=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,o=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!(r=c.trys,(r=r.length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){c.label=a[1];break}if(6===a[0]&&c.label<r[1]){c.label=r[1],r=a;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(a);break}r[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],o=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}},__extends=this&&this.__extends||function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)};return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();define("theme/interfaces/theme-enums",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})})),define("theme/interfaces/theme-switch-types",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})})),define("theme/theme",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.themeInit=t.themeSwitchEvent=t.getCurrentTheme=t.getThemeFromPreference=void 0;var n,o={name:"light",switchIcon:"fa-moon",css:"light-theme-css",isLoaded:!1},r={name:"dark",switchIcon:"fa-sun",css:"dark-theme-css",isLoaded:!1},i="color-theme-in-transition",c=1500,a={newTheme:r,oldTheme:o},s={newTheme:o,oldTheme:r},l="hidden-image",u=window.matchMedia("(prefers-color-scheme: ".concat(o.name,")"));t.getThemeFromPreference=function(){return window.matchMedia("(prefers-color-scheme: ".concat(o.name,")")).matches?o:r};t.getCurrentTheme=function(){return(null==n?void 0:n.classList.contains(o.name))?o:(null==n?void 0:n.classList.contains(r.name))?r:null};t.themeSwitchEvent=function(e){var t=function(){n.classList.add(i),setTimeout((function(){return n.classList.remove(i)}),c)},o=function(t){return d(t,e)};return u.addEventListener("change",(function(e){t(),e.matches?o(s):o(a)})),function(){t(),n.classList.contains(r.name)?o(s):o(a)}};var d=function(e,t){var o=e.newTheme,r=e.oldTheme;o.isLoaded||h(o),n&&(n.classList.add(o.name),r&&n.classList.remove(r.name)),t&&(t.classList.add(o.switchIcon),r&&t.classList.remove(r.switchIcon)),document.querySelectorAll(".theme-background").forEach((function(e){e.classList.contains(o.name)&&e.classList.remove(l),r&&e.classList.contains(r.name)&&e.classList.add(l)}));var i=new CustomEvent("themeSwitched",{detail:e});window.dispatchEvent(i)},h=function(e){document.getElementById(e.css).removeAttribute("disabled"),e.isLoaded=!0};t.themeInit=function(){return __awaiter(void 0,void 0,void 0,(function(){var e;return __generator(this,(function(t){switch(t.label){case 0:return[4,(i=100,new Promise((function(e,t){var n=setInterval((function(){var o=document.querySelector("body");o?(e(o),clearInterval(n)):--i<0&&(t("Could not query select body element"),clearInterval(n))}),10)})))];case 1:return n=t.sent(),e=function(e){return d({newTheme:e},void 0)},u.matches?e(o):e(r),[2]}var i}))}))}})),define("custom-elements/header-footer",["require","exports","theme/theme"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PortfolioFooter=t.PortfolioHeader=void 0;var o=function(e){function t(){var t=e.call(this)||this;return t.previousScrollPosition=window.scrollY,t}return __extends(t,e),t.prototype.connectedCallback=function(){var e=[],t=document.createElement("i");t.setAttribute("id","mobile-menu-toggle"),t.setAttribute("class","fas fa-bars"),this.mobileMenuToggle=t,this.appendChild(t);var o=document.createElement("h1");o.setAttribute("id","title");var r=document.createElement("a");r.setAttribute("href","/"),r.appendChild(document.createTextNode("Oceans of Code")),o.appendChild(r),this.appendChild(o);var i=document.createElement("nav");this.appendChild(i);var c=document.createElement("ul");c.setAttribute("id","nav-menu"),this.navMenu=c,i.appendChild(c);var a=document.createElement("li"),s=document.createElement("a");s.setAttribute("href","/clients"),s.appendChild(document.createTextNode("Clients")),s.addEventListener("click",(function(e){e.preventDefault(),document.location.href="/#clients"})),a.appendChild(s),e.push(a),e.forEach((function(e){return c.appendChild(e)}));var l=document.createElement("i");l.setAttribute("id","theme-switch"),l.setAttribute("class","fas"),this.appendChild(l),l.addEventListener("click",(0,n.themeSwitchEvent)(l),!1),l.classList.add((0,n.getThemeFromPreference)().switchIcon),this.previousScrollPosition=window.scrollY,this.scrollEndEvent(),this.setupMobileMenuEvents(),this.listenToThemeSwitch()},t.prototype.setupMobileMenuEvents=function(){var e=this;this.mobileMenuToggle.addEventListener("click",(function(){return e.toggleMobileMenu(e.navMenu)}),!1),window.addEventListener("resize",(function(){window.innerWidth>=801&&(e.navMenu.style.display=null)}),!1)},t.prototype.toggleMobileMenu=function(e){window.innerWidth<=800&&"flex"===e.style.display?e.style.display="none":e.style.display="flex"},t.prototype.closeMobileMenu=function(e){window.innerWidth<=800&&(e.style.display="none")},t.prototype.scrollEndEvent=function(){var e=this;window.addEventListener("scroll",(function(){var t=e.previousScrollPosition,n=window.scrollY;n>500&&t<n?(e.style.translate="0 -70px",e.closeMobileMenu(e.navMenu)):e.style.translate="0 0",e.changeBackgroundColorOpacity(),e.previousScrollPosition=n}),!1)},t.prototype.changeBackgroundColorOpacity=function(){var e=window.scrollY>300?.99:.75,t=getComputedStyle(this).getPropertyValue("background-color").replace(/0?\.?\d+\)$/,"".concat(e.toString(),")"));this.style.backgroundColor=t},t.prototype.listenToThemeSwitch=function(){var e=this;window.addEventListener("themeSwitched",(function(){return e.style.removeProperty("background-color")}),!1)},t}(HTMLElement);t.PortfolioHeader=o;var r=function(e){function t(){var t=e.call(this)||this;return t.year=(new Date).getFullYear().toString(),t}return __extends(t,e),t.prototype.connectedCallback=function(){var e=document.createElement("p"),t=document.createTextNode(String.fromCharCode(169)+" ");e.appendChild(t);var n=document.createElement("time");n.setAttribute("id","footer-date"),n.setAttribute("datetime",this.year),n.appendChild(document.createTextNode(this.year)),e.appendChild(n),e.appendChild(document.createTextNode(" Adam A")),this.appendChild(e)},t}(HTMLElement);t.PortfolioFooter=r})),define("main",["require","exports","theme/theme","custom-elements/header-footer"],(function(e,t,n,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),(0,n.themeInit)().then((function(){customElements.define("portfolio-header",o.PortfolioHeader,{extends:"header"}),customElements.define("portfolio-footer",o.PortfolioFooter,{extends:"footer"})})).catch((function(e){return document.write(e)}))})),define("custom-elements/experience-card",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ExperienceCard=void 0;var n=function(e){function t(){var t=e.call(this)||this,n=document.getElementById("experience-card").content;return t.attachShadow({mode:"open"}).appendChild(n.cloneNode(!0)),t}return __extends(t,e),t}(HTMLElement);t.ExperienceCard=n})),define("pages/home",["require","exports","custom-elements/experience-card"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),customElements.define("experience-card",n.ExperienceCard)}));