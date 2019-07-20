import { getHeaderFooter, insertHeaderFooter } from './header-footer.js';
import showBody from './showBody.js';
import enableThemeToggle from './theme-toggle.js';

/** 
 * Initializes the page by retrieving the header and footer, inserting them, and then finally makes the page visible.
*/
(async function init() {
    const headerFooter: {header: HTMLElement; footer: HTMLElement} = await getHeaderFooter();
    insertHeaderFooter(headerFooter.header, headerFooter.footer);
    enableThemeToggle();
    showBody();
})();

