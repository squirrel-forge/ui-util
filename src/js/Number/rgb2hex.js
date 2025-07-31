/**
 * Requires
 */
import { int2hex } from './int2hex.js';

/**
 * RGB to hex value
 * @param {number} r - Red integer
 * @param {number} g - Green integer
 * @param {number} b - Blue integer
 * @return {string} - Hex color value
 */
export function rgb2hex( r = 0, g = 0, b = 0 ) {
    if ( r > 255 ) r = 255;
    if ( r < 0 ) r = 0;
    if ( g > 255 ) g = 255;
    if ( g < 0 ) g = 0;
    if ( b > 255 ) b = 255;
    if ( b < 0 ) b = 0;
    return '#' + int2hex( r, 2 ) + int2hex( g, 2 ) + int2hex( b, 2 );
}
