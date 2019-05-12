/*
 * This module dynamically inserts the header and footer from their respective HTML files.
 * This allows the header and footer to be changed only once per file despite this being a front-end only application.
 * TODO: hide the rest of the page until everything is loaded.
 */
export default () => {
    const header = document.createElement('header');
    const footer = document.createElement('footer');
    const headerSrc = './src/html/header.html'
    const footerSrc = './src/html/footer.html'

    // Showing ES6 fetch with arrow functions to include the header.
    fetch(headerSrc)
    .then(response => response.text())
    .then(body => header.innerHTML = body)
    .catch(err => console.log(err));
    
    // Using a tradational XHR to load the footer.
    let footerReq = new XMLHttpRequest();
    footerReq.open('GET', footerSrc);
    footerReq.onload = function() {
        if (footerReq.status >= 200 && footerReq.status < 400 && footerReq.readyState === 4) {
            footer.innerHTML = footerReq.responseText;
        }
    }
    footerReq.send();
    
    const main = document.querySelector('#main');
    main.insertBefore(header, main.firstChild);
    main.appendChild(footer);
}