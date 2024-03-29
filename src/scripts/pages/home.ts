import { ExperienceCard } from '../custom-elements/experience-card.js';

const translateRatio = 2.2;

customElements.define('experience-card', ExperienceCard);

const welcomeCallout = document.getElementById('welcome-callout');

const options: KeyframeAnimationOptions = {
    duration: 0,
    fill: 'forwards'
};

window.addEventListener('scroll', () => {
    const top = window.scrollY;

    const parallaxKeyFrame: Keyframe[] = [
        { transform: `translateX(-50%) translateY(-50%) translateY(${top/translateRatio}px)`}
    ];

    welcomeCallout.animate(parallaxKeyFrame, options).finished.then(animation => animation.commitStyles());
    // eslint-disable-next-line immutable/no-mutation
    welcomeCallout.style.translate = 'unset'; // Remove the default translation to avoid a 'jump'
});
