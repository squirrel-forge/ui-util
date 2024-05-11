/**
 * Convert camel case to dashed lower string
 * @param {string} str - String to convert
 * @return {string} - Converted string
 */
export function strCamel2dash( str ) {
    return str.replace( /^[A-Z]/g, ( s ) => { return '-' + s.toLowerCase(); } )
        .replace( /[A-Z]/g, ( s ) => { return '-' + s.toLowerCase(); } );
}
