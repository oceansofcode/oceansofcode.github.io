import { themeInit } from './theme/theme-switch.js';
import { PortfolioHeader, PortfolioFooter } from './init/header-footer.js';
import addMenuToggle from './init/mobile-menu.js';
themeInit();
customElements.define('portfolio-header', PortfolioHeader, { extends: 'header' });
customElements.define('portfolio-footer', PortfolioFooter, { extends: 'footer' });
addMenuToggle();
//# sourceMappingURL=main.js.map