import{getFontAwesome as e}from"../utils/shadow-fa.js";export class ExperienceCard extends HTMLElement{flipped=!1;container;constructor(){super()}connectedCallback(){const t=document.getElementById("experience-card").content,i=this.attachShadow({mode:"open"});i.appendChild(t.cloneNode(!0)),this.container=i.querySelector(".container"),i.querySelectorAll("details").forEach((e=>e.onclick=e=>e.preventDefault())),i.querySelectorAll("button.flip-card").forEach((e=>e.addEventListener("click",this.flipCard.bind(this)))),this.duplicateClientTitle(),this.handleExternalLink(),e(i).finally()}duplicateClientTitle(){[this.shadowRoot.querySelector("slot[name=title]"),this.shadowRoot.querySelector("slot[name=client]")].forEach((e=>{const t=e.assignedNodes(),i=this.shadowRoot.querySelector(`.duplicate-${e.name}`);i.textContent="",t.forEach((e=>i.appendChild(e.cloneNode(!0))))}))}handleExternalLink(){const e="slot[name=external-project-site]",t=this.shadowRoot.querySelector(e),i=this.shadowRoot.querySelector(`button:has(${e})`);t?.assignedNodes().length&&i.classList.remove("inactive"),i.addEventListener("click",(e=>e.preventDefault()))}flipCard(){this.flipped?(this.container.classList.remove("is-flipped"),this.flipped=!1):(this.container.classList.add("is-flipped"),this.flipped=!0)}}
//# sourceMappingURL=experience-card.js.map