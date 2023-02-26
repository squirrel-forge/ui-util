/**
 * Bind events to each element
 * @param {null|Array|NodeList} elements - List of elements
 * @param {Array} events - List of addEventListener params
 * @param {boolean} unbind - Remove event listeners
 * @return {void}
 */
export function bindNodeList( elements, events, unbind = false ) {
    if ( !( elements instanceof Array || elements instanceof NodeList ) ) {
        throw new Error( 'bindNodeList() First argument elements must be a NodeList or an Array of HTMLElement' );
    }
    if ( !( events instanceof Array ) ) {
        throw new Error( 'bindNodeList() Second argument events must be an Array of addEventListener arguments' );
    }
    for ( let i = 0; i < elements.length; i++ ) {
        for ( let j = 0; j < events.length; j++ ) {
            if ( !( events[ j ] instanceof Array && events[ j ].length > 1 ) ) {
                throw new Error( 'bindNodeList() Second argument events array must only contain Arrays of addEventListener arguments' );
            }
            elements[ i ][ ( unbind ? 'remove' : 'add' ) + 'EventListener' ]( ...events[ j ] );
        }
    }
}
