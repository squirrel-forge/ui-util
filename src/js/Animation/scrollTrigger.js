/**
 * Requires
 */
import { afterPaint } from './afterPaint.js';
import { cloneObject } from '../Object/cloneObject.js';
import { getVisibility } from '../Layout/getVisibility.js';
import { mergeObject } from '../Object/mergeObject.js';

/**
 * CSS styles description for triggered animation:
 *
 * The default/transition to state
 * ensures that if the script does not work for some reason,
 * objects are not placed in the transition from state,
 * but are in their respective default/transition to state.
 *
 * Default/transition to state properties:
 * [data-scroll-trigger=""],
 * [data-scroll-trigger="complete"] { opacity: 1; }
 *
 * ---
 *
 * Ensures the switch from default/transition to,
 * to the init state/from transition happens instantly:
 *
 * [data-scroll-trigger=""] { transition: none; }
 *
 * ---
 *
 * Defines your transition when activated:
 *
 * [data-scroll-trigger="active"],
 * [data-scroll-trigger="complete"] { transition: 0.5s ease; }
 *
 * ---
 *
 * Defines the properties from which to transition back to default/transition to state.
 *
 * Transition from state properties:
 * [data-scroll-trigger="init"] { opacity: 0; }
 */

/**
 * @typedef {Object} ScrollTriggerOptions
 * @property {string} defaultSelector - Default selector string
 * @property {string} attribute - State attribute name
 * @property {number} objectVisible - Percent of object height visible
 * @property {number} viewCovered - Percent of view height covered by object visible
 * @property {ScrollTriggerStates} states - Default state names
 */

/**
 * @typedef {Object} ScrollTriggerStates
 * @property {string} init - Init state name, after being bound
 * @property {string} active - Active state name, when and while activated
 * @property {string} complete - Complete state name, when activation has completed
 */

/**
 * Default trigger options
 * @type {ScrollTriggerOptions}
 */
const DEFAULT_TRIGGER_OPTIONS = {
    defaultSelector : '[data-scroll-trigger]',
    attribute : 'data-scroll-trigger',
    objectVisible : 75,
    viewCovered : 50,
    states : {
        init : 'init',
        active : 'active',
        complete : 'complete',
    },
};

/**
 * Init scroll trigger
 * @param {string|HTMLElement} selector - Element or selector
 * @param {ScrollTriggerOptions} options - Options object
 * @param {null|Console} debug - Debugger instance
 * @return {Function} - Init trigger
 */
export function scrollTrigger( selector, options = null, debug = null ) {
    const is_element = selector instanceof HTMLElement;
    if ( !is_element && typeof selector !== 'string' ) {
        if ( debug ) debug.error( 'Invalid element or selector', selector );
        return () => {};
    }
    const element = is_element ? selector : document.querySelector( selector );

    // Skip element not found/available
    if ( !element || !element.isConnected ) {
        if ( debug ) debug.error( 'Trigger element not found or connected', selector, element );
        return () => {};
    }

    /**
     * Define local config
     * @private
     * @type {ScrollTriggerOptions}
     */
    const __trigger_config = cloneObject( DEFAULT_TRIGGER_OPTIONS, true );
    if ( options ) mergeObject( __trigger_config, options );

    // Element already bound
    if ( Object.values( __trigger_config.states ).includes( element.getAttribute( __trigger_config.attribute ) ) ) {
        if ( debug ) debug.warn( 'Element trigger already bound', selector, element, __trigger_config );
        return () => {};
    }

    /**
     * Trigger handler
     * @private
     * @return {void}
     */
    const __trigger = function() {
        const state = element.getAttribute( __trigger_config.attribute );
        if ( state === __trigger_config.states.init ) {
            const { elem, view } = getVisibility( element );
            if ( elem > __trigger_config.objectVisible || view > __trigger_config.viewCovered ) {
                document.removeEventListener( 'scroll', __trigger, { passive : true } );
                element.setAttribute( __trigger_config.attribute, __trigger_config.states.active );
                afterPaint( () => {
                    element.setAttribute( __trigger_config.attribute, __trigger_config.states.complete );
                } );
            }
        }
    };
    document.addEventListener( 'scroll', __trigger, { passive : true } );
    element.setAttribute( __trigger_config.attribute, __trigger_config.states.init );
    return __trigger;
}

/**
 * Init multiple scroll triggers
 * @param {string|NodeList|HTMLElement[]} selector - Elements or selector
 * @param {ScrollTriggerOptions} options - Options object
 * @param {null|Console} debug - Debugger instance
 * @return {void}
 */
export function scrollTriggerAll( selector = null, options = null, debug = null ) {
    if ( !selector ) selector = options?.defaultSelector ?? DEFAULT_TRIGGER_OPTIONS.defaultSelector;
    const elements = typeof selector !== 'string' ? selector : document.querySelectorAll( selector );
    for ( let i = 0; i < elements.length; i++ ) {
        scrollTrigger( elements[ i ], options, debug )();
    }
}
