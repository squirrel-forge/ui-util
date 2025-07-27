/**
 * Copy to clipboard fallback
 * @param {string} text - String to copy
 * @param {null|console|Object} debug - Debug object
 * @return {void}
 */
export function copyToClipboardFallback( text, debug = null ) {
    const textArea = document.createElement( 'textarea' );
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild( textArea );
    textArea.focus();
    textArea.select();

    try {
        document.execCommand( 'copy' );
    } catch ( err ) {
        if ( debug ) debug.error( 'Failed to copy to clipboard', err );
    }

    document.body.removeChild( textArea );
}

/**
 * Copy to clipboard
 * @param {string} text - String to copy
 * @param {null|console|Object} debug - Debug object
 * @return {Promise<boolean|null>} - Copy success status
 */
export async function copyToClipboard( text, debug = null ) {
    if ( !navigator.clipboard ) {
        copyToClipboardFallback( text, debug );
        return null;
    }
    try {
        await navigator.clipboard.writeText( text );
    } catch ( err ) {
        if ( debug ) debug.error( 'Failed to copy to clipboard', err );
        return false;
    }
    return true;
}
