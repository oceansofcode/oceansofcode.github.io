/**
 * Creates a DNS prefetch link element for the given anchor.
 *
 * @param {HTMLAnchorElement} anchor - The anchor element from which to extract the URL for DNS prefetching.
 * @returns {HTMLLinkElement} - The created DNS prefetch link element.
 */
export const createDNSPrefetch = (anchor: HTMLAnchorElement): HTMLLinkElement => {

    const uri = anchor.getAttribute('href');
    const link = document.createElement('link');

    const url: URL = new URL(uri);

    link.setAttribute('href', url.origin);
    link.setAttribute('rel', 'dns-prefetch');

    return link;
};