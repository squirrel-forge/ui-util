/**
 * Requires
 */
import { trimChar } from './trimChar.js';

/**
 * Normalize path string
 * @param {string} path - Path to normalize
 * @param {string} separator - Path separator
 * @return {string} - normalized path
 */
export function normalizePath( path, separator = '/' ) {
    return trimChar( path, separator );
}
