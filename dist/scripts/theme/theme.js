const e={name:"light",switchIcon:"fa-moon",css:"light-theme-css",isLoaded:!1},s={name:"dark",switchIcon:"fa-sun",css:"dark-theme-css",isLoaded:!1},t="color-theme-in-transition",n=1500,c={newTheme:s,oldTheme:e},a={newTheme:e,oldTheme:s},o="hidden-image";let i;export const getThemeFromPreference=()=>window.matchMedia(`(prefers-color-scheme: ${e.name})`).matches?e:s;export const getCurrentTheme=()=>i?.classList.contains(e.name)?e:i?.classList.contains(s.name)?s:null;export const themeSwitchEvent=s=>{i.classList.contains(e.name);const o=()=>m(c,s),r=()=>m(a,s);return window.matchMedia(`(prefers-color-scheme: ${e.name})`).addEventListener("change",(e=>e.matches?r():o())),()=>{i.classList.add(t),setTimeout((()=>i.classList.remove(t)),n),i.classList.contains(e.name)?o():r()}};const m=(e,s)=>{const{newTheme:t,oldTheme:n}=e;t.isLoaded||r(t),i&&(i.classList.add(t.name),n&&i.classList.remove(n.name)),s&&(s.classList.add(t.switchIcon),n&&s.classList.remove(n.switchIcon));document.querySelectorAll(".intro-background").forEach((e=>{e.classList.contains(t.name)&&e.classList.remove(o),n&&e.classList.contains(n.name)&&e.classList.add(o)}));const c=new CustomEvent("themeSwitch",{detail:e});window.dispatchEvent(c)},r=e=>{document.getElementById(e.css).removeAttribute("disabled"),e.isLoaded=!0};export const themeInit=async()=>{i=await(()=>{let e=100;return new Promise(((s,t)=>{const n=setInterval((()=>{const c=document.querySelector("body");c?(s(c),clearInterval(n)):(e--,e<0&&(t("Could not query select body element"),clearInterval(n)))}),10)}))})();const t=e=>m({newTheme:e},void 0);window.matchMedia(`(prefers-color-scheme: ${e.name})`).matches?t(e):t(s)};
//# sourceMappingURL=theme.js.map