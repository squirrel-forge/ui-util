/**
 * Very basic function name check,
 *  does not deal with reserved words or any other special cases.
 * @param {string} str - String to check
 * @return {boolean} - True if valid
 */
export function isValidFunctionName( str ) {
    if ( typeof str !== 'string' ) throw new Error( 'Argument must be a string' );
    return /^[$A-Z_][0-9A-Z_$]*$/i.test( str );
}
