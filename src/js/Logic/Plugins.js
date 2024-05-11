/**
 * Requires
 */
import { Exception } from '../Error/Exception.js';

/**
 * Plugins exception
 * @class
 * @extends Exception
 */
class PluginsException extends Exception {}

/**
 * Plugins class
 * @class
 */
export class Plugins {

    /**
     * Debug object
     * @private
     * @property
     * @type {null|console|Object}
     */
    #debug = null;

    /**
     * Plugins context
     * @private
     * @property
     * @type {null|Object}
     */
    #context = null;

    /**
     * Loaded plugins map
     * @private
     * @property
     * @type {Object}
     */
    #plugins = {};

    /**
     * Append/prepend context to arguments
     * @private
     * @property
     * @type {null|boolean}
     */
    append = true;

    /**
     * Constructor
     * @constructor
     * @param {Array<Function|Array<Function,*>>} plugins - Plugins to load
     * @param {null|Object} context - Plugin context
     * @param {boolean} append - Append or prepend context to method arguments
     * @param {null|console|Object} debug - Debug object
     */
    constructor( plugins = [], context = null, append = true, debug = null ) {
        if ( context && typeof context !== 'object' ) {
            throw new PluginsException( 'Argument context must be null or an Object' );
        }
        this.#debug = debug;
        this.#context = context;
        this.append = append;
        this.load( plugins );
    }

