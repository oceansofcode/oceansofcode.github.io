import { ThemeConstants, ThemeCss, ThemeIcons } from './interfaces/theme-enums.js';
import { Theme, ThemeSwitch, ThemeTransition } from './interfaces/theme-switch-types.js';
import Constants from '../constants.js';

const lightTheme: Theme = { name: ThemeConstants.LIGHT, switchIcon: ThemeIcons.MOON, css: ThemeCss.LIGHT, isLoaded: false };
const darkTheme: Theme = { name: ThemeConstants.DARK, switchIcon: ThemeIcons.SUN, css:ThemeCss.DARK, isLoaded: false };

const transition: ThemeTransition = { htmlClass: 'color-theme-in-transition', speed: 1500 };

const lightToDark: ThemeSwitch = { newTheme: darkTheme, oldTheme: lightTheme };
const darkToLight: ThemeSwitch = { newTheme: lightTheme, oldTheme: darkTheme };

const hiddenImageClass = 'hidden-image';

const prefersLight = window.matchMedia(`(prefers-color-scheme: ${lightTheme.name})`);

// eslint-disable-next-line immutable/no-let
let body: HTMLBodyElement;

// Cache these elements to avoid repeated query selector calls
const cacheDom = (): Promise<HTMLBodyElement> => {
    // eslint-disable-next-line immutable/no-let
    let attempts = 100;
    return new Promise<HTMLBodyElement>((resolve, reject) => {
        const bodyInterval = setInterval(() => {
            const body: HTMLBodyElement = document.querySelector('body');
            if (body) {
                resolve(body);
                clearInterval(bodyInterval);
            } else {
                if (--attempts < 0) {
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

// Should be called once in the page lifecycle to wire this event to the button that will toggle theme changes
export const themeSwitchEvent = (themeButton: HTMLElement): () => void => {

    // Sets our transition classes onto the body and then removes it once the transition time is done
    const bodyTransition = () => {
        body.classList.add(transition.htmlClass);
        setTimeout(() => body.classList.remove(transition.htmlClass), transition.speed);
    };

    // Captures out themeButton for each changeThemeCall we are wiring
    const switchTheme = (themeSwitch: ThemeSwitch) => changeTheme(themeSwitch, themeButton);

    const prefersColorSchemeLightEventHandler = (e: MediaQueryListEvent) => {
        bodyTransition();

        e.matches ? switchTheme(darkToLight) : switchTheme(lightToDark);
    };

    // Wire this to prefers-color-scheme media query, this ensures the themeButton can change at the same time.
    prefersLight.addEventListener('change', prefersColorSchemeLightEventHandler);

    return () => {
        bodyTransition();

        body.classList.contains(darkTheme.name) ? switchTheme(darkToLight) : switchTheme(lightToDark);
    };
};

const changeTheme = (themes: ThemeSwitch, themeButton: HTMLElement) => {
    const { newTheme, oldTheme } = themes;

    if (!newTheme.isLoaded) {
        loadTheme(newTheme);
    }

    if (body) {
        body.classList.add(newTheme.name);
        oldTheme ? body.classList.remove(oldTheme.name) : undefined;
    }

    if (themeButton) {
        themeButton.classList.add(newTheme.switchIcon);
        oldTheme ? themeButton.classList.remove(oldTheme.switchIcon) : undefined;
    }

    const backgrounds = document.querySelectorAll('.theme-background');

    backgrounds.forEach(background => {
        if (background.classList.contains(newTheme.name)) {
            background.classList.remove(hiddenImageClass);
        }

        if (oldTheme && background.classList.contains(oldTheme.name)) {
            background.classList.add(hiddenImageClass);
        }
    });

    // Send out an event for other components to use
    const customThemeSwitchEvent = new CustomEvent(Constants.THEME_SWITCH_EVENT, { detail: themes });
    window.dispatchEvent(customThemeSwitchEvent);
};

// We only want to load the stylesheet of a theme if the theme will be used
const loadTheme = (theme: Theme) => {
    const themeCss = document.getElementById(theme.css);
    themeCss.removeAttribute('disabled');

    // eslint-disable-next-line immutable/no-mutation
    theme.isLoaded = true;
};

/**
 * Sets the initial theme based on the users preferred color
 */
export const themeInit = async () => {
    body = await cacheDom();

    const setInitialTheme = (newTheme: Theme) => changeTheme({ newTheme }, undefined);

    prefersLight.matches ? setInitialTheme(lightTheme) : setInitialTheme(darkTheme);
};