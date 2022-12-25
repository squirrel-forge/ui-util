/**
 * Requires
 */
import { Exception } from '../Error/Exception.js';
import { cloneObject } from '../Object/cloneObject.js';
import { mergeObject } from '../Object/mergeObject.js';

/**
 * Draggables exception
 * @class
 * @extends Exception
 */
class DraggablesException extends Exception {}

/**
 * Draggable data
 * @typedef {Object} DraggableData
 * @property {HTMLElement} draggable - Draggable element
 * @property {HTMLElement} container - Constraint container
 * @property {null|DraggableOnBefore|Function} onbefore - On before callback
 * @property {null|DraggableOnStart|Function} onstart - On start callback
 * @property {null|DraggableOnEnd|Function} onend - On end callback
 * @property {null|DraggableOnMove|Function} onmove - On drag set position callback
 * @property {null|DraggableOnClick|Function} onclick - On click callback
 * @property {('both'|'x'|'y')} axis - Draggable axis
 * @property {('start'|'left'|'center'|'middle'|'right'|'end')} offsetX - Draggable element x offset orientation
 * @property {('start'|'top'|'center'|'middle'|'bottom'|'end')} offsetY - Draggable element y offset orientation
 * @property {boolean} overflowX - Allow drag overflow on x
 * @property {boolean} overflowY - Allow drag overflow on y
 * @property {boolean} local - Use local click handler
 */

/**
 * Draggable before drag callback
 * @callback DraggableOnBefore
 * @param {MouseEvent} event - Mouse down event
 * @param {DraggableData} _dgbl - Draggable data
 * @return {boolean} - Return false to prevent drag start
 */

/**
 * Draggable started drag callback
 * @callback DraggableOnStart
 * @param {MouseEvent} event - Mouse down event
 * @param {DraggableData} _dgbl - Draggable data
 * @return {void}
 */

/**
 * Draggable ended drag callback
 * @callback DraggableOnEnd
 * @param {MouseEvent} event - Mouse up event
 * @param {DraggablePosition} position - Current position
 * @param {DraggablePositionChange} change - Position change
 * @param {DraggableData} _dgbl - Draggable data
 * @return {void}
 */

/**
 * Draggable move callback
 * @callback DraggableOnMove
 * @param {MouseEvent} event - Mouse move event
 * @param {DraggablePosition} position - Current position
 * @param {DraggablePositionChange} change - Position change
 * @param {DraggableData} _dgbl - Draggable data
 * @return {void}
 */

/**
 * Draggable click callback
 * @callback DraggableOnClick
 * @param {MouseEvent} event - Mouse up event
 * @param {DraggablePositionChange} change - Position change
 * @param {DraggableData} _dgbl - Draggable data
 * @return {void}
 */

/**
 * Draggable axis values
 * @typedef {Object} DraggableAxisValues
 * @property {undefined|number} x - X value
 * @property {undefined|number} y - Y value
 */

/**
 * Draggable axis position
 * @typedef {Object} DraggableAxisPosition
 * @property {number} px - Relative pixel position
 * @property {number} percent - Relative percent position
 */

/**
 * Draggable position
 * @typedef {Object} DraggablePosition
 * @property {undefined|DraggableAxisPosition} x - Horizontal axis position
 * @property {undefined|DraggableAxisPosition} y - Vertical axis position
 */

/**
 * Draggable position change
 * @typedef {Object} DraggablePositionChange
 * @property {number} deltaX - Delta x change
 * @property {number} deltaY - Delta y change
 * @property {boolean} xMoved - X axis moved
 * @property {boolean} yMoved - Y axis moved
 */

/**
 * Draggables
 * @class
 */
export class Draggables {

