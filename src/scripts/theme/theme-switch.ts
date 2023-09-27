import { ThemeConstants, ThemeIcons } from './interfaces/theme-enums';
import { Theme, ThemeSwitch, ThemeTransition } from './interfaces/theme-switch-types';

const lightTheme: Theme = { name: ThemeConstants.LIGHT, switchIcon: ThemeIcons.MOON };
const darkTheme: Theme = { name: ThemeConstants.DARK, switchIcon: ThemeIcons.SUN };

export const getStoredTheme = (): Theme => JSON.parse(window.localStorage.getItem(ThemeConstants.THEME));
const setStoredTheme = (theme: Theme): void => window.localStorage.setItem(ThemeConstants.THEME, JSON.stringify(theme));

// eslint-disable-next-line immutable/no-let
export let cachedDom: () => { body: HTMLBodyElement, mainImage: HTMLImageElement };

// Cache these elements to avoid repeated query selector calls
const cacheDom = () => {
    const body: HTMLBodyElement = document.querySelector('body');
    const mainImage: HTMLImageElement = document.querySelector('#intro-background');

    return () => { return { body, mainImage }; };
};

// TODO: Move init of themeButton.classList into header-footer to avoid FOUC of the icon
const setTheme = (themes: ThemeSwitch, themeButton: HTMLElement) => {
    const { body } = cachedDom();

    body?.classList.add(themes.newTheme.name);
    themes.oldTheme ? body?.classList.remove(themes.oldTheme.name) : undefined;

    themeButton?.classList.add(themes.newTheme.switchIcon);
    themes.oldTheme ? themeButton?.classList.remove(themes.oldTheme.switchIcon) : undefined;

    setTimeout(() => setStoredTheme(themes.newTheme), 0);
};

export const themeSwitchEvent = (themeButton: HTMLElement) => {
    const { body } = cachedDom();

    const lightToDark: ThemeSwitch = { newTheme: darkTheme, oldTheme: lightTheme };
    const darkToLight: ThemeSwitch = { newTheme: lightTheme, oldTheme: darkTheme };
    const transition: ThemeTransition = { htmlClass: 'color-theme-in-transition', speed: 1500 };

    return () => {
        body?.classList.add(transition.htmlClass);
        setTimeout(() => body?.classList.remove(transition.htmlClass), transition.speed);

        body?.classList.contains(lightTheme.name) ? setTheme(lightToDark, themeButton) : setTheme(darkToLight, themeButton);
    };
};

export const themeInit = () => {
    cachedDom = cacheDom();
    const savedTheme: Theme = getStoredTheme();

    const getUserPreferredTheme = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? lightTheme : darkTheme;
        
    savedTheme ? setTheme({ newTheme: savedTheme }, undefined) : setTheme({ newTheme: getUserPreferredTheme() }, undefined);
};