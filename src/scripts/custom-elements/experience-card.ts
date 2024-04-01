/* eslint-disable immutable/no-mutation */
/* eslint-disable immutable/no-this */
export class ExperienceCard extends HTMLElement {
    constructor() {
        super();        
    }

    connectedCallback() {
        const template = document.getElementById('experience-card') as HTMLTemplateElement;
        const templateContent = template.content;
        const shadowRoot = this.attachShadow({ mode: 'open'});

        shadowRoot.appendChild(templateContent.cloneNode(true));

        const button: HTMLButtonElement = shadowRoot.querySelector('.flip');

        button.onclick = () => {
            this.style.transform = 'rotateY(180deg';
        };
    }
}