    /**
     * Default draggable data
     * @private
     * @type {DraggableData}
     */
    #defaults = {
        draggable : null,
        container : null,
        onbefore : null,
        onstart : null,
        onend : null,
        onmove : null,
        onclick : null,
        axis : 'both',
        offsetX : 'start',
        offsetY : 'start',
        overflowX : false,
        overflowY : false,
        local : false,
    };

    /**
     * Dragging state
     * @private
     * @type {boolean}
     */
    #dragging = false;

    /**
     * Dragging reset timeout
     * @private
     * @type {number}
     */
    #reset_timeout = 0;

    /**
     * Active draggable data
     * @private
     * @type {null|DraggableData}
     */
    #active = null;

    /**
     * Axis min thresholds
     * @private
     * @type {DraggableAxisValues}
     */
    #min = { x : 0, y : 0 };

    /**
     * Axis start values
     * @private
     * @type {DraggableAxisValues}
     */
    #start = { x : 0, y : 0 };

    /**
     * Axis offset values
     * @private
     * @type {DraggableAxisValues}
     */
    #offset = { x : 0, y : 0 };

    /**
     * Draggable context
     * @private
     * @type {null|window|HTMLElement}
     */
    #context = null;

    /**
     * Constructor
     * @constructor
     * @param {null|DraggableData|Array<DraggableData>} draggables - Draggable data
     * @param {window|HTMLElement} context - Context
     */
    constructor( draggables = null, context = window ) {
        if ( context !== window && !( context instanceof HTMLElement && context.isConnected ) ) {
            throw new DraggablesException( 'Argument context must be window or a connected HTMLElement' );
        }
        this.#context = context;
        this.#bind_global();
        if ( draggables ) this.bind( draggables );
    }

    /**
     * Threshold X getter
     * @public
     * @return {number} - Horizontal min threshold
     */
    get thresholdX() {
        return this.#min.x;
    }

    /**
     * Threshold X setter
     * @public
     * @param {number} value - Horizontal min threshold
     * @return {void}
     */
    set thresholdX( value ) {
        if ( typeof value !== 'number' || Number.isNaN( value ) || value < 0 ) {
            throw new DraggablesException( 'Invalid thresholdX, value must be 0 or a positive number' );
        }
        this.#min.x = value;
    }

    /**
     * Threshold Y getter
     * @public
     * @return {number} - Vertical min threshold
     */
    get thresholdY() {
        return this.#min.y;
    }

    /**
     * Threshold Y setter
     * @public
     * @param {number} value - Vertical min threshold
     * @return {void}
     */
    set thresholdY( value ) {
        if ( typeof value !== 'number' || Number.isNaN( value ) || value < 0 ) {
            throw new DraggablesException( 'Invalid thresholdY, value must be 0 or a positive number' );
        }
        this.#min.y = value;
    }

    /**
     * Bind global event handlers
     * @private
     * @return {void}
     */
    #bind_global() {
        this.#context.addEventListener( 'mousemove', ( event ) => { this.#event_global_mousemove( event ); }, { passive : true } );
        this.#context.addEventListener( 'mouseup', ( event ) => { this.#event_global_mouseup( event ); } );
    }

    /**
     * Bind draggable
     * @private
     * @param {DraggableData} _dgbl - Draggable data
     * @return {DraggableData} - Draggable data
     */
    #data( _dgbl ) {
        const data = cloneObject( this.#defaults );
        mergeObject( data, _dgbl );
        return data;
    }

    /**
     * Validate draggable data
     * @private
     * @param {DraggableData} _dgbl - Draggable data
     * @return {void}
     */
    #validate( _dgbl ) {
        if ( !( _dgbl.draggable instanceof HTMLElement ) ) throw new DraggablesException( 'Argument draggable must be a HTMLElement' );
        if ( !( _dgbl.container instanceof HTMLElement ) ) throw new DraggablesException( 'Argument container must be a HTMLElement' );
        if ( typeof _dgbl.onmove !== 'function' && typeof _dgbl.onend !== 'function' ) throw new DraggablesException( 'Argument onmove or onend must be a Function' );
    }

    /**
     * Event global mousemove
     * @private
     * @param {MouseEvent} event - Mouse move event
     * @return {void}
     */
    #event_global_mousemove( event ) {

        /**
         * Draggable data
         * @private
         * @type {null|DraggableData}
         */
        const _dgbl = this.#active;
        if ( !_dgbl ) return;

        // Get delta distances
        const delta = this.#get_delta( event );

        // One of must be at threshold to start dragging
        if ( _dgbl.axis === 'both' && !delta.xMoved && !delta.yMoved
            || _dgbl.axis === 'x' && !delta.xMoved
            || _dgbl.axis === 'y' && !delta.yMoved ) {
            return;
        }

        // Begin dragging
        this.#dragging = true;

        // Get current X and Y
        const position = this.#get_position( delta.deltaX, delta.deltaY, _dgbl );

        // Call on move handler
        _dgbl.onmove( event, position, delta, _dgbl );
    }

    /**
     * Get delta values
     * @private
     * @return {DraggablePositionChange}
     */
    #get_delta( event ) {
        const deltaX = event.clientX - this.#start.x;
        const deltaY = event.clientY - this.#start.y;
        const xMoved = Math.abs( deltaX ) > this.#min.x;
        const yMoved = Math.abs( deltaY ) > this.#min.y;
        return { deltaX, deltaY, xMoved, yMoved };
    }

    /**
     * Get full position
     * @private
     * @param {number} deltaX - Delta x change
     * @param {number} deltaY - Delta y change
     * @param {DraggableData} _dgbl - Draggable data
     * @return {DraggablePosition} - Current position
     */
    #get_position( deltaX, deltaY, _dgbl ) {
        const parent = _dgbl.container.getBoundingClientRect();
        const element = _dgbl.draggable.getBoundingClientRect();
        let x, y;
        if ( _dgbl.axis === 'both' || _dgbl.axis === 'x' ) x = this.#get_axis_pos( _dgbl, deltaX, 'x', 'left', 'width', parent, element );
        if ( _dgbl.axis === 'both' || _dgbl.axis === 'y' ) y = this.#get_axis_pos( _dgbl, deltaY, 'y', 'top', 'height', parent, element );
        return { x, y };
    }

    /**
     * Get axis position
     * @private
     * @param {DraggableData} _dgbl - Draggable data
     * @param {number} delta - Axis delta change
     * @param {('x'|'y')} axis - Axis to calculate
     * @param {string} rel - Axis parent relative
     * @param {string} size - Axis parent and element size
     * @param {DOMRect} parent - Parent dom rectangle
     * @param {DOMRect} element - Element dom rectangle
     * @return {DraggableAxisPosition} - Axis position
     */
    #get_axis_pos( _dgbl, delta, axis, rel, size, parent, element ) {

        // Calculate base position
        let px = this.#start[ axis ] + delta - parent[ rel ] - this.#offset[ axis ];

        // Add offset if required
        switch ( _dgbl[ 'offset' + axis.toUpperCase() ] ) {
        case 'end' :
        case 'right' :
        case 'bottom' :
            px += element[ size ];
            break;
        case 'middle' :
        case 'center' :
            px += element[ size ] / 2;
            break;
        }

        // Enforce limits
        if ( !_dgbl[ 'overflow' + axis.toUpperCase() ] ) {
            if ( px < 0 ) {
                px = 0;
            } else if ( px > parent[ size ] ) {
                px = parent[ size ];
            }
        }

        // Get relative percentage
        const percent = px / parent[ size ] * 100;

        // Return new position
        return { px, percent };
    }

    /**
     * Event global mouseup
     * @private
     * @param {MouseEvent} event - Mouse up event
     * @return {void}
     */
    #event_global_mouseup( event ) {
        this.#event_local_mouseup( event, this.#active );
    }

    /**
     * Event local mouseup
     * @private
     * @param {MouseEvent} event - Mouse up event
     * @param {DraggableData} _dgbl - Draggable data
     * @return {void}
     */
    #event_local_mouseup( event, _dgbl ) {
        if ( !_dgbl || _dgbl !== this.#active ) return;

        // Clear active
        this.#active = null;

        // Get delta distances
        const delta = this.#get_delta( event );

        // Get current X and Y
        const position = this.#get_position( delta.deltaX, delta.deltaY, _dgbl );

        // Run click handler if not moved
        if ( _dgbl.onclick && ( _dgbl.axis === 'both' && !delta.xMoved && !delta.yMoved
            || _dgbl.axis === 'x' && !delta.xMoved
            || _dgbl.axis === 'y' && !delta.yMoved ) ) {
            _dgbl.onclick( event, position, delta, _dgbl );
        } else if ( _dgbl.onend ) {

            // Run drag end handler
            _dgbl.onend( event, position, delta, _dgbl );
        }

        // Clear dragging state
        setTimeout( () => {
            this.#dragging = false;
        }, this.#reset_timeout );
    }

    /**
     * Event local mousedown
     * @private
     * @param {MouseEvent} event - Mouse down event
     * @param {DraggableData} _dgbl - Draggable data
     * @return {void}
     */
    #event_local_mousedown( event, _dgbl ) {

        // Draggable check callback
        if ( _dgbl.onbefore && _dgbl.onbefore( event, _dgbl ) === false ) return;

        // Get start position
        this.#start.x = event.clientX;
        this.#start.y = event.clientY;

        // Define offset for draggable object
        const target = event.target.getBoundingClientRect();
        this.#offset.x = event.clientX - target.left;
        this.#offset.y = event.clientY - target.top;

        // Set active
        this.#active = _dgbl;

        // Run start callback
        if ( _dgbl.onstart ) _dgbl.onstart( event, _dgbl );
    }

    /**
     * Bind draggable
     * @private
     * @param {DraggableData} _dgbl - Draggable data
     * @return {DraggableData} - Compiled draggable data
     */
    #bind( _dgbl ) {
        _dgbl = this.#data( _dgbl );
        this.#validate( _dgbl );
        _dgbl.draggable.addEventListener( 'mousedown', ( event ) => { this.#event_local_mousedown( event, _dgbl ); } );
        if ( _dgbl.local ) _dgbl.draggable.addEventListener( 'mouseup', ( event ) => { this.#event_local_mouseup( event, _dgbl ); } );
        return _dgbl;
    }

    /**
     * Bind draggable/s
     * @public
     * @param {DraggableData|Array<DraggableData>} draggables - Draggable data
     * @return {DraggableData|Array<DraggableData>} - Compiled draggable data
     */
    bind( draggables ) {
        if ( !draggables ) throw new Error( 'Argument draggables must be an Object or Array of DraggableData' );
        let was_array = true;
        if ( !( draggables instanceof Array ) ) {
            was_array = false;
            draggables = [ draggables ];
        }
        const result = [];
        for ( let i = 0; i < draggables.length; i++ ) {
            result.push( this.#bind( draggables[ i ] ) );
        }
        return was_array ? result : result.pop();
    }
}
