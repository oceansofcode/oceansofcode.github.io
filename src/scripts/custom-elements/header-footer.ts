/* eslint-disable immutable/no-mutation */
/* eslint-disable immutable/no-this */

import { getThemeFromPreference, themeSwitchEvent } from '../theme/theme.js';

export class PortfolioHeader extends HTMLElement {

    private mobileMenuToggle: HTMLElement;
    private navMenu: HTMLUListElement;

    // Fields to control scroll events
    private previousScrollPosition = window.scrollY;

    constructor() {
        super();
    }

    connectedCallback() {
        const navLinks: HTMLLIElement[] = [];

        // Mobile menu
        const mobileMenuToggle = document.createElement('i');
        mobileMenuToggle.setAttribute('id', 'mobile-menu-toggle');
        mobileMenuToggle.setAttribute('class', 'fas fa-bars'); // Hidden for now        
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

        const clients = this.createNavigiationItem('Clients', '/clients', '/#clients');

        navLinks.push(clients);

        /*
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
        */

        navLinks.forEach(navLink => navMenu.appendChild(navLink));

        // Theme switch button and event handling
        const themeSwitch = document.createElement('i');
        themeSwitch.setAttribute('id', 'theme-switch');
        themeSwitch.setAttribute('class', 'fas');
        this.appendChild(themeSwitch);

        themeSwitch.addEventListener('click', themeSwitchEvent(themeSwitch), false);
        themeSwitch.classList.add(getThemeFromPreference().switchIcon);

        this.previousScrollPosition = window.scrollY;
        this.handleScrollEvent();

        this.handleMobileMenuEvents();
        this.handleThemeSwitchEvent();

        // Get initial background color

        // Left for reference

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

    /**
     * Creates a navigation menu li item and link
     * 
     * anchor is the path that will show when hovering over the <a> elements
     * linkOverride is an optional parameter that will be the actual destination, useful for links on the same page to have a smooth scroll effect
     */
    private createNavigiationItem(name: string, anchorLink: string, linkOverride?: string): HTMLLIElement {
        const navItem = document.createElement('li');
        const itemLink = document.createElement('a');
        itemLink.setAttribute('href', anchorLink); 
        itemLink.appendChild(document.createTextNode(name));

        if (linkOverride) {
            itemLink.addEventListener('click', e => {
                e.preventDefault();

                // Allows for smooth scrolling if we are on the same page
                document.location.href = linkOverride;
            });
        }

        navItem.appendChild(itemLink);

        return navItem;
    }

    private handleMobileMenuEvents(): void {

        const resetMenu = () => {
            // eslint-disable-next-line immutable/no-mutation
            window.innerWidth >= 801 ? this.navMenu.style.display = null : undefined;
        };

        this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu(this.navMenu), false);
        window.addEventListener('resize', resetMenu, false);
    }

    private toggleMobileMenu(navMenu: HTMLUListElement): void {
        // eslint-disable-next-line immutable/no-mutation
        window.innerWidth <= 800 && navMenu.style.display === 'flex' ? navMenu.style.display = 'none' : navMenu.style.display = 'flex';
    }

    private closeMobileMenu(navMenu: HTMLUListElement): void {
        if (window.innerWidth <= 800) {
            navMenu.style.display = 'none';
        }
    }

    private handleScrollEvent(): void {

        const handleEvent = () => {
            const previousPosition = this.previousScrollPosition;
            const currentPosition = window.scrollY;

            // Visibility
            if (currentPosition > 500 && previousPosition < currentPosition) {
                this.style.translate = '0 -70px';
                this.closeMobileMenu(this.navMenu);
            } else {
                this.style.translate = '0 0';
            }

            this.changeBackgroundColorOpacity();

            this.previousScrollPosition = currentPosition;

        };

        window.addEventListener('scroll', handleEvent, false);
    }

    private changeBackgroundColorOpacity() {
        const opacity = window.scrollY > 300 ? 0.99 : 0.75;

        const currentColor = getComputedStyle(this).getPropertyValue('background-color');

        const newColor = currentColor.replace(/0?\.?\d+\)$/, `${opacity.toString()})`);

        this.style.backgroundColor = newColor;
    }

    private handleThemeSwitchEvent() {
        window.addEventListener('themeSwitched', () => this.style.removeProperty('background-color'), false);
    }
}

export class PortfolioFooter extends HTMLElement {
    year: string;

    constructor() {
        super();
        this.year = new Date().getFullYear().toString();
    }

    connectedCallback() {
        const callout = document.createElement('p');
        const copyright = document.createTextNode(String.fromCharCode(169) + ' ');

        const time = document.createElement('time');
        time.setAttribute('id', 'footer-date');
        time.setAttribute('datetime', this.year);
        time.appendChild(document.createTextNode(this.year));

        callout.appendChild(copyright);
        callout.appendChild(time);
        callout.appendChild(document.createTextNode(' Adam A'));

        const githubLink = this.createSocialLink('fa-github', 'https://github.com/oceansofcode');
        const linkedInLink = this.createSocialLink('fa-linkedin-in', 'https://www.linkedin.com/in/adam-a-085a31163');

        this.appendChild(linkedInLink);
        this.appendChild(callout);
        this.appendChild(githubLink);
    }

    private createSocialLink(fasClass: string, linkRef: string) {
        const link = document.createElement('a');
        link.setAttribute('href', linkRef);
        link.setAttribute('target', '_blank');
        const logo = document.createElement('i');
        logo.classList.add('fa-brands', 'link-icon', fasClass);

        link.appendChild(logo);

        return link;
    }
}
