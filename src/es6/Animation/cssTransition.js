/**
 * Css transition handler
 * @param {HTMLElement} element - Target element
 * @param {null|Function} initial - Initial state
 * @param {null|Function} target - Target state
 * @param {null|Function} complete - Complete state
 * @param {number} delay - Delay in ms
 * @return {void}
 */
export function cssTransition( element, initial = null, target = null, complete = null, delay = 10 ) {
    if ( initial ) initial( element );
    element.addEventListener( 'transitionend', () => {
        window.setTimeout( () => { if ( complete ) complete( element ); }, delay );
    }, { once : true } );
    window.setTimeout( () => { if ( target ) target( element ); }, delay );
}
