/**
 * Requires
 */
import { afterPaint } from './afterPaint.js';

/**
 * Css transition handler
 * @param {HTMLElement} element - Target element
 * @param {null|Function} initial - Initial state
 * @param {null|Function} target - Target state
 * @param {null|Function} ended - Ended state
 * @param {null|Function} complete - Complete state
 * @return {void}
 */
export function cssTransition( element, initial = null, target = null, ended = null, complete = null ) {
    if ( initial ) initial( element );
    element.addEventListener( 'transitionend', () => {
        if ( ended ) ended( element );
        afterPaint( () => { if ( complete ) complete( element ); } );
    }, { once : true } );
    afterPaint( () => { if ( target ) target( element ); } );
}
