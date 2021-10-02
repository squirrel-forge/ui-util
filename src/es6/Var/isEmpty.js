/**
 * Requires
 */
import { isPojo } from '../Object/isPojo.js';

/**
 * Check if value is empty
 *
 * @param {*} value - Check if the given value is empty
 *
 * @return {Boolean} - True if the value is empty
 */
export function isEmpty( value ) {

    // Empty values
    if ( typeof value === 'undefined' || value === null || value === 0 || !value ) {
        return true;
    }

    // Get type and check
    const to = typeof value;
    switch ( to ) {
    case 'string' :
        return !value.length;
    case 'object' :
        if ( value instanceof Date ) {
            return false;
        }
        if ( value instanceof Array ) {
            return !value.length;
        }
        if ( !isPojo( value ) ) {
            return typeof value.length !== 'undefined' ? !value.length : !( '' + value ).length;
        }
        return !Object.keys( value ).length;
    }

    // No idea, but it sure aint empty
    return false;
}
