/**
 * Integer to hex
 * @param {number} int - Integer to convert
 * @param {number} length - Length of expected hex value
 * @return {string} - Hex including leading zeros if required
 */
export function int2hex( int, length = 0 ) {
    let hex = int.toString( 16 );
    if ( length && hex.length < length ) {
        while ( hex.length < length ) {
            hex = '0' + hex;
        }
    }
    return hex;
}
