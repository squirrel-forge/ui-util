/**
 * Set tabindex for query or collection
 *
 * @param {string|Array|NodeList} source - Query or items to process
 * @param {null|string|number} value - Set as tabindex, ignored when using auto_increment
 * @param {null|number} auto_increment - Set as number to start auto increment
 *
 * @return {void}
 */
export function setTabIndex( source, value, auto_increment = null ) {
    if ( typeof source === 'string' ) {
        source = document.querySelectorAll( source );
    }
    for ( let i = 0; i < source.length; i++ ) {
        if ( auto_increment !== null ) {
            value = auto_increment + i;
        }
        if ( value === null ) {
            source[ i ].removeAttribute( 'tabindex' );
        } else {
            source[ i ].setAttribute( 'tabindex', value );
        }
    }
}
