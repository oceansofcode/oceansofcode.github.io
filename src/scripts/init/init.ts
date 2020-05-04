import prepareHeaderFooter from "./header-footer.js";
import { themeInit, addThemeSwitchEvent } from "../theme/theme-switch.js";
import addMenuToggle from './mobile-menu.js';
import setFooterDate from './footer-date.js';

/**
 * Renders the dom synchronously.
 * Should be called first to ensure subsequent functions that affect the DOM succeed.
 */
const domInit = async () => {
    await prepareHeaderFooter();
    setFooterDate();
};

/**
 * Functions that add event listeners for common elements should be called in here.
 * Every function in here will run asynchronously.
 */
const eventsInit = () => {
    addThemeSwitchEvent();
    addMenuToggle();
};

/**
 * Initializes the page by preparing the dom, adding events and making the body visible with
 * a transition.
 */
export default async () => {
    await domInit();
    themeInit();
    eventsInit();
};
