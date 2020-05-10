export default () => {
    const toggleButton = document.querySelector('#mobile-menu-toggle');
    const menuList = document.querySelector('ul#nav-menu');
    const toggleMenu = () => {
        menuList.style.display === 'flex' ? menuList.style.display = 'none' : menuList.style.display = 'flex';
    };
    const resetMenu = () => {
        window.innerWidth >= 800 ? menuList.style.display = null : undefined;
    };
    toggleButton?.addEventListener('click', toggleMenu, false);
    window.addEventListener('resize', resetMenu, false);
};
//# sourceMappingURL=mobile-menu.js.map