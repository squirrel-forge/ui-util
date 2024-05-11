/**
 * Hold element position in viewport
 * @param {HTMLElement} element - Element to fix in viewport
 * @param {number} duration - How long to hold the position in ms
 * @return {void}
 */
export function holdElementViewportPosition( element, duration ) {
    const elem_start = element.getBoundingClientRect().top;
    let time_start = false;

    /**
     * Update handler
     * @private
     * @param {number} timestamp - Timestamp
     * @return {void}
     */
    const _handler = function( timestamp ) {
        if ( time_start === false ) time_start = timestamp;
        document.documentElement.scrollTop += element.getBoundingClientRect().top - elem_start;
        if ( timestamp - time_start < duration ) {
            window.requestAnimationFrame( _handler );
        }
    };
    window.requestAnimationFrame( _handler );
}
