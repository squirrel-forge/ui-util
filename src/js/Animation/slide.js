/**
 * @callback SlideActionCompleteCallback
 * @return {void}
 */

/**
 * Local slide animate with css/height
 * @param {HTMLElement} item - Element to animate
 * @param {null|number} speed - Speed in ms
 * @param {null|string} easing - CSS easing function
 * @param {null|string} state - State to animate to if not in toggle mode
 * @param {null|SlideActionCompleteCallback|Function} callback - Optional complete callback
 * @return {void}
 */
function _slide_animate_internal( item, speed = null, easing = null, state = null, callback = null ) {

    // Callback can be any param
    if ( typeof speed === 'function' ) {
        callback = speed;
        speed = null;
    } else if ( typeof easing === 'function' ) {
        callback = easing;
        easing = null;
    }

    // Set custom speed
    speed = typeof speed === 'number' && Number.isInteger( speed ) && speed >= 0 ? speed : 300;

    // Set default css properties
    item.style.display = '';
    item.style.overflow = 'hidden';
    item.style.transitionProperty = 'height';
    item.style.transitionTimingFunction = easing || 'ease';
    item.firstElementChild.style.display = '';
    item.style.transitionDuration = speed + 'ms';

    // Force correct initial state for given target state
    if ( state === 'show' ) {
        item.setAttribute( 'aria-hidden', 'true' );
    } else if ( state === 'hide' ) {
        item.removeAttribute( 'aria-hidden' );
    }

    // Get current state
    const hidden = item.getAttribute( 'aria-hidden' ) === 'true';

    // Set actual height and state if not explicitly set
    if ( !item.style.height ) {
        item.style.height = hidden ? 0 : item.firstElementChild.getBoundingClientRect().height + 'px';
        item[ hidden ? 'setAttribute' : 'removeAttribute' ]( 'aria-hidden', 'true' );
    }

    /**
     * Complete callback
     * @private
     * @return {void}
     */
    const _complete = () => {
        if ( hidden ) {
            item.style.height = '';
            item.style.overflow = '';
        } else {
            item.style.display = 'none';
        }
        if ( typeof callback === 'function' ) {
            callback();
        }
    };

    // TODO: speed 0 skip to complete ? wait for paint ?

    // Has transitionend event
    const hasTransitions = typeof item.style.transition !== 'undefined';

    // Complete event via transition event
    if ( hasTransitions && speed ) {
        item.addEventListener( 'transitionend', _complete, { once : true } );
    }

    // Set the target properties with a delay to avoid calculation tick collision with initial height setting
    // Timeout is set to 10ms since 1ms might still fall into the same paint as the initial state
    window.setTimeout( () => {

        // TODO: wrap into set function and call at speed 0 skip
        item[ hidden ? 'removeAttribute' : 'setAttribute' ]( 'aria-hidden', 'true' );
        item.style.height = hidden ? item.firstElementChild.getBoundingClientRect().height + 'px' : 0;

        // Complete event via timeout
        if ( !hasTransitions || !speed ) {
            window.setTimeout( _complete, speed + 1 );
        }
    }, 10 );
}

/**
 * Slide toggle
 * @param {HTMLElement} item - Element to animate
 * @param {number} speed - Speed in ms
 * @param {null|string} easing - CSS easing function
 * @param {null|SlideActionCompleteCallback|Function} callback - Optional complete callback
 * @return {void}
 */
export function slideToggle( item, speed, easing, callback ) {
    _slide_animate_internal( item, speed, easing, null, callback );
}

/**
 * Slide hide / slideUp equivalent
 * @param {HTMLElement} item - Element to hide
 * @param {number} speed - Speed in ms
 * @param {null|string} easing - CSS easing function
 * @param {null|SlideActionCompleteCallback|Function} callback - Optional complete callback
 * @return {void}
 */
export function slideHide( item, speed, easing, callback ) {
    _slide_animate_internal( item, speed, easing, 'hide', callback );
}

/**
 * Slide show / slideDown equivalent
 * @param {HTMLElement} item - Element to show
 * @param {number} speed - Speed in ms
 * @param {null|string} easing - CSS easing function
 * @param {null|SlideActionCompleteCallback|Function} callback - Optional complete callback
 * @return {void}
 */
export function slideShow( item, speed, easing, callback ) {
    _slide_animate_internal( item, speed, easing, 'show', callback );
}
