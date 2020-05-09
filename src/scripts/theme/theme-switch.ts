import { ThemeConstants, ThemeIcons } from "./interfaces/theme-enums";
import { Theme, ThemeSwitch, ThemeTransition } from "./interfaces/theme-switch-types";

// eslint-disable-next-line immutable/no-let
let cachedDom: () => { body: HTMLBodyElement; themeButton: HTMLElement };

const lightTheme: Theme = { name: ThemeConstants.LIGHT, switchIcon: ThemeIcons.MOON };
const darkTheme: Theme = { name: ThemeConstants.DARK, switchIcon: ThemeIcons.SUN };

const setStoredTheme = (theme: Theme): void => window.localStorage.setItem(ThemeConstants.THEME, JSON.stringify(theme));
const getStoredTheme = (): Theme => JSON.parse(window.localStorage.getItem(ThemeConstants.THEME));

const cacheDom = () => {
    const body: HTMLBodyElement = document.querySelector('body');
    const themeButton: HTMLElement = document.querySelector('#theme-switch');
    return () => { return { body, themeButton }; };
};

const setTheme = (themes: ThemeSwitch) => {
    const { body, themeButton } = cachedDom();
    body?.classList.add(themes.newTheme.name);
    themes.oldTheme ? body?.classList.remove(themes.oldTheme.name) : undefined;

    themeButton?.classList.add(themes.newTheme.switchIcon);
    themes.oldTheme ? themeButton?.classList.remove(themes.oldTheme.switchIcon) : undefined;

    setStoredTheme(themes.newTheme);
};

export const addThemeSwitchEvent = () => {
    const { body, themeButton } = cachedDom();

    const lightToDark: ThemeSwitch = { newTheme: darkTheme, oldTheme: lightTheme };
    const darkToLight: ThemeSwitch = { newTheme: lightTheme, oldTheme: darkTheme };
    const transition: ThemeTransition = { htmlClass: 'color-theme-in-transition', speed: 1500 };

    const themeSwitchToggle = () => {
        body?.classList.add(transition.htmlClass);
        setTimeout(() => body?.classList.remove(transition.htmlClass), transition.speed);

        body?.classList.contains(lightTheme.name) ? setTheme(lightToDark) : setTheme(darkToLight);
    };

    themeButton?.addEventListener('click', themeSwitchToggle, false);
};

export const themeInit = () => {
    cachedDom = cacheDom();
    const savedTheme: Theme = getStoredTheme();
    savedTheme ? setTheme({ newTheme: savedTheme }) : setTheme({ newTheme: darkTheme });
};