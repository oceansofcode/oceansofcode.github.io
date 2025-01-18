const lazyLoadDelay = 300;

export const loadLazyContainer = (el: Element) => {
    const lazyContainer: HTMLElement = el.querySelector('.lazy.container');
    
    if (lazyContainer) {
        lazyContainer.classList.remove('lazy');

        setTimeout(() => {
            lazyContainer.classList.add('loaded');
        }, lazyLoadDelay);
    }
};

export const showLoadedContainer = (el: Element) => {
    const loadedContainer: HTMLElement = el.querySelector('.container:not(.lazy, .loaded)');

    if (loadedContainer) {
        loadedContainer.classList.add('loaded');
    }
};

export const hideLoadedContainer = (el: Element) => {
    const loadedContainer: HTMLElement = el.querySelector('.loaded.container');

    if (loadedContainer) {
        loadedContainer.classList.remove('loaded');
    }
};

/**
 * Reusable methods to lazy load elements by taking in a map of the element and the function that will
 * load it's required javascript. Mostly used for custom elements.
 *
 * @param loadElementMap
 * @param rootMargin
 * @param autoHide
 */
export const lazyLoadSections = (loadElementMap: Map<Element, () => Promise<void>>, rootMargin = '0px', autoHide = false) => {

    const ratios = {
        hide: 0.1,
        show: 0.3
    };

    const lazyLoadOptions: IntersectionObserverInit = {
        root: null,
        rootMargin,
        threshold: autoHide ? [0, 0.2, 0.3, 0.4, 0.5] : 0.5
    };
   
    const lazyLoad: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const { target, intersectionRatio } = entry;
                const lazyLoadEntry = loadElementMap.get(target);

                if (loadElementMap.has(target) && intersectionRatio >= ratios.show) {
                    lazyLoadEntry().then((() => {
                        loadLazyContainer(target);

                        // Delete the element from the map for garbage collection
                        if (!autoHide) {
                            observer.unobserve(target);
                        }

                        loadElementMap.delete(target);
                    }));
                } else if (autoHide && intersectionRatio <= ratios.hide) {
                    hideLoadedContainer(target);
                } else if (autoHide && intersectionRatio >= ratios.show) {
                    showLoadedContainer(target);
                }
                
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