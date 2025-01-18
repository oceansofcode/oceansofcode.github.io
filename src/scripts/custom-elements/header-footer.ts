/* eslint-disable immutable/no-mutation */
/* eslint-disable immutable/no-this */

import { getThemeFromPreference, themeSwitchEvent } from '../theme/theme.js';
import Constants from '../constants.js';
import { createDNSPrefetch } from '../utils/links.js';

export class PortfolioHeader extends HTMLElement {
    
    private static mobileBreakpoint = 800;

    private mobileMenuToggle: HTMLElement;
    private navMenu: HTMLUListElement;

    // Fields to control scroll events
    private previousScrollPosition = window.scrollY;
    private linkClicked: boolean;

    constructor() {
        super();
    }

    connectedCallback() {
        const navLinks: HTMLLIElement[] = [];

        // Mobile menu
        const mobileMenuToggle = document.createElement('i');
        mobileMenuToggle.setAttribute('id', 'mobile-menu-toggle');
        mobileMenuToggle.setAttribute('class', 'fas fa-bars');    
        this.mobileMenuToggle = mobileMenuToggle;
        this.appendChild(mobileMenuToggle);

        // Title
        const title = document.createElement('h1');
        title.setAttribute('id', 'title');
        const titleLink = document.createElement('a');
        titleLink.setAttribute('href', '/');
        titleLink.setAttribute('aria-label', 'Portfolio title');
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

        // CREATE LINKS HERE
        navLinks.push(this.createNavItem('Clients', '/clients', '/#clients'));
        navLinks.push(this.createNavItem('Volkswagen', '/volkswagen'));
        navLinks.push(this.createNavItem('Technologies', '/technologies', '/#technologies'));

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
    private createNavItem(name: string, anchorLink: string, linkOverride?: string): HTMLLIElement {
        const navItem = document.createElement('li');
        const itemLink = document.createElement('a');
        itemLink.setAttribute('aria-label', `${name} section`);
        itemLink.setAttribute('href', anchorLink); 
        itemLink.appendChild(document.createTextNode(name));

        if (linkOverride) {
            itemLink.addEventListener('click', e => {
                e.preventDefault();
                this.closeMobileMenu(this.navMenu);

                // Allows for smooth scrolling if we are on the same page
                document.location.href = linkOverride;
                this.linkClicked = true;

                setTimeout(() => this.linkClicked = false, 1000);
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
        window.addEventListener('orientationChange', resetMenu, false);
    }

    private toggleMobileMenu(navMenu: HTMLUListElement): void {
        // eslint-disable-next-line immutable/no-mutation
        window.innerWidth <= PortfolioHeader.mobileBreakpoint && navMenu.style.display === 'flex' ? navMenu.style.display = 'none' : navMenu.style.display = 'flex';
    }

    private closeMobileMenu(navMenu: HTMLUListElement): void {
        if (window.innerWidth <= PortfolioHeader.mobileBreakpoint) {
            navMenu.style.display = 'none';
        }
    }

    // TODO: Change to use CSSOM
    private handleScrollEvent(): void {

        const handleEvent = () => {
            const previousPosition = this.previousScrollPosition;
            const currentPosition = window.scrollY;

            // Visibility
            if (!this.linkClicked && currentPosition > 500 && previousPosition < currentPosition) {
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

    // TODO: Change to use CSSOM
    private changeBackgroundColorOpacity() {
        const opacity = window.scrollY > 300 ? 0.99 : 0.75;

        const currentColor = getComputedStyle(this).getPropertyValue('background-color');

        this.style.backgroundColor = currentColor.replace(/0?\.?\d+\)$/, `${opacity.toString()})`);
    }

    private handleThemeSwitchEvent() {
        window.addEventListener(Constants.THEME_SWITCH_EVENT, () => this.style.removeProperty('background-color'), false);
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

        const githubLink = this.createSocialLink('Github', 'fa-github', 'https://github.com/oceansofcode');
        const linkedInLink = this.createSocialLink('Linkedin', 'fa-linkedin-in', 'https://linkedin.com/in/adam-a-085a31163');

        const anchors = [githubLink, linkedInLink];

        anchors.forEach(anchor => this.appendChild(createDNSPrefetch(anchor)));

        this.appendChild(linkedInLink);
        this.appendChild(callout);
        this.appendChild(githubLink);
    }

    private createSocialLink(title: string, fasClass: string, linkRef: string): HTMLAnchorElement {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', linkRef);
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('title', title);
        anchor.setAttribute('aria-label', `Link to my ${title}`);

        const logo = document.createElement('i');
        logo.classList.add('fa-brands', 'link-icon', fasClass);

        anchor.appendChild(logo);

        return anchor;
    }
}
