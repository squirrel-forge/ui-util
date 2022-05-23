/**
 * Requires
 */
import { gcd } from './gcd.js';

/**
 * Ratio
 * @class
 */
export class Ratio {

    /**
     * Ratio factory
     * @param {string|number} width - Width or string expression
     * @param {string|number} height - Height or separator
     * @param {string} separator - Ratio separator
     * @return {Ratio} - New ratio instance
     */
    static make( width, height = null, separator = ':' ) {
        return new Ratio( width, height, separator );
    }

    /**
     * Separator
     * @private
     * @property
     * @type {string}
     */
    #s = ':';

    /**
     * Ratio
     * @private
     * @property
     * @type {number}
     */
    #r = 0;

    /**
     * X ratio
     * @private
     * @property
     * @type {number}
     */
    #x = 0;

    /**
     * Y ratio
     * @private
     * @property
     * @type {number}
     */
    #y = 0;

    /**
     * Input width
     * @private
     * @property
     * @type {number}
     */
    #w = 0;

    /**
     * Input height
     * @private
     * @property
     * @type {number}
     */
    #h = 0;

    /**
     * Constructor
     * @param {string|number} width - Width or string expression
     * @param {string|number} height - Height or separator
     * @param {string} separator - Ratio separator
     */
    constructor( width, height = null, separator = ':' ) {

        // Create new ratio with same values
        if ( width instanceof Ratio ) {
            height = width.w;
            separator = width.separator;
            width = width.h;
        } else if ( typeof width === 'string' ) {

            // Argument combined values
            if ( typeof height === 'string' ) {
                separator = height;
            }
            const nums = width.split( separator );
            width = parseInt( nums[ 0 ] );
            height = parseInt( nums[ 1 ] );
        }

        // Force invalid numbers to 0
        if ( !Number.isInteger( width ) || width < 0 ) width = 0;
        if ( !Number.isInteger( height ) || height < 0 ) height = 0;

        // Must be two integers above 0
        if ( !width || !height || !Number.isInteger( width ) || !Number.isInteger( height ) ) {
            throw new Error( 'The width and/or height property must be an integer larger than 0.' );
        }

        // Set current properties
        this.separator = separator;
        this.#r = !width && !height ? 1 : gcd( width, height );
        this.#x = width / this.#r;
        this.#y = height / this.#r;
        this.#w = width;
        this.#h = height;
    }

    /**
     * Getter: Ratio value
     * @public
     * @return {number} - Ratio value
     */
    get r() { return this.#r; }

    /**
     * Getter: Input width
     * @public
     * @return {number} - Input width
     */
    get w() { return this.#w; }

    /**
     * Getter: Input height
     * @public
     * @return {number} - Input height
     */
    get h() { return this.#h; }

    /**
     * Getter: X ratio
     * @public
     * @return {number} - X ratio
     */
    get x() { return this.#x; }

    /**
     * Getter: Y ratio
     * @public
     * @return {number} - Y ratio
     */
    get y() { return this.#y; }

    /**
     * Getter: separator
     * @public
     * @return {string} - Separator string
     */
    get separator() { return this.#s; }

    /**
     * Setter: separator
     * @public
     * @param {string} str - Separator string
     * @return {void}
     */
    set separator( str ) {
        if ( typeof str !== 'string' || !str.length ) {
            throw new Error( 'Invalid separator string, must contain at least one character.' );
        }
        this.#s = str;
    }

    /**
     * To string converted
     * @public
     * @return {string} - Ratio expression
     */
    toString() {
        return this.#x + this.#s + this.#y;
    }
}
