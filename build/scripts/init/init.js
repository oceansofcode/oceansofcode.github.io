import prepareHeaderFooter from "./header-footer.js";
import { themeInit, addThemeSwitchEvent } from "../theme/theme-switch.js";
import addMenuToggle from './mobile-menu.js';
import setFooterDate from './footer-date.js';
const domInit = async () => {
    await prepareHeaderFooter();
    setFooterDate();
};
const eventsInit = () => {
    addThemeSwitchEvent();
    addMenuToggle();
};
export default async () => {
    await domInit();
    themeInit();
    eventsInit();
};
