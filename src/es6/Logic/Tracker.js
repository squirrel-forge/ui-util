/**
 * Requires
 */
import { cloneObject } from '../Object/cloneObject.js';

/**
 * @callback TrackingTrigger
 * @param {Tracker} tracker - Tracker instance that is running the trigger
 * @param {...*} event_args - Any number of additional arguments assigned by the event call the trigger
 * @return {boolean} - True if trigger matches and event should be fired
 */

/**
 * @callback TrackingGroup - Callback to supply a dynamic tracking group name
 * @param {Tracker} tracker - Tracker instance that is running the trigger
 * @param {...*} event_args - Any number of additional arguments assigned by the event call the trigger
 * @return {string} - Tracking group name
 */

/**
 * @callback TrackingDataCallback - Callback that can be used to fetch dynamic values for the TrackingData definition
 * @param {Tracker} tracker - Tracker instance that is running the trigger
 * @param {...*} event_args - Any number of additional arguments assigned by the event calling the trigger
 * @return {*} - Any value that should be set for the given property
 */

/**
 * @callback TrackingExecutor - Executes the tracking call
 * @param {Object} data - The tracking data
 * @return {void}
 */

/**
 * @typedef {Object} TrackingData - Data layer object
 * @property {...*|TrackingDataCallback} * - Any number of properties, values that are functions are executed as TrackingDataCallback
 */

/**
 * @typedef {Object} TrackerDefinition - Tracking definition object
 * @property {TrackingTrigger|Function} trigger - Event trigger function
 * @property {undefined|string} once - Unique reference name
 * @property {string|TrackingGroup|Function} group - Event grouping name or function
 * @property {TrackingData|Object} data - Data that is pushed to dataLayer
 */

/**
 * Tracking helper
 * @class
 */
export class Tracker {

    /**
     * Debug object
     * @private
     * @property
     * @type {null|console|Object}
     */
    #debug = null;

    /**
     * Tracking function
     * @private
     * @property
     * @type {null|TrackingExecutor|Function}
     */
    #exec = null;

    /**
     * Events fired once register
     * @private
     * @property
     * @type {Object}
     */
    #events_fired = {};

    /**
     * Get tracking data
     * @public
     * @static
     * @param {TrackerDefinition|Object} tracker - Tracking definition
     * @param {Array<*>} params - Info arguments
     * @return {TrackingData|Object} - Compiled tracking data
     */
    static getData( tracker, params ) {
        const data = cloneObject( tracker.data, true );
        const entries = Object.entries( data );
        for ( let i = 0; i < entries.length; i++ ) {
            const [ prop, value ] = entries[ i ];
            if ( typeof value === 'function' ) {
                data[ prop ] = value( ...params );
            }
        }
        return data;
    }

    /**
     * Constructor
     * @constructor
     * @param {null|TrackingExecutor|Function} executor - Tracking function
     * @param {null|console} debug - Console or alike object to show debugging
     */
    constructor( executor = null, debug = null ) {

        // Debugger instance
        this.#debug = debug;

        // Customizable executor
        if ( typeof executor !== 'function' ) {
            executor = ( data ) => { window.dataLayer.push( data ); };
        }
        this.#exec = executor;
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
     * Run trackers
     * @private
     * @param {Array<TrackerDefinition>|TrackerDefinition} trackers - List of trackers or single tracker
     * @param {Array<*>} params - Info arguments
     * @return {void}
     */
    run( trackers, params = [] ) {
        if ( !( trackers instanceof Array ) ) trackers = [ trackers ];

        // Add plugin as first reference
        params.unshift( this );

        // And run trackers
        for ( let i = 0; i < trackers.length; i++ ) {
            this.#track( trackers[ i ], params );
        }
    }

    /**
     * Run tracker
     * @param {TrackerDefinition|Object} tracker - Tacking definition
     * @param {Array<*>} params - Info arguments
     * @return {void}
     */
    #track( tracker, params ) {

        // Prevent events from firing more than once
        if ( this.ranOnceAlready( tracker, params ) ) return;

        // Check for a tracking condition
        if ( tracker.trigger( ...params ) ) {
            if ( this.#debug ) this.#debug.log( this.constructor.name + '::track Triggered:', tracker, params );
            this.#track_once( tracker, params );
            this.#exec( this.constructor.getData( tracker, params ) );
        }
    }

    /**
     * Get tracking group
     * @private
     * @param {TrackerDefinition|Object} tracker - Tacking definition
     * @param {Array<*>} params - Info arguments
     * @return {string} - Group name
     */
    #get_group( tracker, params ) {
        let group = tracker.group;
        if ( typeof tracker.group === 'function' ) {
            group = tracker.group( ...params );
        }
        return group || 'default';
    }

    /**
     * Check trackers once option
     * @public
     * @param {TrackerDefinition|Object} tracker - Tracking definition
     * @param {Array<*>} params - Info arguments
     * @return {boolean} - True if tracker was already run
     */
    ranOnceAlready( tracker, params = [] ) {
        if ( tracker.once ) {
            const group = this.#get_group( tracker, params );
            if ( !this.#events_fired[ group ] ) this.#events_fired[ group ] = [];
            if ( this.#events_fired[ group ].includes( tracker.once ) ) return true;
        }
        return false;
    }

    /**
     * Clear all or group specific once tracking
     * @public
     * @param {null|string} group - Group string to clear a specific event register
     * @return {void}
     */
    clearOnce( group = null ) {
        if ( group ) {
            this.#events_fired[ group ] = [];
        } else {
            this.#events_fired = {};
        }
    }

    /**
     * Track as completed
     * @private
     * @param {TrackerDefinition|Object} tracker - Tracking definition
     * @param {Array<*>} params - Info arguments
     * @return {void}
     */
    #track_once( tracker, params ) {
        if ( tracker.once ) {
            const group = this.#get_group( tracker, params );
            this.#events_fired[ group ].push( tracker.once );
        }
    }
}
