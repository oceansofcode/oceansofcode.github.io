interface Theme {
    name: string;
    icon: string;
}

const createTheme = (name: string, icon: string): Theme => ({
    name,
    icon
});

const storeTheme = (theme: Theme) => {
    window.localStorage.setItem('theme', JSON.stringify(theme));
};

const transitionClass = "color-theme-in-transition";
const transitionSpeed = 1500;
const light: Theme = createTheme('light-theme', 'fa-moon');
const dark: Theme = createTheme('dark-theme', 'fa-sun');

export default () => {
    const body: HTMLElement = document.querySelector('body');
    const themeButton: HTMLElement = document.querySelector('#theme-switch');

    const switchThemes = ({ newTheme, oldTheme }: { newTheme: Theme; oldTheme: Theme }) => {
        body.classList.add(newTheme.name);
        body.classList.remove(oldTheme.name);
        storeTheme(newTheme);

        themeButton.classList.add(newTheme.icon);
        themeButton.classList.remove(oldTheme.icon);
    };

    const themeTransition = () => {
        body.classList.add(transitionClass); 
        setTimeout(() => {
            body.classList.remove(transitionClass);
        }, transitionSpeed);
    };

    const themeEvent = () => {
        themeTransition();
        if (body.classList.contains(light.name)) {
            switchThemes({ newTheme: dark, oldTheme: light });
        } else {
            switchThemes({ newTheme: light, oldTheme: dark });
        }
    };
    themeButton.addEventListener('click', themeEvent, false);
};

export const setTheme = () => {
    const body: HTMLElement = document.querySelector('body');
    const themeButton: HTMLElement = document.querySelector('#theme-switch');

    const savedTheme: Theme = JSON.parse(window.localStorage.getItem('theme'));
    if (savedTheme) {
        body.classList.add(savedTheme.name);
        themeButton.classList.add(savedTheme.icon);
    } else {
        body.classList.add(dark.name);
        themeButton.classList.add(dark.icon);
        storeTheme(dark);
    }
};