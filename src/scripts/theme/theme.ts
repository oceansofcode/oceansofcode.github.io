import { ThemeConstants, ThemeCss, ThemeIcons } from './interfaces/theme-enums.js';
import { Theme, ThemeSwitch, ThemeTransition } from './interfaces/theme-switch-types.js';

// TODO: Dynamically load theme CSS based on user preference.

const lightTheme: Theme = { name: ThemeConstants.LIGHT, switchIcon: ThemeIcons.MOON, css: ThemeCss.LIGHT, isLoaded: false };
const darkTheme: Theme = { name: ThemeConstants.DARK, switchIcon: ThemeIcons.SUN, css:ThemeCss.DARK, isLoaded: false };

const transition: ThemeTransition = { htmlClass: 'color-theme-in-transition', speed: 1500 };

const lightToDark: ThemeSwitch = { newTheme: darkTheme, oldTheme: lightTheme };
const darkToLight: ThemeSwitch = { newTheme: lightTheme, oldTheme: darkTheme };

const hiddenImageClass = 'hidden-image';

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

// Should be called once in the page lifecycle to wire this event to the button that will toggle theme changes
export const themeSwitchEvent = (themeButton: HTMLElement) => {

    const themeSwitch: ThemeSwitch = body.classList.contains(lightTheme.name) ? lightToDark : darkToLight;

    const setLightToDark = () => setTheme(lightToDark, themeButton);
    const setDarkToLight = () => setTheme(darkToLight, themeButton);

    // Wire this to prefers-color-scheme media query, this ensure the themeButton can change at the same time.
    const prefersColorSchemeLight = window.matchMedia(`(prefers-color-scheme: ${lightTheme.name})`);
    prefersColorSchemeLight.addEventListener('change', e => e.matches ? setDarkToLight() : setLightToDark());


    // The event handler we are returning
    const themeSwitchHandler = () => {
        body.classList.add(transition.htmlClass);
        setTimeout(() => body.classList.remove(transition.htmlClass), transition.speed);

        body.classList.contains(lightTheme.name) ? setLightToDark() : setDarkToLight();

        // Send out an event for other components to use
        const customThemeSwitchEvent = new CustomEvent('themeSwitch', { detail: themeSwitch });
        window.dispatchEvent(customThemeSwitchEvent);
    };

    return themeSwitchHandler;
};

const setTheme = (themes: ThemeSwitch, themeButton: HTMLElement) => {
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

    const backgrounds = document.querySelectorAll('.intro-background');

    backgrounds.forEach(background => {
        if (background.classList.contains(newTheme.name)) {
            background.classList.remove(hiddenImageClass);
        }

        if (oldTheme && background.classList.contains(oldTheme.name)) {
            background.classList.add(hiddenImageClass);
        }
    });
};

// We only want to load the stylesheet of a theme if the theme will be used
const loadTheme = (theme: Theme) => {
    const themeCss = document.getElementById(theme.css);
    themeCss.removeAttribute('disabled');

    // eslint-disable-next-line immutable/no-mutation
    theme.isLoaded = true;
};

export const themeInit = async () => {
    body = await cacheDom();

    const setInitialTheme = (newTheme: Theme) => setTheme({ newTheme }, undefined);

    const prefersColorSchemeLight = window.matchMedia(`(prefers-color-scheme: ${lightTheme.name})`);
        
    prefersColorSchemeLight.matches ? setInitialTheme(lightTheme) : setInitialTheme(darkTheme);
};