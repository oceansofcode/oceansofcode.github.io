let cachedDom;
const lightTheme = { name: "light-theme", switchIcon: "fa-moon" };
const darkTheme = { name: "dark-theme", switchIcon: "fa-sun" };
const setStoredTheme = (theme) => window.localStorage.setItem("theme", JSON.stringify(theme));
const getStoredTheme = () => JSON.parse(window.localStorage.getItem("theme"));
const cacheDom = () => {
    const body = document.querySelector('body');
    const themeButton = document.querySelector('#theme-switch');
    return () => { return { body, themeButton }; };
};
const setTheme = (themes) => {
    const { body, themeButton } = cachedDom();
    body.classList.add(themes.newTheme.name);
    themes.oldTheme ? body.classList.remove(themes.oldTheme.name) : undefined;
    themeButton.classList.add(themes.newTheme.switchIcon);
    themes.oldTheme ? themeButton.classList.remove(themes.oldTheme.switchIcon) : undefined;
    setStoredTheme(themes.newTheme);
};
export const addThemeSwitchEvent = () => {
    const { body, themeButton } = cachedDom();
    const lightToDark = { newTheme: darkTheme, oldTheme: lightTheme };
    const darkToLight = { newTheme: lightTheme, oldTheme: darkTheme };
    const transition = { htmlClass: 'color-theme-in-transition', speed: 1500 };
    const themeSwitchToggle = () => {
        body.classList.add(transition.htmlClass);
        setTimeout(() => body.classList.remove(transition.htmlClass), transition.speed);
        body.classList.contains(lightTheme.name) ? setTheme(lightToDark) : setTheme(darkToLight);
    };
    themeButton.addEventListener('click', themeSwitchToggle, false);
};
export const themeInit = () => {
    cachedDom = cacheDom();
    const savedTheme = getStoredTheme();
    savedTheme ? setTheme({ newTheme: savedTheme }) : setTheme({ newTheme: darkTheme });
};
//# sourceMappingURL=theme-switch.js.map