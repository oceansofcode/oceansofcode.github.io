import { themeInit } from './theme/theme.js';
import { PortfolioHeader, PortfolioFooter } from './custom-elements/header-footer.js';

themeInit().then(() => {
    customElements.define('portfolio-header', PortfolioHeader);
    customElements.define('portfolio-footer', PortfolioFooter);
}).catch(err => document.write(err));
