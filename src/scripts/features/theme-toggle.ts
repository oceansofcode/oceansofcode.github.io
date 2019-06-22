/**
 * I believe this module could be written 'better', but I used it to try out creating, and
 * passing objects using different methods
 */
export default () => {
    interface ThemeToggle {
        themeName: string;
        icon: string;
        toolTip: string;
    };

    const Theme = (theme: string, icon: string, toolTip: string): ThemeToggle => ({
        themeName: theme,
        icon: icon,
        toolTip: toolTip,
    });

    const themeButton: HTMLElement = document.querySelector('#themeSwitch');
    const body: HTMLElement = document.querySelector('body');
    const transition: string = "color-theme-in-transition";

    const light: ThemeToggle = Theme('light-theme', 'fa-moon', 'Toggle Light Mode');
    const dark: ThemeToggle = Theme('dark-theme', 'fa-sun', 'Toggle Dark Mode');

    function changeTheme() {

        body.classList.add(transition);
        if (body.classList.contains(light.themeName)) {
            addRemove({ add: dark, remove: light });
        } else {
            addRemove({ add: light, remove: dark });
        }
        setTimeout(() => {
            body.classList.remove(transition);
        }, 1500);
    }

    function addRemove({ add, remove }: { add: ThemeToggle; remove: ThemeToggle; }) {
        body.classList.add(add.themeName);
        body.classList.remove(remove.themeName);

        themeButton.classList.add(add.icon);
        themeButton.classList.remove(remove.icon);
    }

    themeButton.addEventListener('click', changeTheme, false);
};