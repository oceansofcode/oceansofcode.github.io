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

    // Since links are slotted in we need to handle them in order to avoid duplicate code
    private handleExternalLink() {

        const slotSelector = 'slot[name=external-project-site]';

        const externalSiteSlot: HTMLSlotElement = this.shadowRoot.querySelector(slotSelector);

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-arrow-up-right-from-square');

        const insertIcon = (a: HTMLAnchorElement) => {
            a.insertAdjacentHTML('beforeend', '&nbsp');
            a.insertAdjacentHTML('beforeend', '&nbsp');
            a.appendChild(icon);
        };

        // Dynamically insert the font awesome external link icon to both slotted <a> and the placeholder <a>
        if (externalSiteSlot?.assignedNodes().length) {
            externalSiteSlot.assignedElements().filter(a => a instanceof HTMLAnchorElement).forEach((a: HTMLAnchorElement) => {
                a.classList.add('button');
                a.setAttribute('target', '_blank');
                insertIcon(a);
            });
        } else {
          insertIcon(externalSiteSlot.querySelector('a'));
        }

        // externalButton.addEventListener('click', e => e.preventDefault());
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