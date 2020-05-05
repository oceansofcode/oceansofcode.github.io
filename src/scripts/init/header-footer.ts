interface HeaderFooter {
    header: HTMLElement;
    footer: HTMLElement;
}

const createElementText = (elementName: string) => {
    return (text: string): HTMLElement => {
        const element = document.createElement(elementName);
        element.innerHTML = text;
        return element;
    };
};

const getHeaderFooter = async (): Promise<HeaderFooter> => {
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

const insertHeaderFooter = (headerFooter: HeaderFooter) => {
    const main: HTMLElement = document.querySelector('#main');

    main.insertBefore(headerFooter.header, main.firstChild);
    main.appendChild(headerFooter.footer);
};

export default () => getHeaderFooter().then(insertHeaderFooter);