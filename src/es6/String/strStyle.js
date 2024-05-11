/**
 * Requires
 */
import { isPojo } from '../Object/isPojo.js';
import { strCamel2dash } from './strCamel2dash.js';

/**
 * Convert styles object to string
 * @param {Object} styles - Styles object
 * @return {string} - Compiled styles string
 */
export function strStyle( styles ) {
    if ( !isPojo( styles ) ) throw new Error( 'Argument styles must be a plain object' );
    const props = Object.entries( styles );
    const result = [];
    for ( let i = 0; i < props.length; i++ ) {
        const [ prop, value ] = props[ i ];
        result.push( `${strCamel2dash( prop )}:${value}`.replace( /"/g, "'" ) );
    }
    return result.join( ';' );
}
