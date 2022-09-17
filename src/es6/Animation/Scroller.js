/**
 * Requires
 */
import { EventDispatcher } from '../Events/EventDispatcher.js';
import { docReady } from '../Events/docReady.js';
import { scrollComplete } from './scrollComplete.js';
import { scrollTo } from './scrollTo.js';
import { mergeObject } from '../Object/mergeObject.js';
import { isPojo } from '../Object/isPojo.js';

/**
 * @typedef {Object} ScrollerOptions
 * @property {number|HTMLElement|Function|Array} offset - Offset pixels, element, Function or Array of arguments, default: null
 * @property {boolean} bind - Bind scrollTo links, default: true
 * @property {document.body|HTMLElement} context - Context to select scrollTo links from, default: document.body
 * @property {string} selector - Scroll to link selector, default: [href^="#"]
 * @property {boolean} autoTop - Scroll to top when using only # or #top without an actual element target
 * @property {boolean} capture - Capture initial scroll, default: true
 * @property {number|'ready'|Array} initial - Initial scroll delay after capture
 * @property {null|Function} complete - Complete callback for local scrollTo
 */

/**
 * Scroller
 * @class
 * @extends EventDispatcher
 */
export class Scroller extends EventDispatcher {

    /**
     * Get url with new hash value
     * @public
     * @static
     * @param {string} hash - New hash string excluding #
     * @param {null|string} url - Custom url, default uses location.href
     * @return {string} - Updated href string
     */
    static getUrlWithHash( hash, url = null ) {
        return ( url || window.location.href ).split( '#' )[ 0 ] + '#' + hash;
    }

    /**
     * Config
     * @public
     * @property
     * @type {null|Object|ScrollerOptions}
     */
    config = null;

    /**
     * Initial scroll target
     * @public
     * @property
     * @type {null|HTMLElement}
     */
    initial = null;

    /**
     * Constructor
     * @constructor
     * @param {Object|ScrollerOptions} options - Scroller options
     * @param {null|console|Object} debug - Debug object
     */
    constructor( options = {}, debug = null ) {
        super( window, null, debug );

        // Set default config
        this.config = {
            offset : 0,
            bind : true,
            context : document.body,
            selector : '[href^="#"], [href*="#"]',
            autoTop : false,
            capture : true,
            initial : 1000,
            complete : null,
        };

        // Update config
        if ( isPojo( options ) ) {
            mergeObject( this.config, options );
        }

        // Capture and bind
        if ( this.config.capture ) this.#capture();
        if ( this.config.bind ) this.bind();
    }

    /**
     * Scroll to wrapper
     * @public
     * @param {HTMLElement} element - Target element
     * @param {null|Function} complete - Complete callback
     * @return {void}
     */
    scrollTo( element, complete ) {
        let params = this.config.offset;
        if ( !( params instanceof Array ) ) params = [ params ];
        params.unshift( element );
        if ( typeof complete === 'undefined' ) complete = this.config.complete;
        const not_cancelled = this.dispatchEvent( 'scroll.before', {
            scrollTarget : element,
            params : params,
        }, true, true );
        if ( not_cancelled ) {
            scrollComplete( () => {
                this.dispatchEvent( 'scroll.after', { scrollTarget : element } );
                if ( typeof complete === 'function' ) complete( element );
            } );
            scrollTo( ...params );
        }
    }

    /**
     * Event scroll to click
     * @private
     * @param {Event} event - Click event
     * @return {void}
     */
    #event_scrollToClick( event ) {

        // Check if action is disabled
        if ( event.currentTarget.getAttribute( 'data-scrollto' ) !== 'true' ) {
            return;
        }

        // Find the target id
        let id = null;
        const href = event.currentTarget.getAttribute( 'href' );
        const hash = href.indexOf( '#' );
        if ( hash === 0 ) {
            id = href.substring( 1 );
        } else if ( hash > 0 ) {
            const parts = href.split( '#' );
            if ( location.pathname === parts[ 0 ] ) id = parts[ 1 ] || '';
        }

        // Find the target
        let target = document.getElementById( id );
        if ( this.config.autoTop && !target && ( id === '' || id === 'top' ) ) {
            target = document.body;
        }

