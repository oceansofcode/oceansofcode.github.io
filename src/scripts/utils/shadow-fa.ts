export const getFontAwesome = async (shadowRoot: ShadowRoot): Promise<void> => {
    new Promise<NodeList>((resolve, reject) => {
        // eslint-disable-next-line immutable/no-let
        let attempts = 25;
        const interval = setInterval(() => {
            const fontAwesome = document.querySelectorAll('style[id^=fa], script[src*=fontawesome]');

            if (fontAwesome) {
                clearInterval(interval);
                resolve(fontAwesome);
            } else {
                if (--attempts <= 0) {
                    clearInterval(interval);
                    reject('Could not load font awesome');
                }
            }
        }, 200);
    }).then(nodeList => nodeList.forEach(node => shadowRoot.appendChild(node.cloneNode(true))))
    .catch(console.error);
};