/* eslint-disable immutable/no-this */
export class ExperienceCard extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById('experience-card') as HTMLTemplateElement;
        const templateContent = template.content;
        console.log(templateContent);
        
        const shadowRoot = this.attachShadow({ mode: 'open'});

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('type', 'text/css');
        linkElem.setAttribute('href', 'dist/styles/pages/components/experience-card.css');

        shadowRoot.appendChild(linkElem);
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}