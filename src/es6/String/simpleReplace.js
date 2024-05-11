/**
 * Replace variables in string
 * @param {string} tmpl - String to replace vars in
 * @param {Object} data - Object with replace vars
 * @param {null|string} prefix - Regex prefix
 * @param {null|string} suffix - Regex suffix
 * @param {null|Function} converter - Convert value before replacement
 * @return {string} - Rendered template string
 */
export function simpleReplace( tmpl, data, prefix = ':', suffix = '', converter = null ) {
    const keys = Object.keys( data );
    let regex, value;
    for ( let key = 0; key < keys.length; key++ ) {
        value = data[ keys[ key ] ];
        if ( converter ) value = converter( value, keys[ key ] );
        regex = new RegExp( prefix + keys[ key ] + suffix, 'g' );
        tmpl = tmpl.replace( regex, value );
    }
    return tmpl;
}
