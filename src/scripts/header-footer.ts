/**
 * Creates a header and footer element and injects fetched html into them.
 * @returns a promise that will return an object consisting of a header and footer.
 */
export const getHeaderFooter = async (): Promise<{header: HTMLElement; footer: HTMLElement}> => {
    const header: HTMLElement = document.createElement('header');
    const footer: HTMLElement = document.createElement('footer');
    const headerSrc = './src/html/header.html';
    const footerSrc = './src/html/footer.html';
    
    // Performance gain by having the header and footer html promises executing in 'paralell'.
    await Promise.all([
        fetch(headerSrc).then(headerRes => headerRes.text()).then(headerText => header.innerHTML = headerText),
        fetch(footerSrc).then(footerRes => footerRes.text()).then(footerText => footer.innerHTML = footerText)
    ]);
    
    return {header, footer};
};

/**
 * Inserts a header and footer. Parameters are taken separately so that the caller
 * does not accidentially insert them into the wrong location in the DOM.
 * @param {HTMLElement} header
 * @param {HTMLElement} footer
 */
export const insertHeaderFooter = (header: HTMLElement, footer: HTMLElement): void => {
    const main: HTMLElement = document.querySelector('#main');
    main.insertBefore(header, main.firstChild);
    main.appendChild(footer);
};