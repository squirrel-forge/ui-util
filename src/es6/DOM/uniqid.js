'use strict';

/**
 * Requires
 */
import { strand } from '../String/strand.js';

/**
 * Unique html attribute id
 *
 * @param {string} prefix - Prefix the random id
 *
 * @return {string} - An unused unique random id
 */
export function uniqid( prefix = '' ) {
    prefix = prefix || '';
    let id;
    do {
        id = prefix + strand();
    } while ( document.getElementById( id ) );
    return id;
}
