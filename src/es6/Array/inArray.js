'use strict';

/**
 * Value exists in array
 *
 * Check if value exists in array or object
 *
 * @param {*} needle - The value to check for
 * @param {Array} haystack - The source to search
 * @param {boolean} strict - Compare in strict mode, default: true
 * @param {boolean} silent - Do not throw any error when handling an invalid object
 *
 * @return {boolean} - True if the value was found
 */
export function inArray( needle, haystack, strict = true, silent = true ) {
    strict = strict !== false;
    silent = silent !== false;
    let found = false;
    if ( haystack.length ) {
        try {
            for ( let i = 0; i < haystack.length; i++ ) {
                if ( strict && needle === haystack[ i ] || !strict && needle == haystack[ i ] ) {
                    found = true;
                    break;
                }
            }
        } catch ( e ) {

            if ( !silent ) {
                window.console.error( e );
                throw new Error( '[InArrayException] Error iterating array values' );
            }
        }
    }
    return found;
}
