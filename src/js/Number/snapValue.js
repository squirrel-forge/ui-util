/**
 * Snap value
 * @param {number} v - Value
 * @param {number} t - Tolerance
 * @param {number} g - Step
 * @return {number} - Snapped value
 */
export function snapValue( v, t, g ) {
    const r = v % g;
    if ( r < t ) {
        v -= r;
    } else if ( g - r < t ) {
        v += g - r;
    }
    return v;
}
