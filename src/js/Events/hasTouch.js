/**
 * Has touch support
 * @return {boolean} - True if supported
 */
export function hasTouch() {
    return 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
}
