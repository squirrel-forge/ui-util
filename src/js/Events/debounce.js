/**
 * @callback DebounceEventHandler
 * @param {Event} event - Event object
 * @return {void}
 */

/**
 * Debounce event
 * @param {Function|DebounceEventHandler} func - Event handler
 * @param {null|number} delay - Debounce delay, default: 350
 * @param {null|Function} always - Always run callback
 * @return {function(*=): void} - Wrapped callback
 */
export function debounce( func, delay = null, always = null ) {
    delay = typeof delay === 'number' ? delay : 350;
    let timer = 0;
    return function( ...params ) {
        let cancel = false;
        if ( always ) cancel = always( ...params );
        if ( timer ) {
            window.clearTimeout( timer );
            timer = 0;
        }
        if ( !cancel ) timer = window.setTimeout( func, delay, ...params );
    };
}