    /**
     * Get context name
     * @private
     * @return {string} - Context name
     */
    #get_context_name() {
        let name = 'unknown', id = null;
        if ( this.#context ) {
            if ( this.#context.constructor && this.#context.constructor.name ) {
                name = this.#context.constructor.name;
            }
            if ( this.#context.type ) name = this.#context.type;
            if ( this.#context.name ) name = this.#context.name;
            if ( this.#context.dom && this.#context.dom.id ) id = this.#context.dom.id;
            if ( this.#context.id ) id = this.#context.id;
        }
        return name + ( id ? '#' + id : '' );
    }

    /**
     * Get debug prefix
     * @return {string} - Origin string
     */
    #debug_prefix() {
        return this.#get_context_name() + '->' + this.constructor.name + '::';
    }

    /**
     * Debug getter
     * @public
     * @return {null|console|Object} - Debug reference
     */
    get debug() {
        return this.#debug;
    }

    /**
     * Context getter
     * @public
     * @return {null|Object} - Context reference
     */
    get context() {
        return this.#context;
    }

    /**
     * Load plugins
     * @public
     * @param {Array<Function|Array<Function,*>>} plugins - Plugins to load
     * @return {void}
     */
    load( plugins ) {
        if ( !( plugins instanceof Array ) ) {
            throw new PluginsException( 'Argument plugins must be an Array' );
        }
        if ( this.#debug ) this.#debug.group( this.#debug_prefix() + 'load' );
        for ( let i = 0; i < plugins.length; i++ ) {
            let data = plugins[ i ];
            if ( !( data instanceof Array ) ) {
                data = [ data ];
            }
            this.init( ...data );
        }
        if ( this.#debug ) this.#debug.groupEnd();
    }

    /**
     * Initialize plugin
     * @public
     * @param {Function} Construct - Constructor
     * @param {null|Object} options - Plugin options
     * @param {boolean} replace - Replace existing plugin instance
     * @return {Object} - Plugin instance
     */
    init( Construct, options = {}, replace = false ) {
        if ( typeof Construct !== 'function' ) {
            throw new PluginsException( 'Argument Construct expected function but got: ' + typeof Construct );
        }
        const name = Construct.pluginName || Construct.name;
        if ( !replace && this.#plugins[ name ] ) {
            throw new PluginsException( 'Plugin already defined: ' + name );
        }
        try {
            this.#plugins[ name ] = new Construct( options, this.#context, this.#debug );
        } catch ( e ) {
            throw new PluginsException( 'Error initializing plugin: ' + name, e );
        }
        if ( this.#debug ) this.#debug.log( this.#debug_prefix() + 'init', name );
        return this.#plugins[ name ];
    }

    /**
     * Run plugin methods async
     * @public
     * @param {string} method - Method name
     * @param {Array} params - Method arguments
     * @param {Array<string>} restrict - Restrict exec by names
     * @return {Array<Promise>} - Plugin promises
     */
    runAsync( method, params = [], restrict = null ) {
        const run = this.run( method, params, restrict );
        const values = Object.values( run );
        const promises = [];
        for ( let i = 0; i < values.length; i++ ) {
            if ( typeof values[ i ].then === 'function' ) {
                promises.push( values[ i ] );
            }
        }
        return promises;
    }

    /**
     * Run plugin methods
     * @public
     * @param {string} method - Method name
     * @param {Array} params - Method arguments
     * @param {Array<string>} restrict - Restrict exec by names
     * @return {Object} - Result object
     */
    run( method, params = [], restrict = null ) {
        if ( this.#debug ) this.#debug.group( this.#debug_prefix() + 'run', method );
        const results = {};
        const names = Object.keys( this.#plugins );
        for ( let i = 0; i < names.length; i++ ) {
            if ( !restrict || !restrict.length || restrict.includes( names[ i ] ) ) {
                const res = this.exec( names[ i ], method, params );
                if ( res !== null ) {
                    results[ names[ i ] ] = res;
                }
            }
        }
        if ( this.#debug && !Object.keys( results ).length ) {
            this.#debug.log( this.#debug_prefix() + 'run No results:', method, params, restrict );
        }
        if ( this.#debug ) this.#debug.groupEnd();
        return results;
    }

    /**
     * Run method on named plugin
     * @public
     * @param {string} name - Plugin name
     * @param {string} method - Method name
     * @param {Array} params - Method Arguments
     * @param {boolean} silent - Skip on exception
     * @return {null|*} - Plugin method return value
     */
    exec( name, method, params = [], silent = false ) {

        // Throw error on invalid plugin call
        if ( !this.#plugins[ name ] ) {
            if ( silent ) return null;
            throw new PluginsException( 'Plugin not loaded: ' + name );
        }

        // Params must be array
        if ( !( params instanceof Array ) ) params = [ params ];

        // Prepend/append context to params
        if ( this.#context && this.append !== null ) {
            if ( this.append ) {
                if ( params[ params.length - 1 ] !== this.#context ) params.push( this.#context );
            } else if ( params[ 0 ] !== this.#context ) {
                params.unshift( this.#context );
            }
        }

        // Get method result
        let result = null;
        if ( this.#plugins[ name ][ method ] ) {
            try {
                result = this.#plugins[ name ][ method ]( ...params );
            } catch ( e ) {
                throw new PluginsException( 'Plugin method "' + method + '" failed to run: ' + name, e );
            }
            if ( this.#debug ) this.#debug.log( this.#debug_prefix() + 'exec', name, method );
        } else if ( this.#debug ) {
            this.#debug.log( this.#debug_prefix() + 'exec Unknown method', method, 'on plugin', name );
        }
        return result;
    }

    /**
     * Get plugin
     * @public
     * @param {string} name - Plugin name
     * @return {null|Object} - Plugin instance
     */
    get( name ) {
        return this.#plugins[ name ] || null;
    }

    /**
     * Has plugin
     * @public
     * @param {string} name - Plugin name
     * @return {boolean} - Plugin exists
     */
    has( name ) {
        return !!this.#plugins[ name ];
    }

    /**
     * Require any number of plugins
     * @param {string[]} names - Any number of names to check
     * @return {Array<Object>} - List of plugins
     */
    require( ...names ) {
        const result = [];
        for ( let i = 0; i < names.length; i++ ) {
            if ( !this.has( names[ i ] ) ) {
                throw new PluginsException( 'Failed with unmet plugin requirement: ' + names[ i ] );
            }
            result.push( this.get( names[ i ] ) );
        }
        return result;
    }
}
