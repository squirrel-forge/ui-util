/**
 * Get focusable elements in context
 * @param {document|HTMLElement} context - Selection context
 * @param {boolean} last - Last instead of first element
 * @param {null|string} selector - Focusable selector
 * @return {null|HTMLElement} - Focusable element
 */
export function getFocusable( context, last = false, selector = null ) {
    selector = selector || 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const elements = [ ...context.querySelectorAll( selector ) ];
    if ( elements.length ) {
        if ( last === true ) return elements.pop();
        return elements.shift();
    }
    return null;
}

/**
 * Resolve condition
 * @private
 * @param {boolean|Function} condition - Condition
 * @return {boolean} - Focus lock is active
 */
function _tab_focus_lock_resolve_condition( condition ) {
    if ( typeof condition === 'function' ) return !!condition();
    return !!condition;
}

/**
 * Restrict tab focus within given element
 * @param {HTMLElement} context - Focus context
 * @param {boolean|Function} condition - Conditional active control
 * @param {boolean} loop - Loop element focus
 * @param {null|string} selector - Focusable selector
 * @return {(function(): void)} - Unbind/remove function
 */
export function tabFocusLock( context, condition = true, loop = true, selector = null ) {

    // Last element focus
    let previous_focus = null;

    /**
     * Keyup event handler
     * @private
     * @param {Event} event - Event
     * @return {void}
     */
    const _handle = function _tab_focus_lock_handler( event ) {
        if ( event.keyCode === 9 || event.key === 'Tab' ) {
            if ( _tab_focus_lock_resolve_condition( condition ) ) {
                if ( !context.contains( document.activeElement ) ) {
                    event.preventDefault();
                    let element;
                    if ( loop ) {
                        const first = getFocusable( context, false, selector );
                        const last = getFocusable( context, true, selector );
                        element = previous_focus === first ? last : first;
                    } else {
                        element = getFocusable( context, event.shiftKey, selector );
                    }
                    if ( element ) element.focus();
                } else {
                    previous_focus = document.activeElement;
                }
            }
        }
    };

    // Bind and return remover
    document.addEventListener( 'keyup', _handle );
    return () => {
        document.removeEventListener( 'keyup', _handle );
    };
}
