/**
 * Requires
 */
import { EventDispatcher } from '../Events/EventDispatcher.js';
import { AsyncRequest } from '../HTTP/AsyncRequest.js';
import { isEmpty } from '../Var/isEmpty.js';
import { isPojo } from '../Object/isPojo.js';

/**
 * Exception handler
 * @class
 * @extends EventDispatcher
 */
export class ExceptionHandler extends EventDispatcher {

    /**
     * Convert any type to string
     * @public
     * @static
     * @param {*} subject - Value to convert
     * @param {boolean} shouldThrow - Throw errors
     * @return {string} - Value as string representation
     */
    static any2String( subject, shouldThrow = false ) {
        const to = typeof subject;

        // Return if already a string
        if ( to === 'string' ) return subject;

        // Use default toString converter if available
        if ( typeof subject.toString === 'function' ) return subject.toString();

        // Attempt to serialize
        try {
            return JSON.stringify( subject, ( key, value ) => {
                if ( typeof value === 'function' ) return `fn[${value.name}]`;
                return value;
            }, 2 );
        } catch ( error ) {
            if ( shouldThrow ) throw error;
        }

        // Attempt to cast to string
        try {
            return `${subject}`;
        } catch ( error ) {
            if ( shouldThrow ) throw error;
        }

        // Return unknown
        return `unknown[${to}]`;
    }

    /**
     * Get report handler
     * @param {null|Object|Function} fields - Extend request and/or field data
     * @param {string|AsyncRequestConfig} options - Url or request options
     * @param {string} eventName - Event name to bind
     * @return {(string|function(Event): void)[]} - Async request reporting handler
     */
    static getPostReportHandler( fields, options, eventName = 'error.always' ) {

        /**
         * Exception event handler
         * @param {CustomEvent} event - Exception event
         * @return {void}
         */
        return [ eventName, ( event ) => {
            const error = event?.details?.error?.toString();
            if ( isEmpty( error ) ) return;
            const request = new AsyncRequest( options );
            if ( typeof options.method !== 'string' ) request.method = 'post';
            const data = new FormData();
            data.append( 'error', error );
            switch ( typeof fields ) {
            case 'function' :
                fields( data, request );
                break;
            case 'object' :
                if ( isPojo( fields ) ) {
                    const entries = Object.entries( fields );
                    for ( let i = 0; i < entries.length; i++ ) {
                        data.append( ...entries[ i ] );
                    }
                }
            }
            request.send( data );
        } ];
    }

    /**
     * Event prefix
     * @private
     * @type {string}
     */
    #eventPrefix;

    /**
     * Suppress exception output
     * @private
     * @type {boolean}
     */
    #suppress;

    /**
     * Constructor
     * @constructor
     * @param {null|EventDispatcherInterface|HTMLElement} host - Event host
     * @param {string} prefix - Error event prefix
     * @param {boolean} suppress - Suppress error output
     * @param {null|Array<Array>} handlers - Add event handlers
     */
    constructor( host, { prefix = 'error', suppress = true, handlers = null } = {} ) {
        host = host || window;
        super( host );
        this.#eventPrefix = prefix;
        this.#suppress = suppress;
        if ( handlers instanceof Array ) this.addEventList( handlers );
        this.#bind();
    }

    /**
     * Event prefix getter
     * @public
     * @return {null|string} - Event prefix
     */
    get prefix() {
        return this.#eventPrefix;
    }

    /**
     * Bind global events
     * @private
     * @return {void}
     */
    #bind() {
        window.addEventListener( 'error', ( event ) => {
            if ( this.#suppress ) event.preventDefault();
            this.catch( event, 'ErrorEvent' );
        } );
        window.addEventListener( 'unhandledrejection', ( event ) => {
            if ( this.#suppress ) event.preventDefault();
            this.catch( event, 'PromiseRejectionEvent' );
        } );
    }

    /**
     * Handle exception
     * @public
     * @param {Event|Error|Exception|string|number} input - Error input
     * @param {('Error'|'Exception'|'String'|'Number'|'Event'|'ErrorEvent'|'PromiseRejectionEvent')|null} type - Input type
     * @return {void}
     */
    catch( input, type = null ) {
        if ( !type ) type = this.detectType( input );

        /**
         * To string converter
         * @return {string} - Error string
         */
        const toString = function() { return `${this.type || 'Unknown'}#${this.message}`; };
        const message = 'Unknown';
        const error = { type, message, toString };
        error.toString.bind( error );
        let subject = input;
        switch ( type ) {
        case 'PromiseRejectionEvent' : subject = input.reason || input; break;
        case 'ErrorEvent' : subject = input.error || input.message; break;
        case 'Event' : subject = input?.details.message || input.type; break;
        }
        error.message = this.constructor.any2String( subject );
        if ( this.dispatchEvent( `${this.prefix}.always`, { input, type, error } ) ) {
            this.dispatchEvent( `${this.prefix}.${type || 'unknown'}`, { input, type, error } );
        }
    }

    /**
     * Detect error type
     * @public
     * @param {*} input - Error input
     * @return {('Error'|'Exception'|'String'|'Number'|'Event'|'ErrorEvent'|'PromiseRejectionEvent')|null} - Error type
     */
    detectType( input ) {
        switch ( typeof input ) {
        case 'number' : return 'Number';
        case 'string' : return 'String';
        case 'object' :
            if ( input instanceof Error && input.previous ) return 'Exception';
            if ( input instanceof Error ) return 'Error';
            if ( input instanceof PromiseRejectionEvent || input.promise && input.reason ) return 'PromiseRejectionEvent';
            if ( input instanceof ErrorEvent || input.message && input.error ) return 'ErrorEvent';
        }
        return null;
    }
}
