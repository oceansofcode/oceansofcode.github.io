/**
 * I believe this module could be written 'better', but I used it to try out creating, and
 * passing objects using different methods
 */

interface ThemeToggle {
    name: string;
    icon: string;
    toolTip: string;
};

const Theme = (name: string, icon: string, toolTip: string): ThemeToggle => ({
    name,
    icon,
    toolTip,
});

export default () => {

    const themeButton: HTMLElement = document.querySelector('#themeSwitch');
    const body: HTMLElement = document.querySelector('body');
    const transition: string = "color-theme-in-transition";

    const light: ThemeToggle = Theme('light-theme', 'fa-moon', 'Toggle Dark Mode');
    const dark: ThemeToggle = Theme('dark-theme', 'fa-sun', 'Toggle Light Mode');

    function changeTheme() {
        themeButton.removeEventListener('click', changeTheme, false);
        body.classList.add(transition);
        if (body.classList.contains(light.name)) {
            addRemove({ add: dark, remove: light });
        } else {
            addRemove({ add: light, remove: dark });
        }
        setTimeout(() => {
            body.classList.remove(transition);
        }, 1500);
        setTimeout(() => {
            themeButton.addEventListener('click', changeTheme, false);
        }, 750);
    }

    function addRemove({ add, remove }: { add: ThemeToggle; remove: ThemeToggle; }) {
        body.classList.add(add.name);
        body.classList.remove(remove.name);

        themeButton.classList.add(add.icon);
        themeButton.classList.remove(remove.icon);
        
        themeButton.title = add.toolTip;
    }

    themeButton.addEventListener('click', changeTheme, false);
};