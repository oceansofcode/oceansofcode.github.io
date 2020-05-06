export default () => {
    const footerDate = document.querySelector('footer time');
    const currentYear = new Date().getFullYear().toString();
    const footerDateAttribute = document.createAttribute('datetime');
    
    // eslint-disable-next-line immutable/no-mutation
    footerDate.innerHTML = currentYear;
    // eslint-disable-next-line immutable/no-mutation
    footerDateAttribute.textContent = currentYear;
    footerDate.setAttributeNode(footerDateAttribute);
};