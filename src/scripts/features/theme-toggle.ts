export default () => {
    let themeButton: HTMLElement = document.querySelector('#themeSwitch');
    let body: HTMLElement = document.querySelector('body');

    function changeTheme() {
        const transition: string = "color-theme-in-transition"
        const dark: string = "dark-theme";
        const light: string = "light-theme";

        body.classList.add(transition);
        if (body.classList.contains(light)) {
            body.classList.add(dark);
            body.classList.remove(light);
        } else {
            body.classList.add(light);
            body.classList.remove(dark);
        }
        setTimeout(() => {
            body.classList.remove(transition);
        }, 1000);
    }

    themeButton.addEventListener('click', changeTheme, false);
};