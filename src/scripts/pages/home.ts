import { ExperienceCard } from '../custom-elements/experience-card.js';

customElements.define('experience-card', ExperienceCard);

welcomeParallaxEffect();

/**
 * Uses the Web Animations API to create a parallaxeffect onto the welcome callout without modifying CSS
 */
function welcomeParallaxEffect() {
    const translateRatio = 2.2;
    const welcomeCallout = document.getElementById('welcome-callout');

    const options: KeyframeAnimationOptions = {
        fill: 'forwards'
    };

    window.addEventListener('scroll', () => {
        const top = window.scrollY;

        const parallaxKeyFrame: Keyframe[] = [
            { transform: `translateX(-50%) translateY(-50%) translateY(${top / translateRatio}px)` }
        ];

        welcomeCallout.animate(parallaxKeyFrame, options);
        // eslint-disable-next-line immutable/no-mutation
        welcomeCallout.style.translate = 'unset'; // Remove the default translation to avoid a 'jump'
    });
}

