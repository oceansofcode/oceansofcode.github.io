import { lazyLoadSections } from '../utils/lazy-loading.js';

const intro = document.getElementById('volkswagen');

const lazyLoadMap = new Map<Element, () => Promise<void>>;

(async function vw() {
    lazyLoadMap.set(intro, loadIntro);
    lazyLoadSections(lazyLoadMap, '0px', false);
})();

async function loadIntro() {

}