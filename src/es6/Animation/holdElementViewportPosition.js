/**
 * Hold element position in viewport
 *
 * @param {HTMLElement} elem - Element to fix in viewport
 * @param {number} duration - How long to hold the position in ms
 *
 * @return {void}
 */
export function holdElementViewportPosition( elem, duration ) {
    const elem_start = elem.getBoundingClientRect().top;
    let time_start = false;

    /**
     * Update handler
     *
     * @private
     *
     * @param {Number} timestamp - Timestamp
     *
     * @return {void}
     */
    const _handler = function( timestamp ) {
        if ( time_start === false ) {
            time_start = timestamp;
        }
        document.documentElement.scrollTop += elem.getBoundingClientRect().top - elem_start;
        if ( timestamp - time_start < duration ) {
            window.requestAnimationFrame( _handler );
        }
    };
    window.requestAnimationFrame( _handler );
}
