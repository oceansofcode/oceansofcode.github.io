export default () => {
    const footerDate = document.querySelector('#footer-date');
    footerDate.innerHTML = new Date().getFullYear().toString();
};
