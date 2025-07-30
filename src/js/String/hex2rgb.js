/**
 * Hex to rgb/a css
 * Based on: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @param {string} hex - CSS color hex value
 * @param {null|number} opacity - Opacity
 * @param {boolean} asArray - Return as array instead of string
 * @return {null|string|number[]} - CSS rgb/a color value or array
 */
export function hex2rgb( hex, opacity = null, asArray = false ) {
    const result = /^#?(?<r>[a-f\d]{2})(?<g>[a-f\d]{2})(?<b>[a-f\d]{2})$/i.exec( hex );
    if ( !result ) return null;
    let fn = 'rgb';
    const values = [
        parseInt( result.groups.r, 16 ),
        parseInt( result.groups.g, 16 ),
        parseInt( result.groups.b, 16 ),
    ];
    if ( opacity !== null ) {
        fn += 'a';
        values.push( opacity > 1 ? opacity / 100 : opacity );
    }
    if ( asArray ) return values;
    return `${fn}(${values.join( ',' )})`;
}
