const createElementText = (elementName) => {
    return (text) => {
        const element = document.createElement(elementName);
        element.innerHTML = text;
        return element;
    };
};
const getHeaderFooter = async () => {
    const headerSrc = './dist/html/header.html';
    const footerSrc = './dist/html/footer.html';
    const setHeaderText = text => createElementText('header')(text);
    const setFooterText = text => createElementText('footer')(text);
    const getResponseText = response => response.text();
    const [header, footer] = await Promise.all([
        fetch(headerSrc).then(getResponseText).then(setHeaderText),
        fetch(footerSrc).then(getResponseText).then(setFooterText)
    ]);
    return { header, footer };
};
const insertHeaderFooter = (headerFooter) => {
    const body = document.querySelector('body');
    body.insertBefore(headerFooter.header, body.firstChild);
    body.appendChild(headerFooter.footer);
};
export default () => getHeaderFooter().then(insertHeaderFooter);
//# sourceMappingURL=header-footer.js.map