const lightTheme = { name: "light-theme", switchIcon: "fa-moon" };
const darkTheme = { name: "dark-theme", switchIcon: "fa-sun" };
export const getStoredTheme = () => JSON.parse(window.localStorage.getItem("theme"));
const setStoredTheme = (theme) => window.localStorage.setItem("theme", JSON.stringify(theme));
export let cachedDom;
const cacheDom = () => {
    const body = document.querySelector('body');
    const mainImage = document.querySelector('#intro-background');
    return () => { return { body, mainImage }; };
};
const setTheme = (themes, themeButton) => {
    const { body } = cachedDom();
    body?.classList.add(themes.newTheme.name);
    themes.oldTheme ? body?.classList.remove(themes.oldTheme.name) : undefined;
    themeButton?.classList.add(themes.newTheme.switchIcon);
    themes.oldTheme ? themeButton?.classList.remove(themes.oldTheme.switchIcon) : undefined;
    setTimeout(() => setStoredTheme(themes.newTheme), 0);
};
export const themeSwitchEvent = (themeButton) => {
    const { body } = cachedDom();
    const lightToDark = { newTheme: darkTheme, oldTheme: lightTheme };
    const darkToLight = { newTheme: lightTheme, oldTheme: darkTheme };
    const transition = { htmlClass: 'color-theme-in-transition', speed: 1500 };
    return () => {
        body?.classList.add(transition.htmlClass);
        setTimeout(() => body?.classList.remove(transition.htmlClass), transition.speed);
        body?.classList.contains(lightTheme.name) ? setTheme(lightToDark, themeButton) : setTheme(darkToLight, themeButton);
    };
};
export const themeInit = () => {
    cachedDom = cacheDom();
    const savedTheme = getStoredTheme();
    const getUserPreferredTheme = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? lightTheme : darkTheme;
    savedTheme ? setTheme({ newTheme: savedTheme }, undefined) : setTheme({ newTheme: getUserPreferredTheme() }, undefined);
};
//# sourceMappingURL=theme-switch.js.map