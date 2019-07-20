
/**
 * Adds an event listener to the mobile-theme-toggle hamburger button in the header.
 */
export default () => {
    const toggleButton: HTMLElement = document.querySelector('#mobile-menu-toggle');
    const menuList: HTMLElement = document.querySelector('ul#nav-menu');

    const toggleMenu = () => {
        if (menuList.style.display === 'flex') {
            menuList.style.display = 'none';
        } else {
            menuList.style.display = 'flex';
        }
    };


    toggleButton.addEventListener('click', toggleMenu, false);
};