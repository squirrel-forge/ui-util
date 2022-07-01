/**
 * Bind events to each element
 * @param {null|Array|NodeList} elements - List of elements
 * @param {Array} events - List of addEventListener params
 * @param {boolean} unbind - Remove event listeners
 * @return {void}
 */
export function bindNodeList( elements, events, unbind ) {
    unbind = !!unbind;
    if ( !( elements instanceof Array || elements instanceof NodeList ) ) {
        throw new Error( 'bindNodeList() Argument elements must be a NodeList or an Array' );
    }
    if ( !( events instanceof Array ) ) {
        throw new Error( 'bindNodeList() Argument events must be an Array' );
    }
    for ( let i = 0; i < elements.length; i++ ) {
        for ( let j = 0; j < events.length; j++ ) {
            if ( !( events[ j ] instanceof Array ) ) {
                throw new Error( 'bindNodeList() Argument events array must only contain addEventListener arguments as Arrays' );
            }
            elements[ i ][ ( unbind ? 'remove' : 'add' ) + 'EventListener' ]( ...events[ j ] );
        }
    }
}
