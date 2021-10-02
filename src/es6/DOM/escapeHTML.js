'use strict';

/**
 * Escape html special chars
 *
 * @param {String} text - String to escape
 *
 * @return {String} - Escaped html string
 */
export function escapeHTML( text ) {
    const map = {
        '&' : '&amp;',
        '<' : '&lt;',
        '>' : '&gt;',
        '"' : '&quot;',
        "'" : '&#039;'
    };
    return text.replace( /[&<>"']/g, ( m ) => { return map[ m ]; } );
}
