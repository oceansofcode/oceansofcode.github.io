export default () => {
    const footerDate = document.querySelector('#footer-date');
    // eslint-disable-next-line immutable/no-mutation
    footerDate.innerHTML = new Date().getFullYear().toString();
};