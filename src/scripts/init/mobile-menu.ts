/**
 * Adds an event listener to the mobile-theme-toggle hamburger button in the header.
 */
export default () => {
    const toggleButton: HTMLElement = document.querySelector('#mobile-menu-toggle');
    const menuList: HTMLElement = document.querySelector('ul#nav-menu');

    const toggleMenu = () => {
        // eslint-disable-next-line immutable/no-mutation
        menuList.style.display === 'flex' ? menuList.style.display = 'none' : menuList.style.display = 'flex';
    };

    /**
     * Removes the javascript inline style applied from `toggleMenu`.
     * This is necessary since the inline style takes precedence over the `@media` queries.
     * TODO: Fix this?
     */
    const resetMenu = () => {
        // eslint-disable-next-line immutable/no-mutation
        window.innerWidth >= 800 ? menuList.style.display = null : undefined;
    };

    toggleButton?.addEventListener('click', toggleMenu, false);
    window.addEventListener('resize', resetMenu, false);
};