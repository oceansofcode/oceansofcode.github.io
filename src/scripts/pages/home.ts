import { ExperienceCard } from '../custom-elements/experience-card.js';

customElements.define('experience-card', ExperienceCard);

const welcomeCallout = document.getElementById('welcome-callout');

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
    // eslint-disable-next-line immutable/no-let
    let hasTranslate = true;
    const translateRatio = 2.2;

    const options: KeyframeAnimationOptions = {
        fill: 'forwards'
    };

    window.addEventListener('scroll', () => {
        const top = window.scrollY;

        const parallaxKeyFrame: Keyframe[] = [
            { transform: `translateY(${top / translateRatio}px)` }
        ];

        const parallax = welcomeCallout.animate(parallaxKeyFrame, options);

        if (hasTranslate) {
            parallax.finished.then(() => {
                // eslint-disable-next-line immutable/no-mutation
                //welcomeCallout.style.translate = 'unset'; // Remove the default translation to avoid a 'jump'
            });

            hasTranslate = false;
        }
    });
}

