import { transitionElementsContainer } from '../utils/lazy-loading.js';

const welcomeCallout = document.getElementById('welcome-callout');
const clients = document.getElementById('clients');

(async function home() {
    // Set the initial translation as an animation first then perform the load effect.
    welcomeTranslateEffect().then(() => {
        welcomeLoadEffect();
    });

    // Set the parallax effect
    welcomeParallaxEffect();

    observeIntersections();
})();

/**
 * Sets the translation effect needed due to absolute positioning of the callout (center of viewport) 
 */
async function welcomeTranslateEffect() {
    const translateEffect: Keyframe[] = [
        { translate: '-50% -50%', opacity: 0 }
    ];

    const timing: KeyframeAnimationOptions = {
        fill: 'forwards'
    };

    return welcomeCallout.animate(translateEffect, timing).finished.then(animiation => animiation.commitStyles());
}

/**
 * Performs the load effect of the welcome callout
 */
function welcomeLoadEffect() {
    const loadEffectKeyframe: Keyframe[] = [
        { transform: 'translateY(7vh)', opacity: 0 },
        { opacity: 1 }
    ];

    const timing: KeyframeAnimationOptions = {
        duration: 2000,
        fill: 'forwards',
        easing: 'ease-in-out'
    };

    welcomeCallout.animate(loadEffectKeyframe, timing).finished.then(animation => animation.commitStyles());
}

/**
 * Uses the Web Animations API to create a parallax effect onto the welcome callout without modifying CSS
 */
function welcomeParallaxEffect() {
    const translateRatio = 2.2;

    const options: KeyframeAnimationOptions = {
        fill: 'forwards'
    };

    window.addEventListener('scroll', () => {
        const top = window.scrollY;

        const parallaxKeyFrame: Keyframe[] = [
            { transform: `translateY(${top / translateRatio}px)`, opacity: `${1 - Math.max(top / (window.innerHeight * 1), 0)}` }
        ];

        welcomeCallout.animate(parallaxKeyFrame, options);
    });
}

function observeIntersections() {
    const options: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadClientsSection().then((() => {
                    transitionElementsContainer(entry.target);
                    observer.unobserve(entry.target);
                }));
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(clients);
}

/**
 * Dynamically load the clients section if it is in the viewport.
 */
async function loadClientsSection() {
    const { ExperienceCard } = await import('../custom-elements/experience-card.js');
    customElements.define('experience-card', ExperienceCard);
}