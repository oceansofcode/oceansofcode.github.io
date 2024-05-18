/* eslint-disable immutable/no-mutation */
import { getFontAwesome } from '../utils/shadow-fa.js';

/* eslint-disable immutable/no-this */
export class ExperienceCard extends HTMLElement {

    private flipped = false;
    private container: HTMLElement;

    constructor() {
        super();        
    }

    connectedCallback() {
        const template = document.getElementById('experience-card') as HTMLTemplateElement;
        const templateContent = template.content;
        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.appendChild(templateContent.cloneNode(true));

        this.container = shadowRoot.querySelector('.container');

        getFontAwesome(shadowRoot).then();

        // We always want our details tab open
        shadowRoot.querySelectorAll('details').forEach(detail => detail.onclick = e => e.preventDefault());
        this.onclick = this.flipCard;
    }

    private flipCard() {
        if (this.flipped) {
            this.container.classList.remove('is-flipped');
            this.flipped = false;
        } else {
            this.container.classList.add('is-flipped');
            this.flipped = true;
        }
    }
}