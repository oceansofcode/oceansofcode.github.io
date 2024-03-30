import { ExperienceCard } from '../custom-elements/experience-card.js';

customElements.define('experience-card', ExperienceCard);

const welcomeCallout = document.getElementById('welcome-callout');

// Set the initial translation as an animation first then perform the load effect.
welcomeTranslateEffect().then(() => {
    welcomeLoadEffect();
});

welcomeParallaxEffect();

async function welcomeTranslateEffect() {
    const translateEffect: Keyframe[] = [
        { translate: '-50% -50%', opacity: 0}
    ];

    const timing : KeyframeAnimationOptions = {
        fill: 'forwards'
    };

    return welcomeCallout.animate(translateEffect, timing).finished.then(animiation => animiation.commitStyles());
}

function welcomeLoadEffect() {
    const loadEffectKeyframe: Keyframe[] = [
        { transform: 'translateY(7vh)', opacity: 0},
        { opacity: 1}
    ];

    const timing: KeyframeAnimationOptions = {
        duration: 2000,
        fill: 'forwards',
        easing: 'ease-in-out'
    };

    welcomeCallout.animate(loadEffectKeyframe, timing).finished.then(animation => animation.commitStyles());
}

/**
 * Uses the Web Animations API to create a parallaxeffect onto the welcome callout without modifying CSS
 */
function welcomeParallaxEffect() {
    const translateRatio = 2.2;

    const options: KeyframeAnimationOptions = {
        fill: 'forwards'
    };

    window.addEventListener('scroll', () => {
        const top = window.scrollY;

        const parallaxKeyFrame: Keyframe[] = [
            { transform: `translateY(${top / translateRatio}px)`, opacity: `${1 - Math.max(top / (window.innerHeight * 1), 0)}`}
        ];

        welcomeCallout.animate(parallaxKeyFrame, options);
    });
}

