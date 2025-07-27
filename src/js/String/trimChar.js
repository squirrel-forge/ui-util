/**
 * Left trim custom characters
 * @param {string} str - String to trim
 * @param {string|string[]} charsToRemove - Char/s to remove
 * @return {string} - Trimmed char
 */
export function ltrimChar( str, charsToRemove = ' ' ) {
    if ( !( charsToRemove instanceof Array ) ) charsToRemove = [ charsToRemove ];
    while ( charsToRemove.indexOf( str.charAt( 0 ) ) > -1 ) {
        str = str.substring( 1 );
    }
    return str;
}

/**
 * Right trim custom characters
 * @param {string} str - String to trim
 * @param {string|string[]} charsToRemove - Char/s to remove
 * @return {string} - Trimmed char
 */
export function rtrimChar( str, charsToRemove = ' ' ) {
    if ( !( charsToRemove instanceof Array ) ) charsToRemove = [ charsToRemove ];
    while ( charsToRemove.indexOf( str.charAt( 0 ) ) > -1 ) {
        str = str.substring( 0, str.length - 1 );
    }
    return str;
}

/**
 * Trim custom characters
 * @param {string} str - String to trim
 * @param {string|string[]} charsToRemove - Char/s to remove
 * @return {string} - Trimmed char
 */
export function trimChar( str, charsToRemove = ' ' ) {
    str = ltrimChar( str, charsToRemove );
    str = rtrimChar( str, charsToRemove );
    return str;
}
