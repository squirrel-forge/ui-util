/**
 * Save blob as
 * @param {Blob} blob - Blob data
 * @param {string} filename - Download filename
 * @return {void}
 */
export function saveBlobAs( blob, filename ) {
    const a = document.createElement( 'a' );
    const url = window.URL.createObjectURL( blob );
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild( a ); a.click();
    window.URL.revokeObjectURL( url ); a.remove();
}
