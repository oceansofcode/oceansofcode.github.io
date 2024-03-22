import { themeInit } from './theme/theme.js';
import { PortfolioHeader, PortfolioFooter } from './custom-elements/header-footer.js';

themeInit().then(() => {
    customElements.define('portfolio-header', PortfolioHeader, { extends: 'header'});
    customElements.define('portfolio-footer', PortfolioFooter, { extends: 'footer'});
}).catch(err => document.write(err));
