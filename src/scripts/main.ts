import { themeInit } from './theme/theme.js';
import { PortfolioHeader } from './custom-elements/header-footer.js';
import { lazyLoadSections } from './utils/lazy-loading.js';

themeInit().then(() => {

    const pageLoadMap = new Map<Element, () => Promise<void>>;

    customElements.define('portfolio-header', PortfolioHeader, { extends: 'header'});

    pageLoadMap.set(document.querySelector('footer[is=portfolio-footer]'), async () => {
        const { PortfolioFooter } = await import('./custom-elements/header-footer.js');
        customElements.define('portfolio-footer', PortfolioFooter, { extends: 'footer'});
    });

    lazyLoadSections(pageLoadMap, '50%');
}).catch(err => document.write(err));
