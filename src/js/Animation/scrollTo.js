/**
 * Scroll to element with offset
 * @param {HTMLElement} element - Target element
 * @param {null|HTMLElement} context - Scroll context
 * @param {number|HTMLElement|Function} offset - Offset in pixels or HTMLElement.height
 * @param {string} behavior - Scroll behaviour
 * @param {number} minDiff - Minimum scroll difference required
 * @return {void}
 */
export function scrollTo( element, context = null, offset = 0, behavior = 'smooth', minDiff = 3 ) {
    if ( !context ) context = document.documentElement;
    if ( offset instanceof HTMLElement ) {
        offset = offset.getBoundingClientRect().height;
    } else if ( typeof offset === 'function' ) {
        offset = offset( element );
    }
    if ( typeof offset !== 'number' || Number.isNaN( offset ) ) {
        throw new Error( 'scrollTo() Argument offset must be a Number, HTMLElement or Function returning a Number' );
    }
    let top = context.scrollTop + element.getBoundingClientRect().top - offset;
    if ( Math.abs( context.scrollTop - top ) >= minDiff ) {
        if ( context === document.documentElement ) {
            window.scrollTo( { top, behavior } );
        } else {
            top -= context.getBoundingClientRect().top;
            context.scrollTo( { top, behavior } );
        }
    }
}
