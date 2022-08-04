/**
 * Requires
 */
import { EventDispatcher } from './EventDispatcher';
import { Exception } from '../Error/Exception';
import { isValidFunctionName } from '../String/isValidFunctionName';

/**
 * Callback events exception
 * @class
 * @extends Exception
 */
class CallbackEventsException extends Exception {}

/**
 * Callback events
 * @class
 * @extends EventDispatcher
 */
export class CallbackEvents extends EventDispatcher {

    /**
     * Callback scope
     * @private
     * @property
     * @type {null|Object|window}
     */
    #scope = null;

    /**
     * Event name prefix
     * @private
     * @property
     * @type {string}
     */
    #prefix = 'callback.';

    /**
     * Callbacks name register
     * @private
     * @property
     * @type {Array<string>}
     */
    #callbacks = [];

    /**
     * Constructor
     * @constructor
     * @param {null|HTMLElement|EventDispatcherInterface|Object} element - The target element
     * @param {Object|window} scope - Callback scope
     * @param {string} prefix - Event name prefix
     * @param {null|console} debug - Console or alike object to show debugging
     */
    constructor( element = null, scope = window, prefix = 'callback.', debug = null ) {
        super( element, null, debug );
        if ( !scope || typeof scope !== 'object' ) {
            throw new CallbackEventsException( 'Second argument scope must be an object' );
        }
        if ( !prefix || typeof prefix !== 'string' ) {
            throw new CallbackEventsException( 'Third argument prefix must be a string' );
        }
        this.#scope = scope;
        this.#prefix = prefix;
    }

    /**
     * Require callback by name
     * @param {string} name - Valid callback name
     * @return {void}
     */
    #require_callback( name ) {

        // Only check and register if not done already
        if ( !this.#callbacks.includes( name ) ) {

            // The scope property must be undefined
            if ( typeof this.#scope[ name ] !== 'undefined' ) {
                throw new CallbackEventsException( 'Callback "' + name + '" already defined in scope' );
            }

            /**
             * Callback event dispatcher
             * @public
             * @param {Array} params - Callback arguments
             * @return {void}
             */
            this.#scope[ name ] = ( ...params ) => {
                this.dispatchEvent( name, { name, params } );
            };

            // Register the callback
            this.#callbacks.push( name );
        }
    }

    /**
     * Check name for existing handlers
     * @public
     * @param {string} name - Callback name
     * @return {boolean} - True if event has listeners
     */
    hasSimulated( name ) {
        return super.hasSimulated( this.#prefix + name );
    }

    /**
     * Dispatch callback event
     * @public
     * @param {string} name - Callback name
     * @param {null|object} detail - Event data
     * @param {boolean} bubbles - Allow event to bubble
     * @param {boolean} cancelable - Allow event to be cancelled
     * @return {boolean} - False if cancelled, true otherwise
     */
    dispatchEvent( name, detail = null, bubbles = true, cancelable = false ) {
        return super.dispatchEvent( this.#prefix + name, detail, bubbles, cancelable );
    }

    /**
     * Register callback event listener
     * @public
     * @param {string} name - Callback name
     * @param {Function} callback - Callback to register for event
     * @param {boolean|Object} useCaptureOptions - Capture style or options Object
     * @return {void}
     */
    addEventListener( name, callback, useCaptureOptions = false ) {
        if ( !isValidFunctionName( name ) ) {
            throw new CallbackEventsException( 'Invalid callback function name: ' + name );
        }
        this.#require_callback( name );
        super.addEventListener( this.#prefix + name, callback, useCaptureOptions );
    }
}
