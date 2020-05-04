export default () => {
    const body = document.querySelector('body');
    const fadeLength = 0.75;
    const bodyFadeIn = `visibility 0s, opacity ${fadeLength}s ease-in`;
    body.style.transition = bodyFadeIn;
    body.style.visibility = "visible";
    body.style.opacity = "1";
};
