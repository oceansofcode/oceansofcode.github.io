/*
 * Main module that is to be loaded at the beginning of every page.
 */
import { getHeaderFooter, insertHeaderFooter } from './header-footer.js';
import themeToggle from './features/theme-toggle.js';

/** 
 * Initializes the page by retrieving the header and footer, inserting them, and then finally making the page visible.
*/
(async function init() {
    const headerFooter: {header: HTMLElement, footer: HTMLElement} = await getHeaderFooter();

    insertHeaderFooter(headerFooter.header, headerFooter.footer);
    themeToggle();

    showBody();
})();

/*
    * The body is initially not visible with an opacity of 0.
    * This function sets how the transition will occur before
    * making it occur
    */
function showBody() {
    const body: HTMLElement = document.querySelector('body');
    const bodyFadeIn: string = "visibility 0s, opacity 1s linear"

    body.style.transition = bodyFadeIn;
    body.style.visibility = "visible";
    body.style.opacity = "1";
}