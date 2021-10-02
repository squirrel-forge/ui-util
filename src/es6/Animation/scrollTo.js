/**
 * Scroll to with offset
 *
 * @param {HTMLElement} element - Target element
 * @param {number|HTMLElement} offset - Offset in pixels or HTMLElement.height
 * @param {string} behavior - Scroll behaviour
 *
 * @return {void}
 */
export function scrollTo( element, offset = 0, behavior = 'smooth' ) {
    const top = element.getBoundingClientRect().top;
    if ( offset instanceof HTMLElement ) {
        offset = offset.getBoundingClientRect().height;
    }
    window.scrollTo( {
        top : document.documentElement.scrollTop + top - offset,
        behavior : behavior
    } );
}
