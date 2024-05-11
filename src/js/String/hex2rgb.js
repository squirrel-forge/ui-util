/**
 * Hex to rgb/a css
 * Based on: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @param {string} hex - CSS color hex value
 * @param {null|number} opacity - Opacity
 * @return {null|string} - CSS rgb/a color value
 */
export function hex2rgb( hex, opacity = null ) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
    if ( !result ) return null;
    let fn = 'rgb';
    const values = [
        parseInt( result[ 1 ], 16 ),
        parseInt( result[ 2 ], 16 ),
        parseInt( result[ 3 ], 16 ),
    ];
    if ( opacity !== null ) {
        fn += 'a';
        values.push( opacity > 1 ? opacity / 100 : opacity );
    }
    return `${fn}(${values.join( ',' )})`;
}
