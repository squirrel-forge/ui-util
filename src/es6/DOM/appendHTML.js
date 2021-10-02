'use strict';

/**
 * Requires
 */
import { str2node } from '../String/str2node.js';

/**
 * Append HTML string as one or multiple elements
 *
 * @param {HTMLElement} element - Element to append to
 * @param {string} str - HTML string to append
 *
 * @return {void}
 */
export function appendHTML( element, str ) {
    const html = Array.prototype.slice.call( str2node( str, true ) );
    html.forEach( ( node ) => {
        element.appendChild( node );
    } );
}
