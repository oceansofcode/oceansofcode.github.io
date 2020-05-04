/* eslint-disable immutable/no-mutation */
/**
 * The body is initially not visible with an opacity of 0. 
 * This function sets how the transition will occur before
 * making it occur.
 */
export default () => {
    const body: HTMLElement = document.querySelector('body');
    const fadeLength = 0.75;
    const bodyFadeIn = `visibility 0s, opacity ${fadeLength}s ease-in`;

    body.style.transition = bodyFadeIn;
    body.style.visibility = "visible";
    body.style.opacity = "1";
};
