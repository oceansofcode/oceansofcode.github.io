import { themeInit } from './theme/theme-switch.js';
import { PortfolioHeader, PortfolioFooter } from './custom-elements/header-footer.js';

themeInit();

customElements.define('portfolio-header', PortfolioHeader, { extends: 'header'});
customElements.define('portfolio-footer', PortfolioFooter, { extends: 'footer'});
