const lightTheme = { name: "light-theme", icon: "fa-moon" };
const darkTheme = { name: "dark-theme", icon: "fa-sun" };
const storeTheme = (theme) => window.localStorage.setItem("theme", JSON.stringify(theme));
const getSavedTheme = () => JSON.parse(window.localStorage.getItem("theme"));
const cacheDom = () => {
    const body = document.querySelector('body');
    const themeButton = document.querySelector('#theme-switch');
    return () => { return { body, themeButton }; };
};
let cachedDom;
const setTheme = (theme, oldTheme) => {
    const { body, themeButton } = cachedDom();
    body.classList.add(theme.name);
    oldTheme ? body.classList.remove(oldTheme.name) : undefined;
    themeButton.classList.add(theme.icon);
    oldTheme ? themeButton.classList.remove(oldTheme.icon) : undefined;
};
export const addThemeSwitchEvent = () => {
    const { body, themeButton } = cachedDom();
    const lightToDark = { oldTheme: lightTheme, newTheme: darkTheme };
    const darkToLight = { oldTheme: darkTheme, newTheme: lightTheme };
    const transition = { htmlClass: 'color-theme-in-transition', speed: 1500 };
    const switchThemes = ({ oldTheme, newTheme }) => {
        setTheme(newTheme, oldTheme);
        storeTheme(newTheme);
    };
    const themeSwitchToggle = () => {
        body.classList.add(transition.htmlClass);
        setTimeout(() => body.classList.remove(transition.htmlClass), transition.speed);
        body.classList.contains(lightTheme.name) ? switchThemes(lightToDark) : switchThemes(darkToLight);
    };
    themeButton.addEventListener('click', themeSwitchToggle, false);
};
const setDefaultTheme = (defaultTheme) => {
    setTheme(defaultTheme);
    storeTheme(defaultTheme);
};
export const themeInit = () => {
    cachedDom = cacheDom();
    const savedTheme = getSavedTheme();
    savedTheme ? setTheme(savedTheme) : setDefaultTheme(darkTheme);
};
