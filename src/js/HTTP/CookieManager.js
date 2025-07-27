/**
 * Requires
 */
import { EventDispatcher } from '../Events/EventDispatcher.js';
import { Exception } from '../Error/Exception.js';
import { isEmpty } from '../Var/isEmpty.js';
import { isPojo } from '../Object/isPojo.js';

/**
 * Cookie manager exception
 * @class
 * @extends Exception
 */
class CookieManagerException extends Exception {}

/**
 * Cookie manager
 */
export class CookieManager extends EventDispatcher {

    /**
     * Parse cookies string
     * @param {string} str - Cookies string
     * @return {Object.<string, string>} - Cookie name:value map
     */
    static parseCookies( str ) {
        const cookies = {};
        const raw = str.split( ';' );
        for ( let i = 0; i < raw.length; i++ ) {
            const { name, value } = this.parseCookie( raw[ i ] );
            cookies[ name ] = value;
        }
        return cookies;
    }

    /**
     * Parse cookie string
     * @param {string} str - Cookie string
     * @return {{name: string, value: string}} - Cookie data
     */
    static parseCookie( str ) {
        const parts = str.trim().split( '=' );
        return { name : parts[ 0 ], value : parts[ 1 ] };
    }

    /**
     * Jar cookies string
     * @type {string}
     */
    #jar = '';

    /**
     * Jar cookies object
     * @type {Object.<string, string>}
     */
    #cookies = {};

    /**
     * Constructor
     * @constructor
     * @param {null|console} debug - Console or alike object to show debugging
     */
    constructor( debug ) {
        super( document, null, debug );
        this.refreshJar();
    }

    /**
     * Refresh cookie jar
     * @return {void}
     */
    refreshJar() {
        if ( document.cookie === this.#jar ) return;
        this.#cookies = this.constructor.parseCookies( document.cookie );
        this.#jar = document.cookie;
        this.dispatchEvent( 'cookies.refreshed', { cookies : this.#cookies } );
    }

    /**
     * Set cookie
     * @param {string} name - Cookie name
     * @param {string|number} value - Cookie value
     * @param {('day'|'hr'|'min'|'sec')} mode - Expire mode
     * @param {null|number|Date} expire - Expire date/offset
     * @param {null|number} maxage - Max age in seconds
     * @param {null|string} path - Cookie path
     * @param {('lax'|'strict'|'none')} samesite - Same site restriction
     * @param {boolean} secure - Secure connection only
     * @param {null|string} domain - Cookie domain
     * @return {{name: string, value: string}} - Cookie value
     */
    set( name, value, {
        mode = 'day',
        expire = null,
        maxage = null,
        path = '/',
        samesite = 'strict',
        secure = true,
        domain = null,
    } = {} ) {
        if ( isEmpty( name ) || isEmpty( value ) ) {
            throw new CookieManagerException( 'First two arguments, name and value must be set' );
        }
        const unset = expire === -1000;
        const cookie = { name, value };
        const parts = [
            `${name}=${encodeURIComponent( value )}`,
            `Domain=${domain || window.location.hostname}`,
        ];
        if ( expire ) {
            if ( !( expire instanceof Date ) ) {
                if ( typeof expire !== 'number' ) {
                    throw new CookieManagerException( 'Expire must be a number' );
                }
                const modes = {
                    day : 24 * 60 * 60 * 1000,
                    hr : 60 * 60 * 1000,
                    min : 60 * 1000,
                    sec : 1000,
                };
                if ( typeof modes[ mode ] === 'undefined' ) {
                    throw new CookieManagerException( 'Expire mode must be one of (day|hr|min|sec)' );
                }
                const d = new Date();
                d.setTime( d.getTime() + expire * modes[ mode ] );
                expire = d;
            }
            if ( !( expire instanceof Date ) ) {
                throw new CookieManagerException( 'Expire must be a date or number' );
            }
            parts.push( `Expires=${expire.toUTCString()}` );
        } else if ( maxage ) {
            if ( typeof maxage !== 'number' ) {
                throw new CookieManagerException( 'MaxAge must be a number (seconds)' );
            }
            parts.push( `MaxAge=${maxage}` );
        }
        if ( path ) parts.push( `Path=${path}` );
        if ( samesite ) parts.push( `SameSite=${samesite}` );
        if ( secure ) parts.push( 'Secure' );
        document.cookie = parts.join( '; ' );
        this.dispatchEvent( 'cookie.' + ( unset ? 'unset' : 'set' ), { cookie } );
        this.refreshJar();
        return cookie;
    }

    /**
     * Remove cookie
     * @param {string} name - Cookie name
     * @param {null|Object} options - Setter options
     * @return {void}
     */
    remove( name, options = null ) {
        if ( !this.has( name ) ) return;
        if ( !isPojo( options ) ) options = {};
        options.expire = -1000;
        options.maxage = null;
        this.set( name, '', options );
    }

    /**
     * Get cookie value
     * @param {string} name - Cookie name
     * @return {*|null} - Cookie value
     */
    get( name ) {
        if ( this.#cookies[ name ] ) return this.#cookies[ name ];
        return null;
    }

    /**
     * Check if a cookie name exists
     * @param {string} name - Cookie name
     * @return {boolean} - Exists state
     */
    has( name ) {
        return typeof this.#cookies[ name ] !== 'undefined';
    }
}
