export default function () {
    const header = document.createElement('header');
    const footer = document.createElement('footer');
    // Showing ES6 fetch with arrow functions to include the header.
    fetch('./src/html/header.html').then(response => response.text()).then(body => header.innerHTML = body).catch(err => console.log(err));
    // Using a tradational XHR to load the footer.
    let footerReq = new XMLHttpRequest();
    footerReq.open('GET', './src/html/footer.html');
    footerReq.onload = function () {
        if (footerReq.status >= 200 && footerReq.status < 400 && footerReq.readyState === 4) {
            footer.innerHTML = footerReq.responseText;
        }
    };
    footerReq.send();
    onload = () => {
        const body = document.querySelector('body');
        body.parentElement.insertBefore(header, body);
        body.parentElement.appendChild(footer);
    };
}
