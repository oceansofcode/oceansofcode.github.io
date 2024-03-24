import { ThemeConstants, ThemeIcons } from './interfaces/theme-enums.js';
import { Theme, ThemeSwitch, ThemeTransition } from './interfaces/theme-switch-types.js';

// TODO: Dynamically load theme CSS based on user preference.

const lightTheme: Theme = { name: ThemeConstants.LIGHT, switchIcon: ThemeIcons.MOON };
const darkTheme: Theme = { name: ThemeConstants.DARK, switchIcon: ThemeIcons.SUN };

// eslint-disable-next-line immutable/no-let
let body: HTMLBodyElement;

// Cache these elements to avoid repeated query selector calls
const cacheDom = () => {
    // eslint-disable-next-line immutable/no-let
    let attempts = 100;
    return new Promise<HTMLBodyElement>((resolve, reject) => {
        const bodyInterval = setInterval(() => {
            const body: HTMLBodyElement = document.querySelector('body');
            if (body) {
                resolve(body);
                clearInterval(bodyInterval);
            } else {
                attempts--;
                if (attempts < 0) {
                    reject('Could not query select body element');
                    clearInterval(bodyInterval);
                }
            }
        }, 10);
    });
};

export const getThemeFromPreference = (): Theme => {
    return window.matchMedia(`(prefers-color-scheme: ${lightTheme.name})`).matches ? lightTheme : darkTheme;
};

export const getCurrentTheme = (): Theme => {
    if (body?.classList.contains(lightTheme.name)) {
        return lightTheme;
    } else if (body?.classList.contains(darkTheme.name)) {
        return darkTheme;
    } else {
        return null;
    }
};

const setTheme = (themes: ThemeSwitch, themeButton: HTMLElement) => {
    if (body) {
        body.classList.add(themes.newTheme.name);
        themes.oldTheme ? body.classList.remove(themes.oldTheme.name) : undefined;
    }

    if (themeButton) {
        themeButton.classList.add(themes.newTheme.switchIcon);
        themes.oldTheme ? themeButton.classList.remove(themes.oldTheme.switchIcon) : undefined;
    }
};

// Should be called once in the page lifecycle to wire this event to the button that will toggle theme changes
export const themeSwitchEvent = (themeButton: HTMLElement) => {
    const lightToDark: ThemeSwitch = { newTheme: darkTheme, oldTheme: lightTheme };
    const darkToLight: ThemeSwitch = { newTheme: lightTheme, oldTheme: darkTheme };
    const transition: ThemeTransition = { htmlClass: 'color-theme-in-transition', speed: 1500 };

    const setLightToDark = () => setTheme(lightToDark, themeButton);
    const setDarkToLight = () => setTheme(darkToLight, themeButton);

    // The actual event
    const themeSwitch = () => {
        body.classList.add(transition.htmlClass);
        setTimeout(() => body.classList.remove(transition.htmlClass), transition.speed);

        body.classList.contains(lightTheme.name) ? setLightToDark() : setDarkToLight();
    };

    // Wire this to prefers-color-scheme media query, this ensure the themeButton can change at the same time.
    const prefersColorSchemeLight = window.matchMedia(`(prefers-color-scheme: ${lightTheme.name})`);
    prefersColorSchemeLight.addEventListener('change', e => e.matches ? setDarkToLight() : setLightToDark());

    return themeSwitch;
};

export const themeInit = async () => {
    body = await cacheDom();

    const setInitialTheme = (newTheme: Theme) => setTheme({ newTheme }, undefined);

    const prefersColorSchemeLight = window.matchMedia(`(prefers-color-scheme: ${lightTheme.name})`);
        
    prefersColorSchemeLight.matches ? setInitialTheme(lightTheme) : setInitialTheme(darkTheme);
};