/**
 * Requires
 */
import { isEmpty } from '../Var/isEmpty.js';
import { isPojo } from './isPojo.js';

/**
 * Object empty checks
 * @param {null|Object} obj - Object to check
 * @param {boolean} partial - Partial check
 * @return {boolean} - True if all or one property is empty
 */
export function objectEmpty( obj, partial = false ) {
    if ( !obj ) return true;
    if ( !isPojo( obj ) ) throw new Error( 'First argument must be a plain object' );
    const values = Object.values( obj );
    let empty = 0;
    for ( let i = 0; i < values.length; i++ ) {
        if ( isEmpty( values[ i ] ) ) empty++;
    }
    if ( empty === values.length ) return true;
    return partial && empty > 0;
}
