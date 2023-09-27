import { getStoredTheme, themeSwitchEvent } from '../theme/theme-switch.js';
export class PortfolioHeader extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const mobileMenuToggle = document.createElement('i');
        mobileMenuToggle.setAttribute('id', 'mobile-menu-toggle');
        mobileMenuToggle.setAttribute('class', 'fas fa-bars');
        this.appendChild(mobileMenuToggle);
        const title = document.createElement('h1');
        title.setAttribute('id', 'title');
        const titleLink = document.createElement('a');
        titleLink.setAttribute('href', './');
        titleLink.appendChild(document.createTextNode('Oceans of Code'));
        title.appendChild(titleLink);
        this.appendChild(title);
        const nav = document.createElement('nav');
        this.appendChild(nav);
        const navMenu = document.createElement('ul');
        navMenu.setAttribute('id', 'nav-menu');
        nav.appendChild(navMenu);
        const webApps = document.createElement('li');
        webApps.setAttribute('class', 'drop-down-item');
        const webAppsLink = document.createElement('a');
        webAppsLink.setAttribute('href', './apps');
        webAppsLink.appendChild(document.createTextNode('Web Apps'));
        webApps.appendChild(webAppsLink);
        const webAppsList = document.createElement('ul');
        webApps.setAttribute('class', 'drop-down');
        webAppsList.setAttribute('class', 'drop-down');
        webApps.appendChild(webAppsList);
        const gpa = document.createElement('li');
        gpa.setAttribute('class', 'drop-down');
        const gpaLink = document.createElement('a');
        gpaLink.setAttribute('href', './apps/gpa');
        gpa.appendChild(gpaLink);
        const gpaSpan = document.createElement('span');
        gpaSpan.setAttribute('class', 'made-in');
        gpaSpan.appendChild(document.createTextNode('(Angular)'));
        gpaLink.appendChild(gpaSpan);
        const stocks = document.createElement('li');
        stocks.setAttribute('class', 'drop-down-item');
        const stocksLink = document.createElement('a');
        stocksLink.setAttribute('href', './apps/stocks');
        stocks.appendChild(stocksLink);
        const stocksSpan = document.createElement('span');
        stocksSpan.setAttribute('class', 'made-in');
        stocksSpan.appendChild(document.createTextNode('(React)'));
        stocksLink.appendChild(stocksSpan);
        const webAppListItems = [gpa, stocks];
        webAppListItems.forEach(webAppListItem => {
            webAppListItem.setAttribute('class', 'drop-down-item');
            webAppsList.appendChild(webAppListItem);
        });
        const webAssem = document.createElement('li');
        const webAssemLink = document.createElement('a');
        webAssemLink.appendChild(document.createTextNode('Web Assembly'));
        webAssemLink.setAttribute('href', './wasm');
        webAssem.appendChild(webAssemLink);
        const sand = document.createElement('li');
        const sandLink = document.createElement('a');
        sandLink.appendChild(document.createTextNode('Sandbox'));
        sandLink.setAttribute('href', './sandbox');
        sand.appendChild(sandLink);
        const navLinks = [webApps, webAssem, sand];
        navLinks.forEach(navLink => navMenu.appendChild(navLink));
        const themeSwitch = document.createElement('i');
        themeSwitch.setAttribute('id', 'theme-switch');
        themeSwitch.setAttribute('class', 'fas');
        this.appendChild(themeSwitch);
        themeSwitch.addEventListener('click', themeSwitchEvent(themeSwitch), false);
        themeSwitch.classList.add(getStoredTheme().switchIcon);
    }
}
export class PortfolioFooter extends HTMLElement {
    #year;
    constructor() {
        super();
        this.#year = new Date().getFullYear().toString();
    }
    connectedCallback() {
        const paragraph = document.createElement('p');
        const copyright = document.createTextNode(String.fromCharCode(169) + ' ');
        paragraph.appendChild(copyright);
        const time = document.createElement('time');
        time.setAttribute('id', 'footer-date');
        time.setAttribute('datetime', this.#year);
        time.appendChild(document.createTextNode(this.#year));
        paragraph.appendChild(time);
        paragraph.appendChild(document.createTextNode(' Adam A'));
        this.appendChild(paragraph);
    }
}
//# sourceMappingURL=header-footer.js.map