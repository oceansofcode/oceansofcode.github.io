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
        const shadowRoot = this.attachShadow({ mode: 'open'});

        shadowRoot.appendChild(templateContent.cloneNode(true));

        this.container = shadowRoot.querySelector('.container');

        // We always want our details tab open
        shadowRoot.querySelectorAll('details').forEach(detail => detail.onclick = e => e.preventDefault());
        shadowRoot.querySelectorAll('button.flip-card').forEach(button => button.addEventListener('click', this.flipCard.bind(this)));

        this.duplicateClientTitle();
        this.handleExternalLink();

        getFontAwesome(shadowRoot).finally();
    }

    private duplicateClientTitle() {
        const title: HTMLSlotElement = this.shadowRoot.querySelector('slot[name=title]');
        const client: HTMLSlotElement = this.shadowRoot.querySelector('slot[name=client]');

        const duplicateSlotContent = (slot: HTMLSlotElement) => {
            const nodes = slot.assignedNodes();
            const duplicateSlot = this.shadowRoot.querySelector(`.duplicate-${slot.name}`);
            duplicateSlot.textContent = '';

            nodes.forEach(node => duplicateSlot.appendChild(node.cloneNode(true)));
        };

        [title, client].forEach(duplicateSlotContent);
    }

    private handleExternalLink() {

        const slotSelector = 'slot[name=external-project-site]';

        const externalSiteSlot: HTMLSlotElement = this.shadowRoot.querySelector(slotSelector);
        const externalButton = this.shadowRoot.querySelector(`button:has(${slotSelector})`);

        if (externalSiteSlot?.assignedNodes().length) {
            externalButton.classList.remove('inactive');
        }

        externalButton.addEventListener('click', e => e.preventDefault());
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