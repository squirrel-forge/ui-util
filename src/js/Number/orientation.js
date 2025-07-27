/**
 * Get orientation
 * @param {number} width - Width
 * @param {number} height - Height
 * @return {('square'|'landscape'|'portrait')} - Orientation string
 */
export function orientation( width, height ) {
    return width === height ? 'square' :  width > height ? 'landscape' : 'portrait';
}
