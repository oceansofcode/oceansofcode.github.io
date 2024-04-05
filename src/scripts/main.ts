import { themeInit } from './theme/theme.js';
import { PortfolioHeader, PortfolioFooter } from './custom-elements/header-footer.js';
import { lazyLoadImages } from './utils/lazy-loading.js';

themeInit().then(() => {
    customElements.define('portfolio-header', PortfolioHeader, { extends: 'header'});
    customElements.define('portfolio-footer', PortfolioFooter, { extends: 'footer'});
    lazyLoadImages();
}).catch(err => document.write(err));
