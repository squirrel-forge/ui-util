/**
 * Get json object from element data attribute
 *
 * @param {string} name - Attribute name
 * @param {HTMLElement} element - Target element
 * @param {boolean} silent - Do not throw exception on error but return null, default: true
 *
 * @return {null|Object} - Null or a successfully parsed object
 */
export function attributeJSON( name, element, silent = true ) {
    silent = silent !== false;

    const value = element.getAttribute( 'data-' + name );
    let result;

    if ( typeof value !== 'string' || !value.length ) {
        return null;
    }

    try {
        result = JSON.parse( value );
    } catch ( error ) {
        if ( !silent ) {
            window.console.error( error );
            throw new Error( '[AttributeJSONException] Could not parse attribute "' + name + '" value' );
        }
        return null;
    }

    return result;
}
