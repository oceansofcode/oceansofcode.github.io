export const transitionElementsContainer = (el: Element) => {
    const lazyContainer: HTMLElement = el.querySelector('.lazy.container');
    lazyContainer.classList.remove('lazy');

    setTimeout(() => {
        lazyContainer.classList.add('loaded');
    }, 400);
};