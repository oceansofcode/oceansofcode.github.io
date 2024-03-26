/* eslint-disable immutable/no-mutation */
/* eslint-disable immutable/no-this */

import { getThemeFromPreference, themeSwitchEvent } from '../theme/theme.js';

export class PortfolioHeader extends HTMLElement {

    private mobileMenuToggle: HTMLElement;
    private navMenu: HTMLUListElement;

    constructor() {
        super();
    }

    connectedCallback() {
        // Mobile menu
        const mobileMenuToggle = document.createElement('i');
        mobileMenuToggle.setAttribute('id', 'mobile-menu-toggle');
        mobileMenuToggle.setAttribute('class', 'fas fa-bars hidden'); // Hidden for now        
        this.mobileMenuToggle = mobileMenuToggle;
        this.appendChild(mobileMenuToggle);

        // Title
        const title = document.createElement('h1');
        title.setAttribute('id', 'title');
        const titleLink = document.createElement('a');
        titleLink.setAttribute('href', '/');
        titleLink.appendChild(document.createTextNode('Oceans of Code'));
        title.appendChild(titleLink);
        this.appendChild(title);

        // Nav
        const nav = document.createElement('nav');
        this.appendChild(nav);

        // Nav Menu
        const navMenu = document.createElement('ul');
        navMenu.setAttribute('id', 'nav-menu');
        this.navMenu = navMenu;
        nav.appendChild(navMenu);

        // Web Apps
        const webApps = document.createElement('li');
        webApps.setAttribute('class', 'drop-down-item');
        const webAppsLink = document.createElement('a');
        webAppsLink.setAttribute('href', './apps');
        webAppsLink.appendChild(document.createTextNode('Web Apps'));
        webApps.appendChild(webAppsLink);

        // Web Apps List
        const webAppsList = document.createElement('ul');
        webApps.setAttribute('class', 'drop-down');
        webAppsList.setAttribute('class', 'drop-down');
        webApps.appendChild(webAppsList);
        
        // Gpa
        const gpa = document.createElement('li');
        gpa.setAttribute('class', 'drop-down');
        const gpaLink = document.createElement('a');
        gpaLink.setAttribute('href', './apps/gpa');
        gpa.appendChild(gpaLink);
        const gpaSpan = document.createElement('span');
        gpaSpan.setAttribute('class', 'made-in');
        gpaSpan.appendChild(document.createTextNode('(Angular)'));
        gpaLink.appendChild(gpaSpan);
        
        // Stocks
        const stocks = document.createElement('li');
        stocks.setAttribute('class', 'drop-down-item');
        const stocksLink = document.createElement('a');
        stocksLink.setAttribute('href', './apps/stocks');
        stocks.appendChild(stocksLink);
        const stocksSpan = document.createElement('span');
        stocksSpan.setAttribute('class', 'made-in');
        stocksSpan.appendChild(document.createTextNode('(React)'));
        stocksLink.appendChild(stocksSpan);
        
        // Append web app list items
        const webAppListItems: HTMLLIElement[] = [gpa, stocks];

        webAppListItems.forEach(webAppListItem => {
            webAppListItem.setAttribute('class', 'drop-down-item');
            webAppsList.appendChild(webAppListItem);
        });

        // Web assembly Link
        const webAssem = document.createElement('li');
        const webAssemLink = document.createElement('a');
        webAssemLink.appendChild(document.createTextNode('Web Assembly'));
        webAssemLink.setAttribute('href', './wasm');
        webAssem.appendChild(webAssemLink);

        // Sandbox link
        const sand = document.createElement('li');
        const sandLink = document.createElement('a');
        sandLink.appendChild(document.createTextNode('Sandbox'));
        sandLink.setAttribute('href', './sandbox');
        sand.appendChild(sandLink);

        const navLinks: HTMLLIElement[] = [webApps, webAssem, sand];
        navLinks.forEach(navLink => navMenu.appendChild(navLink));

        // Theme switch button and event handling
        const themeSwitch = document.createElement('i');
        themeSwitch.setAttribute('id', 'theme-switch');
        themeSwitch.setAttribute('class', 'fas');
        this.appendChild(themeSwitch);

        themeSwitch.addEventListener('click', themeSwitchEvent(themeSwitch), false);
        themeSwitch.classList.add(getThemeFromPreference().switchIcon);

        this.changeOnScroll();
        this.setupMobileMenuEvents();
        /*this.innerHTML = `
            <i id="mobile-menu-toggle" class="fas fa-bars"></i>
            <h1 id="title"><a href="./">Oceans of Code</a></h1>
            <nav>
                <ul id="nav-menu">
                    <li class="drop-down"><a href="./apps">Web Apps</a>
                        <ul class="drop-down">
                            <li class="drop-down-item"><a href="./apps/stocks">GPA Calculator <span
                                        class="made-in">(Angular)</span></a></li>
                            <li class="drop-down-item"><a href="./apps/gpa">Stocks <span class="made-in">(React)</span></a></li>
                        </ul>
                    </li>
                    <li><a href="./wasm">Web Assembly</a></li>
                    <li><a href="./sandbox">Sandbox</a></li>
                </ul>
            </nav>
            <i id="theme-switch" class="fas"></i>
        `;
        */
    }

    private setupMobileMenuEvents() {
        const toggleMenu = () => {
            // eslint-disable-next-line immutable/no-mutation
            this.navMenu.style.display === 'flex' ? this.navMenu.style.display = 'none' : this.navMenu.style.display = 'flex';
        };

        const resetMenu = () => {
            // eslint-disable-next-line immutable/no-mutation
            window.innerWidth >= 800 ? this.navMenu.style.display = null : undefined;
        };

        this.mobileMenuToggle.addEventListener('click', toggleMenu, false);
        window.addEventListener('resize', resetMenu, false);
    }

    private changeOnScroll() {
        window.addEventListener('scroll', () => this.setVisibility(), false);
    }

    private setVisibility() {
        if (window.scrollY > 350) {
            this.style.opacity = '0';
            this.style.translate = '0 -70px';
        } else {
            this.style.opacity = '0.75';
            this.style.translate = '0 0';
        }
        console.log(getComputedStyle(this).getPropertyValue('background-color'));
    }

}

export class PortfolioFooter extends HTMLElement {
    year: string;

    constructor() {
        super();
        this.year = new Date().getFullYear().toString();
    }

    connectedCallback() {
        const paragraph = document.createElement('p');
        const copyright = document.createTextNode(String.fromCharCode(169) + ' ');

        paragraph.appendChild(copyright);

        const time = document.createElement('time');
        time.setAttribute('id', 'footer-date');
        time.setAttribute('datetime', this.year);
        time.appendChild(document.createTextNode(this.year));

        paragraph.appendChild(time);
        paragraph.appendChild(document.createTextNode(' Adam A'));

        this.appendChild(paragraph);
    }
}
