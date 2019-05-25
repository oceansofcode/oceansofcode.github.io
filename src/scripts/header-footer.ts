/*
 * This module dynamically inserts the header and footer from their respective HTML files.
 * This allows the header and footer to be changed only once per file despite this being a front-end only application.
 * TODO: hide the rest of the page until everything is loaded and move footer out of main.
 */
import themeToggle from './theme-toggle.js';
export default async () => {
    const body = document.querySelector('body');
    const header = document.createElement('header');
    const footer = document.createElement('footer');
    const headerSrc = './src/html/header.html'
    const footerSrc = './src/html/footer.html'

    // Showing ES6 fetch with async to include the header.
    let headerRes = await fetch(headerSrc);
    let headerBody = await headerRes.text();
    header.innerHTML = headerBody;

    let footerRes = await fetch(footerSrc);
    let footerBody = await footerRes.text();
    footer.innerHTML = footerBody;
    
    const main = document.querySelector('#main');
    main.parentNode.insertBefore(header, main);
    main.appendChild(footer);

    // TODO Refactor this into it's own promise.
    body.style.visibility = "visible";
    body.style.opacity = "1";
    themeToggle();
}