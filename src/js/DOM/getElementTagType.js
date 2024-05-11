/**
 * Get element tag-type
 * @param {HTMLElement} element - Element
 * @return {string} - Tag-type string
 */
export function getElementTagType( element ) {
    if ( !( element instanceof HTMLElement ) ) {
        throw new Error( 'getElementTagType() Argument element must be a HTMLElement' );
    }
    const tag = element.tagName.toLowerCase();
    return tag + ( typeof element.type === 'string' && element.type.length ? '-' + element.type.toLowerCase() : '' );
}
