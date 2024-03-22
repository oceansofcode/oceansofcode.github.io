/* eslint-disable immutable/no-this */
export class ExperienceCard extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' }); 
    }
}