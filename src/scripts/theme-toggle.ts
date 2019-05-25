export default () => {
    let themeButton: Element = document.querySelector('#themeSwitch');
    let body: Element = document.querySelector('body');

    function changeTheme() {
        if (body.classList.contains('lightTheme')) {
            body.classList.add('darkTheme');
            body.classList.remove('lightTheme');
        } else {
            body.classList.add('lightTheme');
            body.classList.remove('darkTheme');
        }
    }

    themeButton.addEventListener('click', changeTheme, false);
};