/* eslint-disable immutable/no-mutation */
/* eslint-disable immutable/no-this */
export class ExperienceCard extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById('experience-card') as HTMLTemplateElement;
        const templateContent = template.content;
        const shadowRoot = this.attachShadow({ mode: 'open'});
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}