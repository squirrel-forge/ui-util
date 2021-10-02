'use strict';

/**
 * Requires
 */
import { inArray } from './inArray.js';
import { cloneObject } from '../Object/cloneObject.js';

/**
 * Merge 2 or more arrays and return new array
 *
 * @param {Boolean} unique - Only unique values, optional, default : true
 * @param {Boolean} clone - Clone values, optional, default : false
 * @param {Boolean} strict - Strict mode, optional, default : true
 * @param {Array} array1,array2,... - Any number of arrays to merge
 *
 * @return {Array} - Merged array
 */
export function mergeArray( ...args ) {
    const merged = [];
    let argsset = 0,
        unique = true,
        clone = false,
        strict = true;
    for ( let i = 0; i < args.length; i++ ) {
        if ( args[ i ] instanceof Array ) {
            args[ i ].forEach( ( value ) => {
                if ( !unique || unique && !inArray( value, merged, strict ) ) {
                    merged.push( clone ? cloneObject( value ) : value );
                }
            } );

        // Parse first three non array arguments as booleans
        } else if ( argsset < 3 ) {
            if ( argsset === 0 ) {
                unique = !!args[ i ];
            } else if ( argsset === 1 ) {
                clone = !!args[ i ];
            } else if ( argsset === 2 ) {
                strict = !!args[ i ];
            }
            argsset++;
        }
    }
    return merged;
}
