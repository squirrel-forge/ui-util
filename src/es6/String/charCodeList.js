/**
 * Get char code list
 *
 * @param {string} value - String to decode
 * @param {null|string} join - String to join the result, omit or null to return an array
 *
 * @return {string|Array} - Result
 */
export function charCodeList( value, join = null ) {
    const charlist = [];
    for ( let i = 0; i < value.length; i++ ) {
        charlist.push( value.charCodeAt( i ) );
    }
    if ( typeof join !== 'string' ) {
        return charlist;
    }
    return charlist.join( join );
}
