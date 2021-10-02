/**
 * Wrap text lines in span elements
 *
 * TODO: add hyphen handling - <wbr> &shy; etc.
 *
 * @param {HTMLElement} elem - Target element
 *
 * @return {void}
 */
export function wrapTextByLines( elem ) {

    // Remember original text
    if ( !elem.hasAttribute( 'data-splittext' ) ) {
        elem.setAttribute( 'data-splittext', elem.innerText );
    }

    // Set default one line height
    elem.innerHTML = 'A';

    // Base info
    const plaintext = elem.getAttribute( 'data-splittext' );
    const height_limit = elem.getBoundingClientRect().height;

    // Reset element
    elem.classList.remove( 'text-wrapped-by-lines' );
    elem.innerHTML = '';

    // Get text by spaces
    const text_parts = plaintext.split( ' ' );
    const lines = [];

    // Detect line wraps
    let i, s = true, spl = 0, e;
    for ( i = 0; i < text_parts.length; i++ ) {
        elem.innerHTML += ( s ? '' : ' ' ) + text_parts[ i ];
        s = false;

        // Last addition breaks to next line
        if ( elem.getBoundingClientRect().height > height_limit ) {
            lines.push( text_parts.slice( spl, i ).join( ' ' ) );
            spl = i;
            elem.innerHTML = text_parts[ i ];
        }

        // Compile last line
        if ( i + 1 === text_parts.length ) {
            lines.push( text_parts.slice( spl, i + 1 ).join( ' ' ) );
        }
    }

    // Apply single line wrapped text
    elem.innerHTML = '';
    for ( i = 0; i < lines.length; i++ ) {

        // Create next line
        e = document.createElement( 'span' );
        e.innerHTML = lines[ i ];
        elem.appendChild( e );

        // Add linebreak inbetween lines
        if ( i + 1 < lines.length ) {
            elem.appendChild( document.createTextNode( '\n' ) );
        }

        // Mark as processed
        elem.classList.add( 'text-wrapped-by-lines' );
    }
}
