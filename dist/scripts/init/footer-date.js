export default () => {
    const footerDate = document.querySelector('footer time');
    const currentYear = new Date().getFullYear().toString();
    const footerDateAttribute = document.createAttribute('datetime');
    footerDate.innerHTML = currentYear;
    footerDateAttribute.textContent = currentYear;
    footerDate.setAttributeNode(footerDateAttribute);
};
//# sourceMappingURL=footer-date.js.map