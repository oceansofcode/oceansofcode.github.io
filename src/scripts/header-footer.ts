/*
 * This module dynamically inserts the header and footer from their respective HTML files.
 * This allows the header and footer to be changed only once per file despite this being a front-end only application.
 */

/*
 * Creates a header and footer element, and then asynchronously retrieves their data and inserts
 * the data into them. Returns the header and footer as an object.
 */
export var getHeaderFooter = async () => {
    const header: HTMLElement = document.createElement('header');
    const footer: HTMLElement = document.createElement('footer');
    const headerSrc: string = './src/html/header.html'
    const footerSrc: string = './src/html/footer.html'

    await Promise.all([
        fetch(headerSrc).then(headerRes => headerRes.text()).then(headerText => header.innerHTML = headerText),
        fetch(footerSrc).then(footerRes => footerRes.text()).then(footerText => footer.innerHTML = footerText),
    ]);
    
    return {header, footer};
}

/*
 * Inserts a header and footer element inside the body before the main container.
 */
export function insertHeaderFooter(header: HTMLElement, footer: HTMLElement) {
    const main: HTMLElement = document.querySelector('#main');

    main.parentNode.insertBefore(header, main);
    main.appendChild(footer);
}