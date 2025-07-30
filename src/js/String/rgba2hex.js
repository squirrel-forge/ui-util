/**
 * Requires
 */
import { rgb2hex } from '../Number/rgb2hex.js';

/**
 * RGB/a to hex
 * @param {string} rgba - RGB/a css value
 * @param {boolean} asArray - Return as array instead of string
 * @return {number[]|string|null} - Css hex value or array of input
 */
export function rgba2hex( rgba, asArray = false ) {
    const result = /^rgb(a)?\((?<r>[\d]{1,3}),(?<g>[\d]{1,3}),(?<b>[\d]{1,3})(,(?<o>[.\d]{1,}))\)$/i
        .exec( rgba.replace( /\s/g, '' ) );
    if ( !result ) return null;
    const arr = [
        parseInt( result.groups.r ),
        parseInt( result.groups.g ),
        parseInt( result.groups.b ),
        parseInt( result.groups.o )
    ];
    if ( asArray ) return arr;
    return rgb2hex( ...arr );
}