        // Scroll to target or warn in debug mode
        if ( target ) {
            this.scrollTo( target );
            event.preventDefault();
        } else if ( this.debug ) {
            this.debug.warn( this.constructor.name + '::event_scrollToClick No valid target for: ', id, event.currentTarget );
        }
    }

    /**
     * Bind scroll to events
     * @public
     * @param {null|document.body|HTMLElement} context - Context to select scrollTo links from, default: document.body
     * @param {null|string} selector - Scroll to link selector, default: [href^="#"]
     * @return {void}
     */
    bind( context = null, selector = null ) {

        // Get config defaults
        context = context || this.config.context;
        selector = selector || this.config.selector;

        // Find links
        const links = this.config.context.querySelectorAll( selector );
        if ( !links.length && this.debug ) {
            this.debug.warn( this.constructor.name + '::bind No scrollTo links found in context:', context );
        }

        // Bind all unbound links
        for ( let i = 0; i < links.length; i++ ) {
            if ( !links[ i ].hasAttribute( 'data-scrollto' ) ) {
                links[ i ].addEventListener( 'click', ( event ) => { this.#event_scrollToClick( event ); } );
                links[ i ].setAttribute( 'data-scrollto', 'true' );
            }
        }
    }

    /**
     * Capture hash scroll
     * @private
     * @return {void}
     */
    #capture() {
        const hash = window.location.hash;

        // Catch hash and prevent native scroll, to allow initial smooth scroll
        if ( hash && hash.length > 1 ) {

            // Only update if an actual target is found
            this.initial = document.getElementById( hash.substr( 1 ) );
            if ( this.initial ) {
                history.replaceState( null, document.title, this.constructor.getUrlWithHash( 's2:' + hash.substr( 1 ) ) );
            }
        }

        // Scroll when ready
        if ( this.config.initial === 'ready' ) {
            docReady( () => { this.#initial_scroll( hash ); } );
        } else if ( this.config.initial instanceof Array ) {
            this.#initial_bind_custom( [ ...this.config.initial ] );
        } else if ( typeof this.config.initial === 'number' ) {

            // Delayed initial scroll
            window.setTimeout( () => { this.#initial_scroll( hash ); }, this.config.initial );
        } else {

            // Instant scroll
            this.#initial_scroll( hash );
        }
    }

    /**
     * Bind custom initial event
     * @private
     * @param {string} hash - Hash reference
     * @param {Array} params - Arguments
     * @return {void}
     */
    #initial_bind_custom( hash, params ) {

        // Get event target
        const target = params.shift();

        // Verify options
        if ( typeof target.addEventListener !== 'function' ) {
            throw new Error( this.constructor.name + '::capture() First initial argument must be an event target' );
        }
        if ( typeof params[ 0 ] !== 'string' || !params[ 0 ].length ) {
            throw new Error( this.constructor.name + '::capture() Second initial argument must be an event name' );
        }
        if ( typeof params[ 1 ] !== 'function' ) {
            throw new Error( this.constructor.name + '::capture() Thrid initial argument must be an event handler' );
        }

        // Wrap callback
        const callback = params[ 1 ];
        params[ 1 ] = ( event ) => {
            callback( event, hash, () => { this.#initial_complete( hash ); } );
        };

        // By default add once option
        if ( typeof params[ 2 ] === 'undefined' ) {
            params[ 2 ] = { once : true };
        }
        target.addEventListener( ...params );
    }

    /**
     * Scroll to initial element and reset hash
     * @private
     * @param {string} hash - Hash to reset to
     * @return {void}
     */
    #initial_scroll( hash ) {
        if ( this.initial instanceof HTMLElement ) {

            // Scroll to initial target and restore hash after scroll complete
            this.scrollTo( this.initial, () => { this.#initial_complete( hash ); } );
        }
    }

    /**
     * Reset hash
     * @private
     * @param {string} hash - Hash to reset to
     * @return {void}
     */
    #initial_complete( hash ) {
        history.replaceState( null, document.title, this.constructor.getUrlWithHash( hash.substr( 1 ) ) );
        this.dispatchEvent( 'scroll.initial.complete', { initial : this.initial } );
    }
}
