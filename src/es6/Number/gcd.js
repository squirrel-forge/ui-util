/**
 * Get the common denominator
 *
 * @param {number} a - First number
 * @param {number} b - Second number
 *
 * @return {number} - Common denominator
 */
export function gcd( a, b ) {
    return  b === 0  ? a : gcd( b, a % b );
}
