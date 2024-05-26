/* eslint-disable immutable/no-mutation */
/* eslint-disable immutable/no-this */

import { setCustomElementThemeClass } from '../theme/theme.js';

export class TechnologyCard extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});

        const template= document.getElementById('technology-card') as HTMLTemplateElement;
        shadowRoot.appendChild(template.content.cloneNode(true));

        setCustomElementThemeClass(this);
    }

}