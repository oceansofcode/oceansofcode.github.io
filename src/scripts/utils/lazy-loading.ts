export const transitionElementsContainer = (el: Element) => {
    const lazyContainer: HTMLElement = el.querySelector('.lazy.container');
    
    if (lazyContainer) {
        lazyContainer.classList.remove('lazy');

        setTimeout(() => {
            lazyContainer.classList.add('loaded');
        }, 400);
    }
};


/**
 * Reusable methods to lazy load elements by taking in a map of the element and the function that will
 * load it's required javscript. Mostly used for custom elements.
 * 
 * @param loadElementMap 
 */
export const lazyLoadSections = (loadElementMap: Map<Element, () => Promise<void>>) => {

    const lazyLoadOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const lazyLoad: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyLoadEntry = loadElementMap.get(entry.target);

                lazyLoadEntry().then((() => {
                    transitionElementsContainer(entry.target);
                    observer.unobserve(entry.target);
                }));
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoad, lazyLoadOptions);

    for (const element of loadElementMap.keys()) {
        observer.observe(element);
    }
};

export const lazyLoadImages = () => {
    const lazyImages = document.querySelectorAll('img.lazy');

    console.debug(lazyImages);

    const lazyLoadOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const lazyLoadImagesFunction: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                // eslint-disable-next-line immutable/no-mutation
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    };

    const imageObserver = new IntersectionObserver(lazyLoadImagesFunction, lazyLoadOptions);
    lazyImages.forEach(lazyImage => imageObserver.observe(lazyImage));
};