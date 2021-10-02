/**
 * Generate a random string
 *
 * @return {string} - A random string
 */
export function strand() {
    return Math.random().toString( 36 ).substring( 2, 12 );
}
