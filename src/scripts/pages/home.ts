import { lazyLoadSections } from '../utils/lazy-loading.js';

const welcomeCallout = document.getElementById('welcome-callout');
const clients = document.getElementById('clients');

const lazyLoadMap = new Map<Element, () => Promise<void>>;

(async function home() {
    // Set the initial translation as an animation first then perform the load effect.
    welcomeTranslateEffect().then(() => {
        welcomeLoadEffect();
        // Set the parallax effect
        welcomeParallaxEffect();
    });

    lazyLoadMap.set(clients, loadClientsSection);

    lazyLoadSections(lazyLoadMap, '0px', false);
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

    return welcomeCallout.animate(translateEffect, timing).finished.then(animation => animation.commitStyles());
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

        const opacityLevel = Math.max(top / (window.innerHeight), 0);

        const opacity = `${1 - opacityLevel}`;

        const parallaxKeyFrame: Keyframe[] = [
            { transform: `translateY(${top / translateRatio}px)`, opacity }
        ];

        if (opacityLevel >= 1) {
            welcomeCallout.setAttribute('aria-hidden', 'true');
        } else {
            welcomeCallout.setAttribute('aria-hidden', 'false');
        }

        welcomeCallout.animate(parallaxKeyFrame, options);
    });
}

/**
 * Dynamically load the clients section if it is in the viewport.
 */
async function loadClientsSection() {
    const { ExperienceCard } = await import('../custom-elements/experience-card.js');
    customElements.define('experience-card', ExperienceCard);
}