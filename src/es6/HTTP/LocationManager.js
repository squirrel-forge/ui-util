/**
 * Requires
 */
import { Exception, EventDispatcher, isPojo } from '@squirrel-forge/ui-util';

/**
 * Location Manager Exception
 * @class
 * @extends Exception
 */
class LocationManagerException extends Exception {}

/**
 * Location Data object
 * @typedef {Object} LocationData
 * @property {null|string} protocol
 * @property {null|string} port
 * @property {null|string} hostname
 * @property {null|string} pathname
 * @property {null|string} search
 * @property {null|string} hash
 */

/**
 * Location Manager
 * @class
 * @extends EventDispatcher
 */
export class LocationManager extends EventDispatcher {

    /**
     * Available protocols
     * @private
     * @property
     * @type {string[]}
     */
    #protocols = [ 'https', 'http' ];

    /**
     * Constructor
     * @constructor
     * @param {null|Array<string>} protocols - List of available protocols
     * @param {null|console} debug - Console or alike object to show debugging
     */
    constructor( protocols = null, debug = null ) {
        super( window, null, debug );

        // Available protocols
        if ( protocols instanceof Array ) this.#protocols = protocols;

        // Popstate logging
        window.addEventListener( 'popstate', ( event ) => { this.#event_popstate( event ); } );
    }

    /**
     * Decode search params string
     * @public
     * @param {string} query - Search params query string
     * @return {Object} - Search params object
     */
    static decodeSearch( query ) {
        if ( query.charAt( 0 ) === '?' ) {
            query = query.substring( 1 );
        }
        const data = {};
        const value_strings = query.split( '&' );
        for ( let i = 0; i < value_strings.length; i++ ) {
            const [ name, value ] = value_strings[ i ].split( '=' );
            if ( name && name.length ) {
                data[ decodeURIComponent( name ) ] = decodeURIComponent( value || '' );
            }
        }
        return data;
    }

    /**
     * Encode search params object
     * @public
     * @param {Object} data - Search params object
     * @return {string} - Encoded search params string
     */
    static encodeSearch( data ) {
        const params = Object.keys( data );
        const query = [];
        for ( let i = 0; i < params.length; i++ ) {
            const param = params[ i ];
            if ( data[ param ] !== null ) {
                query.push( param + '=' + encodeURIComponent( data[ param ] ) );
            }
        }
        return query.join( '&' );
    }

    /**
     * Event popstate
     * @protected
     * @param {PopStateEvent} event - Pop state event object
     * @return {void}
     */
    #event_popstate( event ) {
        if ( this.debug ) {
            this.debug.groupCollapsed( this.constructor.name + '::popState [ ' + location + ' ]' );
            this.debug.log( 'State', event.state );
            this.debug.groupEnd();
        }
    }

    /**
     * Parse protocol
     * @protected
     * @param {null|string} data - Protocol
     * @return {null|string} - Valid protocol
     */
    _update_protocol( data = null ) {
        if ( typeof data === 'string' ) {
            if ( this.#protocols.includes( data ) ) {
                return data;
            }
            return this.#protocols[ 0 ];
        }
        return null;
    }

    /**
     * Parse port
     * @protected
     * @param {null|string|number} data - Port number
     * @return {null|string|number} - Valid port number
     */
    _update_port( data = null ) {

        // Clear port
        if ( data === '' || data === 0 ) {
            return '';
        }

        if ( Number.isInteger( data ) ) {
            return data;
        }
        return null;
    }

    /**
     * Parse hostname
     * @protected
     * @param {null|string} data - Hostname
     * @return {null|string} - Valid hostname
     */
    _update_hostname( data = null ) {
        if ( typeof data === 'string' && data.length && data.indexOf( '.' ) > 0 ) {
            const rx = new RegExp( '(\\w+\\.?)*([\\w\\-]+\\.\\w{2,10})(\\/.*)?$', 'i' );
            if ( rx.test( data ) ) {
                return data;
            } else {
                throw new LocationManagerException( 'Invalid hostname' );
            }
        }
        return null;
    }

    /**
     * Parse url path
     * @protected
     * @param {null|string} data - Url path
     * @return {null|string} - Resolved url path
     */
    _update_pathname( data = null ) {

        // No changes
        if ( data === null ) {
            return null;
        }

        if ( typeof data !== 'string' ) {
            throw new LocationManagerException( 'Invalid pathname' );
        }

        // Resolve path parent path
        if ( data.substring( 0, 2 ) === '..' ) {
            const current = location.pathname.split( '/' );
            const change = data.split( '/' );
            if ( location.pathname.charAt( location.pathname.length - 1 ) === '/' ) {
                current.pop();
            }
            for ( let i = 0; i < change.length; i++ ) {
                if ( change[ i ] === '..' ) {
                    current.pop();
                } else {
                    current.push( change[ i ] );
                }
            }
            return current.join( '/' );

        // relative path update but no resolving
        } else if ( data.charAt( 0 ) !== '/' ) {

            // ./ or nothing is relative to current pathname
            return location.pathname + (
                location.pathname.charAt( location.pathname - 1 ) !== '/' ? '/' : ''
            ) + ( data.substring( 0, 2 ) === './' ? data.substring( 2 ) : data );
        }
        return data;
    }

    /**
     * Parse search params
     * @protected
     * @param {null|string|Object} data - Search params object
     * @return {null|string} - Search params string
     */
    _update_search( data = null ) {

        // No changes
        if ( data === null ) {
            return null;
        }

        // Clear search query
        if ( data === '' ) {
            return '';
        }

        // Convert string if possible
        if ( typeof data === 'string' ) {
            data = this.constructor.decodeSearch( data );
        }

        // Accept only plain objects, assuming none or the correct properties are used
        if ( !isPojo( data ) ) {
            throw new LocationManagerException( 'Invalid query data' );
        }

        // No changes
        if ( !Object.keys( data ).length ) {
            return location.search;
        }

        // Get current search query data and merge updates
        const query = this.constructor.decodeSearch( location.search );
        Object.assign( query, data );

        // Return the updated compiled search query
        return this.constructor.encodeSearch( query );
    }

    /**
     * Parse hash value
     * @protected
     * @param {null|string} data - Hash value
     * @return {null|string} - Null or hash value
     */
    _update_hash( data = null ) {
        if ( typeof data === 'string' ) {
            return data;
        }
        return null;
    }

    /**
     * Get current url with updated data
     * @protected
     * @param {LocationData} data - Location data
     * @param {boolean} absolute - Return as absolute url
     * @return {string} - Url string
     */
    _updated_location( data, absolute = true ) {
        const { hostname, port, pathname } = data;
        let { protocol, search, hash } = data;
        if ( protocol && protocol.length && protocol.charAt( protocol.length - 1 ) !== ':' ) {
            protocol = protocol + ':';
        }
        if ( search && search.length && search.charAt( 0 ) !== '?' ) {
            search = '?' + search;
        }
        if ( hash && hash.length && hash.charAt( 0 ) !== '#' ) {
            hash = '#' + hash;
        }
        return ( absolute ?
            ( protocol || location.protocol ) +
                '//' + ( hostname || location.hostname ) +
                ( port === '' ? '' :  ( port || location.port ) > 0 ? ':' + ( port || location.port ) : ''  )
            : '' ) +
            ( pathname === '' ? '' : pathname || location.pathname ) +
            ( search === '' ? '' : search || location.search ) +
            ( hash === '' ? '' : hash || location.hash );
    }

    /**
     * Get updated location string
     * @public
     * @param {LocationData} data - Location data
     * @param {boolean} absolute - Return as absolute url
     * @return {string} - Url string
     */
    url( data, absolute = true ) {
        if ( !isPojo( data ) || !Object.keys( data ).length ) {
            throw new LocationManagerException( 'Argument data must be a valid LocationData Object' );
        }
        const updated = {};
        const parts = Object.keys( data );
        for ( let i = 0; i < parts.length; i++ ) {
            const part = parts[ i ];
            const method = '_update_' + part;
            if ( this[ method ] ) {
                updated[ part ] = this[ method ]( data[ part ] );
            }
        }
        return this._updated_location( updated, absolute );
    }

    // TODO: path matching function
    // pathMatches( a, b ) return boolean

    // TODO: path contained in path function
    // pathContained( a, b ) return boolean

    /**
     * Get search params or value
     * @public
     * @param {null|string} param - Param name or null to return all
     * @return {string|null|Object} - Param value or param object
     */
    search( param = null ) {
        const search = this.constructor.decodeSearch( location.search );
        if ( param !== null ) {
            if ( typeof search[ param ] !== 'undefined' ) {
                return search[ param ];
            }
            return null;
        }
        return search;
    }

    /**
     * Update page url
     * @public
     * @param {*} state - State data
     * @param {null|string} title - Document title
     * @param {null|LocationData} data - Location data
     * @param {boolean} replace - Replace state
     * @return {void}
     */
    update( state, title = null, data = null, replace = false ) {
        title = title || document.title;
        const url = this.url( data );
        if ( replace ) {
            history.replaceState( state, title, url );
            if ( this.debug ) this.debug.log( this.constructor.name + '::update Replace:', url, state );
        } else {
            if ( location.href === url ) throw new LocationManagerException( 'Argument data must result in an url change' );
            history.pushState( state, title, url );
            if ( this.debug ) this.debug.log( this.constructor.name + '::update Push:', url, state );
        }
    }
}
