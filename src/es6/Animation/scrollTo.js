/**
 * Scroll to element with offset
 * @param {HTMLElement} element - Target element
 * @param {number|HTMLElement|Function} offset - Offset in pixels or HTMLElement.height
 * @param {string} behavior - Scroll behaviour
 * @param {number} minDiff - Minimum scroll difference required
 * @return {void}
 */
export function scrollTo( element, offset = 0, behavior = 'smooth', minDiff = 3 ) {
    if ( offset instanceof HTMLElement ) {
        offset = offset.getBoundingClientRect().height;
    } else if ( typeof offset === 'function' ) {
        offset = offset( element );
    }
    if ( typeof offset !== 'number' || Number.isNaN( offset ) ) {
        throw new Error( 'scrollTo() Argument offset must be a Number, HTMLElement or Function returning a Number' );
    }
    const top = document.documentElement.scrollTop + element.getBoundingClientRect().top - offset;
    if ( Math.abs( document.documentElement.scrollTop - top ) >= minDiff ) {
        window.scrollTo( { top, behavior } );
    }
}
