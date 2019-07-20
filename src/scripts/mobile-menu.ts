/**
 * Adds an event listener to the mobile-theme-toggle hamburger button in the header.
 */
export default () => {
    const toggleButton: HTMLElement = document.querySelector('#mobile-menu-toggle');
    const menuList: HTMLElement = document.querySelector('ul#nav-menu');

    /**
     * Toggles the menu based on it's previous state, alternating between `flex` and `none`.
     */
    const toggleMenu = () => {
        if (menuList.style.display === 'flex') {
            menuList.style.display = 'none';
        } else {
            menuList.style.display = 'flex';
        }
    };

    /**
     * Removes the javascript inline style applied from `toggleMenu`.
     * This is necessary since the inline style takes precedence over the `@media` queries.
     */
    const resetMenu = () => {
        if (window.innerWidth >= 800) {
            menuList.style.display = null;
        }
    };

    toggleButton.addEventListener('click', toggleMenu, false);
    window.addEventListener('resize', resetMenu, false);
};