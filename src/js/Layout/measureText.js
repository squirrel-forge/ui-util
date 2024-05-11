/**
 * Requires
 */
import { afterPaint } from '../Animation/afterPaint.js';
import { appendHTML } from '../DOM/appendHTML.js';
import { isPojo } from '../Object/isPojo.js';
import { strand } from '../String/strand.js';

/**
 * Measure text dimensions
 * @param {string} text - Text to measure
 * @param {Object|HTMLElement} styles - Styles object or reference element
 * @param {null|string[]} which - Which styles to use from reference element
 * @return {Promise<DOMRect>} - Text dimensions
 */
export function measureText( text, styles, which = [] ) {
    return new Promise( ( resolve, reject ) => {
        if ( typeof text !== 'string' ) {
            reject( new Error( 'First argument text must be a string' ) );
            return;
        }

        const applied = {};
        if ( !isPojo( styles ) ) {
            if ( styles instanceof HTMLElement ) {
                const use = [
                    'fontFamily',
                    'fontKerning',
                    'fontOpticalSizing',
                    'fontPalette',
                    'fontSize',
                    'fontStretch',
                    'fontStyle',
                    'fontSynthesis-small-caps',
                    'fontSynthesis-style',
                    'fontSynthesis-weight',
                    'fontVariant',
                    'fontVariantAlternates',
                    'fontVariantCaps',
                    'fontVariantEastAsian',
                    'fontVariantLigatures',
                    'fontVariantNumeric',
                    'fontWeight',
                    'letterSpacing',
                    'lineHeight',
                    'tabSize',
                    'textRendering',
                    'textSizeAdjust',
                    'textTransform',
                    'wordSpacing',
                ].concat( which );

                const computed = getComputedStyle( styles );
                for ( let i = 0; i < use.length; i++ ) {
                    const prop = use[ i ];
                    const value = computed[ prop ];
                    if ( typeof value !== 'undefined' ) applied[ prop ] = value;
                }
            } else {
                reject( new Error( 'Second argument styles must be a plain object or a HTMLElement' ) );
                return;
            }
        } else {
            Object.assign( applied, styles );
        }
        applied.position = 'absolute';
        applied.whiteSpace = 'nowrap';

        const instance_id = `measure-text-width-${strand()}`;
        const wrapper = {
            pointerEvents : 'none',
            position : 'fixed',
            width : 0,
            height : 0,
            overflow : 'hidden',
            opacity : 0,
        };

        const markup = `<div id="${instance_id}" style="${strStyle( wrapper )}">` +
            `<div style="${strStyle( applied )}">${text}</div></div>`;
        appendHTML( document.body, markup );
        const measure = document.getElementById( instance_id );
        afterPaint( () => {
            const result = measure.firstElementChild.getBoundingClientRect();
            measure.remove();
            resolve( result );
        } );
    } );
}
