'use strict';

/**
 * Requires
 */
import { inArray } from '../Array/inArray.js';
import { str2time } from '../String/str2time.js';

/**
 * Cast to type
 *
 * TODO: check compilation causes equality as assignment warning
 *
 * @param {*} value - Value to cast
 * @param {String} type - Type name
 * @param {Boolean} noTypeConversion - Do not convert [array|object|string] across types
 * @param {String} customSplitter - String splitter
 * @param {Array} customStrFalseValues - Array of string values that match false
 *
 *
 * @returns {null|*} - Returns null or the expected type on success
 */
export function cast2type( value, type, noTypeConversion = true, customSplitter = null, customStrFalseValues = null ) {
    const to = typeof value;
    let parsed,
        splitter = ',',
        strFalseValues = [
            '0',
            'false',
            'off',
            ''
        ];

    // Allow custom splitter and false testing
    splitter = customSplitter || splitter;
    strFalseValues = customStrFalseValues || strFalseValues;

    // Parse value
    if ( to !== 'undefined' && value !== null ) {
        switch ( type ) {
        case 'str' :
        case 'string' :
            switch ( to ) {
            case 'string' :
            case 'number' :
                return '' + value;
            case 'boolean' :
                return value ? 'true' : 'false';
            case 'object' :
                if ( !noTypeConversion ) {
                    if ( value instanceof Array ) {
                        return value.join( ',' );
                    }
                    if ( typeof value.toString === 'function' ) {
                        return value.toString();
                    }
                    return '' + value;
                }
            }
            break;
        case 'int' :
        case 'integer' :
            switch ( to ) {
            case 'string' :
            case 'number' :
                parsed = parseInt( value );
                if ( !isNaN( parsed ) ) {
                    return parsed;
                }
                break;
            case 'boolean' :
                return value ? 1 : 0;
            }
            break;
        case 'double' :
        case 'float' :
            switch ( to ) {
            case 'string' :
            case 'number' :
                parsed = parseFloat( value );
                if ( !isNaN( parsed ) ) {
                    return parsed;
                }
                break;
            case 'boolean' :
                return value ? 1 : 0;
            }
            break;
        case 'bool' :
        case 'boolean' :
            switch ( to ) {
            case 'string' :
                return !( !value || inArray( value.toLowerCase(), strFalseValues ) );
            case 'number' :
                return !!value;
            case 'boolean' :
                return value;
            }
            break;
        case 'date' :
            switch ( to ) {
            case 'string' :
                parsed = str2time( value );
                if ( parsed ) {
                    return parsed;
                }
                break;
            case 'number' :
                return new Date( value );
            case 'object' :
                if ( value instanceof Date ) {
                    return value;
                }
            }
            break;
        case 'array' :
            switch ( to ) {
            case 'string' :
                if ( !noTypeConversion ) {
                    if ( value.length ) {
                        return value.split( splitter );
                    }
                    return [];
                }

                /* cant convert array to object
                break;
            case 'object' :
                if ( !noTypeConversion && (value instanceof Array ) ) {
                    return value;
                }
                */
            }
        }
    }
    return null;
}
