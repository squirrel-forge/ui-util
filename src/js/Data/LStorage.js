/**
 * Requires
 */
import { Exception } from '../Error/Exception.js';
import { strand } from '../String/strand.js';

/**
 * Local storage exception
 * @class
 * @extends Exception
 */
class LStorageException extends Exception {}

/**
 * Local storage
 * @class
 */
export class LStorage {

    /**
     * Storage is available
     * @public
     * @static
     * @return {boolean}
     */
    static available() {
        const test = strand();
        try {
            localStorage.setItem( test, test );
            if ( localStorage.getItem( test ) !== test ) return false;
            localStorage.removeItem( test );
            return true;
        } catch( e ) {
            return false;
        }
    }

    /**
     * Get current size
     * @public
     * @static
     * @return {Promise<number>} - Bytes stored
     */
    static getCurrentSize() {
        return new Promise( ( resolve ) => {
            let _lsTotal = 0, _xLen, _x;
            for ( _x in localStorage ) {
                if ( !localStorage.hasOwnProperty( _x ) ) continue;
                _xLen = ( ( localStorage[ _x ].length + _x.length ) * 2 );
                _lsTotal += _xLen;
            }
            resolve( _lsTotal );
        } );
    }

    /**
     * Test storage max value
     * @public
     * @static
     * @param {number} max - Max length
     * @param {number} offset - Offset count
     * @return {Promise<number>} - Max length written
     */
    static testMaxValue( max = 250000, offset = 100 ) {
        return new Promise( ( resolve ) => {
            const defined = 'ls_max';
            const known = parseInt( localStorage.getItem( defined ) ?? '0' );
            const key = 'value_test';
            let size = offset, value;
            if ( known > 0 ) {
                resolve( known );
            } else {
                const last_value = localStorage.getItem( key );
                if ( last_value && last_value.length ) {
                    localStorage.setItem( defined, `${last_value.length}` );
                    resolve( last_value.length );
                } else {
                    try {
                        while ( size < max ) {
                            value = 'Ü'.repeat( size );
                            localStorage.setItem( key, value );
                            if ( localStorage.getItem( key )?.length !== value.length ) {
                                size -= offset;
                                throw new LStorageException( 'Value size test miss match' );
                            }
                            size += offset;
                        }
                    } catch ( e ) {}
                }
            }
            resolve( size );
        } );
    }

    /**
     * Cleanup max test
     * @public
     * @static
     * @param {boolean} full - Remove info item also
     * @return {void}
     */
    static testMaxClean( full = false ) {
        const key = 'value_test';
        localStorage.removeItem( key );
        if ( full ) {
            const defined = 'ls_max';
            localStorage.removeItem( defined );
        }
    }

    /**
     * Temp storage
     * @private
     * @type {Object}
     */
    #temp;

    /**
     * Storage available
     * @private
     * @type {boolean}
     */
    #available;

    /**
     * Key prefix
     * @private
     * @type {string}
     */
    #prefix;

    /**
     * Constructor
     * @constructor
     * @param {string} prefix - Prefix
     * @param {Object} temp - Temp reference
     */
    constructor( prefix = '', temp = {} ) {
        if ( typeof prefix !== 'string' ) throw new LStorageException( `First argument prefix, must be of type string` );
        this.#prefix = prefix;
        this.#temp = temp;
        this.#available = LStorage.available();
    }

    /**
     * Getter: prefix
     * @public
     * @return {string} - Prefix string
     */
    get prefix() { return this.#prefix; }

    /**
     * Setter: prefix
     * @public
     * @param {string} value - Prefix string
     * @return {void}
     */
    set prefix( value ) {
        if ( typeof value !== 'string' ) throw new LStorageException( `Property prefix, must be of type string` );
        this.#prefix = value;
    }

    /**
     * Get value from key
     * @public
     * @param {string} key - Key
     * @return {*|null|string} - Value
     */
    get( key ) {
        if ( typeof key !== 'string' ) throw new LStorageException( `First argument key, must be of type string` );
        const ident = `${this.#prefix}${key}`;
        if ( !this.#available ) return this.#temp[ ident ] ?? null;
        return localStorage.getItem( ident );
    }

    /**
     * Set value for key
     * @public
     * @param {string} key - Key
     * @param {string} value - Value
     * @return {void}
     */
    set( key, value ) {
        if ( typeof key !== 'string' ) throw new LStorageException( `First argument key, must be of type string` );
        if ( typeof value !== 'string' ) throw new LStorageException( `Second argument value, must be of type string` );
        const ident = `${this.#prefix}${key}`;
        if ( !this.#available ) {
            this.#temp[ ident ] = value;
        } else {
            localStorage.setItem( ident, value );
        }
    }

    /**
     * Remove given key value
     * @public
     * @param {string} key - Key
     * @return {void}
     */
    remove( key ) {
        const ident = `${this.#prefix}${key}`;
        if ( !this.#available ) {
            delete this.#temp[ ident ];
        } else {
            localStorage.removeItem( ident );
        }
    }

    /**
     * Clear all data
     * @public
     * @return {void}
     */
    clear() {
        if ( !this.#available ) {
            this.#temp = {};
        } else {
            localStorage.clear();
        }
    }
}
