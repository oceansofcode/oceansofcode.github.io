export const inViewPort = (el: HTMLElement) => {
    const {top, bottom} = el.getBoundingClientRect();
    console.log(top, bottom);

    const pastTop = top <= 0 && bottom >= 0;
    const inBoundaries = bottom > window.innerHeight && top < window.innerHeight;
    const pastBottom = top >= 0 && bottom <= window.innerHeight;

    console.debug('pastTop', pastTop);
    console.debug('inBoundaries', inBoundaries);
    console.debug('pastBottom', pastBottom);

    return pastTop || inBoundaries || pastBottom;
};

export const makeContainerVisible = (el: HTMLElement) => {
    const lazyContainer: HTMLElement = el.querySelector('.lazy.container');
    // eslint-disable-next-line immutable/no-mutation
    lazyContainer.style.opacity = '1';

    console.log(lazyContainer);
};