/**
 * Poll for condition
 * @param {Function} check - Checker
 * @param {Function} success - Success callback
 * @param {number} interval - Interval time
 * @param {number} timeout - Timeout time
 * @param {null|Function} failed - Timeout callback
 * @return {Function} - Abort/complete function
 */
export function poll( check, success, { interval = 50, timeout = 60000, failed = null } = {} ) {
    const state = { interval : null, count : 0, limit : timeout ? Math.ceil( timeout / interval ) : 0 };

    /**
     * Complete callback
     * @return {void}
     */
    const complete = () => { window.clearInterval( state.interval ); };
    state.interval = window.setInterval( () => {
        if ( check( state.count ) ) {
            complete();
            success();
        }
        if ( state.limit && state.count >= state.limit ) {
            complete();
            if ( failed ) failed();
        }
        state.count++;
    } );
    return complete;
}
