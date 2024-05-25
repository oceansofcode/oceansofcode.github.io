var __awaiter=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function a(e){try{s(o.next(e))}catch(e){i(e)}}function c(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((o=o.apply(e,t||[])).next())}))},__generator=this&&this.__generator||function(e,t){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(s){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(a=0)),a;)try{if(n=1,o&&(r=2&c[0]?o.return:c[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,c[1])).done)return r;switch(o=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,o=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){a.label=c[1];break}if(6===c[0]&&a.label<r[1]){a.label=r[1],r=c;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(c);break}r[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],o=0}finally{n=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},__extends=this&&this.__extends||function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)};return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),__values=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],o=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},__createBinding=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&__createBinding(t,e,n);return __setModuleDefault(t,e),t};define("constants",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={THEME_SWITCH_EVENT:"themeSwitched"}})),define("theme/interfaces/theme-enums",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})})),define("theme/interfaces/theme-switch-types",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})})),define("theme/theme",["require","exports","constants"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.themeInit=t.themeSwitchEvent=t.getCurrentTheme=t.getThemeFromPreference=void 0,n=__importDefault(n);var o,r={name:"light",switchIcon:"fa-moon",css:"light-theme-css",isLoaded:!1},i={name:"dark",switchIcon:"fa-sun",css:"dark-theme-css",isLoaded:!1},a="color-theme-in-transition",c=1500,s={newTheme:i,oldTheme:r},l={newTheme:r,oldTheme:i},u="hidden-image",d=window.matchMedia("(prefers-color-scheme: ".concat(r.name,")"));t.getThemeFromPreference=function(){return window.matchMedia("(prefers-color-scheme: ".concat(r.name,")")).matches?r:i};t.getCurrentTheme=function(){return(null==o?void 0:o.classList.contains(r.name))?r:(null==o?void 0:o.classList.contains(i.name))?i:null};t.themeSwitchEvent=function(e){var t=function(){o.classList.add(a),setTimeout((function(){return o.classList.remove(a)}),c)},n=function(t){return f(t,e)};return d.addEventListener("change",(function(e){t(),e.matches?n(l):n(s)})),function(){t(),o.classList.contains(i.name)?n(l):n(s)}};var f=function(e,t){var r=e.newTheme,i=e.oldTheme;r.isLoaded||h(r),o&&(o.classList.add(r.name),i&&o.classList.remove(i.name)),t&&(t.classList.add(r.switchIcon),i&&t.classList.remove(i.switchIcon)),document.querySelectorAll(".theme-background").forEach((function(e){e.classList.contains(r.name)&&e.classList.remove(u),i&&e.classList.contains(i.name)&&e.classList.add(u)}));var a=new CustomEvent(n.default.THEME_SWITCH_EVENT,{detail:e});window.dispatchEvent(a)},h=function(e){document.getElementById(e.css).removeAttribute("disabled"),e.isLoaded=!0};t.themeInit=function(){return __awaiter(void 0,void 0,void 0,(function(){var e;return __generator(this,(function(t){switch(t.label){case 0:return[4,(n=100,new Promise((function(e,t){var o=setInterval((function(){var r=document.querySelector("body");r?(e(r),clearInterval(o)):--n<0&&(t("Could not query select body element"),clearInterval(o))}),10)})))];case 1:return o=t.sent(),e=function(e){return f({newTheme:e},void 0)},d.matches?e(r):e(i),[2]}var n}))}))}})),define("custom-elements/header-footer",["require","exports","theme/theme","constants"],(function(e,t,n,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PortfolioFooter=t.PortfolioHeader=void 0,o=__importDefault(o);var r=function(e){function t(){var t=e.call(this)||this;return t.previousScrollPosition=window.scrollY,t}return __extends(t,e),t.prototype.connectedCallback=function(){var e=[],t=document.createElement("i");t.setAttribute("id","mobile-menu-toggle"),t.setAttribute("class","fas fa-bars"),this.mobileMenuToggle=t,this.appendChild(t);var o=document.createElement("h1");o.setAttribute("id","title");var r=document.createElement("a");r.setAttribute("href","/"),r.appendChild(document.createTextNode("Oceans of Code")),o.appendChild(r),this.appendChild(o);var i=document.createElement("nav");this.appendChild(i);var a=document.createElement("ul");a.setAttribute("id","nav-menu"),this.navMenu=a,i.appendChild(a);var c=this.createNavItem("Clients","/clients","/#clients");e.push(c),e.forEach((function(e){return a.appendChild(e)}));var s=document.createElement("i");s.setAttribute("id","theme-switch"),s.setAttribute("class","fas"),this.appendChild(s),s.addEventListener("click",(0,n.themeSwitchEvent)(s),!1),s.classList.add((0,n.getThemeFromPreference)().switchIcon),this.previousScrollPosition=window.scrollY,this.handleScrollEvent(),this.handleMobileMenuEvents(),this.handleThemeSwitchEvent()},t.prototype.createNavItem=function(e,t,n){var o=this,r=document.createElement("li"),i=document.createElement("a");return i.setAttribute("href",t),i.appendChild(document.createTextNode(e)),n&&i.addEventListener("click",(function(e){e.preventDefault(),o.closeMobileMenu(o.navMenu),document.location.href=n})),r.appendChild(i),r},t.prototype.handleMobileMenuEvents=function(){var e=this,t=function(){window.innerWidth>=801&&(e.navMenu.style.display=null)};this.mobileMenuToggle.addEventListener("click",(function(){return e.toggleMobileMenu(e.navMenu)}),!1),window.addEventListener("resize",t,!1),window.addEventListener("orientationChange",t,!1)},t.prototype.toggleMobileMenu=function(e){window.innerWidth<=t.mobileBreakpoint&&"flex"===e.style.display?e.style.display="none":e.style.display="flex"},t.prototype.closeMobileMenu=function(e){window.innerWidth<=t.mobileBreakpoint&&(e.style.display="none")},t.prototype.handleScrollEvent=function(){var e=this;window.addEventListener("scroll",(function(){var t=e.previousScrollPosition,n=window.scrollY;n>500&&t<n?(e.style.translate="0 -70px",e.closeMobileMenu(e.navMenu)):e.style.translate="0 0",e.changeBackgroundColorOpacity(),e.previousScrollPosition=n}),!1)},t.prototype.changeBackgroundColorOpacity=function(){var e=window.scrollY>300?.99:.75,t=getComputedStyle(this).getPropertyValue("background-color");this.style.backgroundColor=t.replace(/0?\.?\d+\)$/,"".concat(e.toString(),")"))},t.prototype.handleThemeSwitchEvent=function(){var e=this;window.addEventListener(o.default.THEME_SWITCH_EVENT,(function(){return e.style.removeProperty("background-color")}),!1)},t.mobileBreakpoint=800,t}(HTMLElement);t.PortfolioHeader=r;var i=function(e){function t(){var t=e.call(this)||this;return t.year=(new Date).getFullYear().toString(),t}return __extends(t,e),t.prototype.connectedCallback=function(){var e=this,t=document.createElement("p"),n=document.createTextNode(String.fromCharCode(169)+" "),o=document.createElement("time");o.setAttribute("id","footer-date"),o.setAttribute("datetime",this.year),o.appendChild(document.createTextNode(this.year)),t.appendChild(n),t.appendChild(o),t.appendChild(document.createTextNode(" Adam A"));var r=this.createSocialLink("Github","fa-github","https://github.com/oceansofcode"),i=this.createSocialLink("Linkedin","fa-linkedin-in","https://linkedin.com/in/adam-a-085a31163");[r,i].forEach((function(t){return e.appendChild(e.createDnsPrefetches(t))})),this.appendChild(i),this.appendChild(t),this.appendChild(r)},t.prototype.createSocialLink=function(e,t,n){var o=document.createElement("a");o.setAttribute("href",n),o.setAttribute("target","_blank"),o.setAttribute("title",e),o.setAttribute("aria-label","Link to my ".concat(e));var r=document.createElement("i");return r.classList.add("fa-brands","link-icon",t),o.appendChild(r),o},t.prototype.createDnsPrefetches=function(e){var t=e.getAttribute("href"),n=document.createElement("link"),o=new URL(t);return n.setAttribute("href",o.origin),n.setAttribute("rel","dns-prefetch"),n},t}(HTMLElement);t.PortfolioFooter=i})),define("utils/lazy-loading",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.lazyLoadImages=t.lazyLoadSections=t.hideLoadedContainer=t.showLoadedContainer=t.loadLazyContainer=void 0;t.loadLazyContainer=function(e){var t=e.querySelector(".lazy.container");t&&(t.classList.remove("lazy"),setTimeout((function(){t.classList.add("loaded")}),300))};t.showLoadedContainer=function(e){var t=e.querySelector(".container:not(.lazy, .loaded)");t&&t.classList.add("loaded")};t.hideLoadedContainer=function(e){var t=e.querySelector(".loaded.container");t&&t.classList.remove("loaded")};t.lazyLoadSections=function(e,n,o){var r,i;void 0===n&&(n="0px"),void 0===o&&(o=!1);var a=.1,c=.3,s=new IntersectionObserver((function(n,r){n.forEach((function(n){if(n.isIntersecting){var i=n.target,s=n.intersectionRatio,l=e.get(i);e.has(i)&&s>=c?l().then((function(){(0,t.loadLazyContainer)(i),o||r.unobserve(i),e.delete(i)})):o&&s<=a?(0,t.hideLoadedContainer)(i):o&&s>=c&&(0,t.showLoadedContainer)(i)}}))}),{root:null,rootMargin:n,threshold:o?[0,.2,.3,.4,.5]:.5});try{for(var l=__values(e.keys()),u=l.next();!u.done;u=l.next()){var d=u.value;s.observe(d)}}catch(e){r={error:e}}finally{try{u&&!u.done&&(i=l.return)&&i.call(l)}finally{if(r)throw r.error}}};t.lazyLoadImages=function(){var e=document.querySelectorAll("img.lazy");console.debug(e);var t=new IntersectionObserver((function(e,t){e.forEach((function(e){if(e.isIntersecting){var n=e.target;n.src=n.dataset.src,n.classList.remove("lazy"),t.unobserve(n)}}))}),{root:null,rootMargin:"0px",threshold:.2});e.forEach((function(e){return t.observe(e)}))}})),define("main",["require","exports","theme/theme","custom-elements/header-footer","utils/lazy-loading"],(function(e,t,n,o,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),(0,n.themeInit)().then((function(){var t=new Map;customElements.define("portfolio-header",o.PortfolioHeader,{extends:"header"}),t.set(document.querySelector("footer[is=portfolio-footer]"),(function(){return __awaiter(void 0,void 0,void 0,(function(){var t;return __generator(this,(function(n){switch(n.label){case 0:return[4,new Promise((function(t,n){e(["custom-elements/header-footer"],t,n)})).then(__importStar)];case 1:return t=n.sent().PortfolioFooter,customElements.define("portfolio-footer",t,{extends:"footer"}),[2]}}))}))})),(0,r.lazyLoadSections)(t,"50%")})).catch((function(e){return document.write(e)}))})),define("utils/shadow-fa",["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getFontAwesome=void 0;t.getFontAwesome=function(e){return __awaiter(void 0,void 0,void 0,(function(){return __generator(this,(function(t){return new Promise((function(e,t){var n=25,o=setInterval((function(){var r=document.querySelectorAll("style[id^=fa], script[src*=fontawesome]");r?(clearInterval(o),e(r)):--n<=0&&(clearInterval(o),t("Could not load font awesome"))}),200)})).then((function(t){return t.forEach((function(t){return e.appendChild(t.cloneNode(!0))}))})).catch(console.error),[2]}))}))}})),define("custom-elements/experience-card",["require","exports","utils/shadow-fa"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ExperienceCard=void 0;var o=function(e){function t(){var t=e.call(this)||this;return t.flipped=!1,t}return __extends(t,e),t.prototype.connectedCallback=function(){var e=this,t=document.getElementById("experience-card").content,o=this.attachShadow({mode:"open"});o.appendChild(t.cloneNode(!0)),this.container=o.querySelector(".container"),o.querySelectorAll("details").forEach((function(e){return e.onclick=function(e){return e.preventDefault()}})),o.querySelectorAll("button.flip-card").forEach((function(t){return t.addEventListener("click",e.flipCard.bind(e))})),this.duplicateClientTitle(),this.handleExternalLink(),(0,n.getFontAwesome)(o).finally()},t.prototype.duplicateClientTitle=function(){var e=this;[this.shadowRoot.querySelector("slot[name=title]"),this.shadowRoot.querySelector("slot[name=client]")].forEach((function(t){var n=t.assignedNodes(),o=e.shadowRoot.querySelector(".duplicate-".concat(t.name));o.textContent="",n.forEach((function(e){return o.appendChild(e.cloneNode(!0))}))}))},t.prototype.handleExternalLink=function(){var e=this.shadowRoot.querySelector("slot[name=external-project-site]"),t=document.createElement("i");t.classList.add("fa-solid","fa-arrow-up-right-from-square");var n=function(e){e.insertAdjacentHTML("beforeend","&nbsp"),e.insertAdjacentHTML("beforeend","&nbsp"),e.appendChild(t)};(null==e?void 0:e.assignedNodes().length)?e.assignedElements().forEach(n):n(e.querySelector("a"))},t.prototype.flipCard=function(){this.flipped?(this.container.classList.remove("is-flipped"),this.flipped=!1):(this.container.classList.add("is-flipped"),this.flipped=!0)},t}(HTMLElement);t.ExperienceCard=o})),define("pages/home",["require","exports","utils/lazy-loading"],(function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=document.getElementById("welcome-callout"),r=document.getElementById("clients"),i=new Map;function a(){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(n){switch(n.label){case 0:return[4,new Promise((function(t,n){e(["custom-elements/experience-card"],t,n)})).then(__importStar)];case 1:return t=n.sent().ExperienceCard,customElements.define("experience-card",t),[2]}}))}))}!function(){__awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){return function(){return __awaiter(this,void 0,void 0,(function(){var e,t;return __generator(this,(function(n){return e=[{translate:"-50% -50%",opacity:0}],t={fill:"forwards"},[2,o.animate(e,t).finished.then((function(e){return e.commitStyles()}))]}))}))}().then((function(){var e,t,n,r;e=[{transform:"translateY(7vh)",opacity:0},{opacity:1}],t={duration:2e3,fill:"forwards",easing:"ease-in-out"},o.animate(e,t).finished.then((function(e){return e.commitStyles()})),n=2.2,r={fill:"forwards"},window.addEventListener("scroll",(function(){var e=window.scrollY,t=[{transform:"translateY(".concat(e/n,"px)"),opacity:"".concat(1-Math.max(e/window.innerHeight,0))}];o.animate(t,r)}))})),i.set(r,a),(0,n.lazyLoadSections)(i,"0px",!1),[2]}))}))}()}));