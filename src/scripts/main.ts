import { getHeaderFooter, insertHeaderFooter } from './header-footer.js';
import addThemeToggle, { setTheme } from './theme-toggle.js';
import addMenuToggle from './mobile-menu.js';

/**
 * Adds common elements to the page by injecting it into the DOM.
 * Demonstrates use of async to return a promise.
 */
const prepareDOM = async(): Promise<void> => {
    return getHeaderFooter().then(result => insertHeaderFooter(result.header, result.footer));
};


/**
 * Functions that add event listeners for common elements should be called in here.
 * Every function in here will run asynchronously.
 */
const addEvents = (): void => {
    addThemeToggle();
    addMenuToggle();
};

/**
 * Initializes the page by preparing the dom, adding events and making the body visible with
 * a transition.
 */
(async function init() {
    await prepareDOM();
    setTheme();
    addEvents();
})();
