/**
 * The body is initially not visible with an opacity of 0. 
 * This function sets how the transition will occur before
 * making it occur.
 */
export default () => {
    const body: HTMLElement = document.querySelector('body')
    const bodyFadeIn: string = "visibility 0s, opacity 1s ease-in";
    body.style.transition = bodyFadeIn;
    body.style.visibility = "visible";
    body.style.opacity = "1";
}
