/**
 * Equalize element property values
 *
 * @param {NodeList} items - Items collection
 * @param {boolean} cond - Detects the highest element if true, false, resets the property
 * @param {string} read - BoundingClientRect property
 * @param {string} write - Item style property
 *
 * @return {void}
 */
export function equalPropValues( items, cond, read, write ) {
    read = read || 'height';
    write = write || 'minHeight';

    let i, highest = 0;
    const dims = [];

    // Get the max height
    if ( cond ) {
        for ( i = 0; i < items.length; i++ ) {
            items[ i ].style[ write ] = '';
            dims[ i ] = items[ i ].getBoundingClientRect();
            if ( dims[ i ][ read ] > highest ) {
                highest = dims[ i ][ read ];
            }
        }
    }

    // Set or remove min height
    for ( i = 0; i < items.length; i++ ) {
        items[ i ].style[ write ] = highest ? highest + 'px' : '';
    }
}
