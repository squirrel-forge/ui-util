/**
 * Requires
 */
import { isPojo } from '../Object/isPojo.js';

/**
 * Test data
 * @typedef {Object} TestData
 * @property {string} name - Test name
 * @property {TRTestType} type - Test type
 * @property {Function} subject - Test subject, function or class constructor
 * @property {TRIOTestCase[]} io - Input output case definitions
 */

/**
 * Available test types
 * @typedef {('function'|'class')} TRTestType
 */

/**
 * Input output case definition
 * @typedef {Array<TRIOTestArguments,IOExpectedResult>} TRIOTestCase
 */

/**
 * Test case arguments
 * @typedef {null|*[]} TRIOTestArguments
 */

/**
 * Expected test return value
 * @typedef {*} IOExpectedResult
 */

/**
 * Test result data
 * @typedef {Array<string,string,TRTestCaseResults|Error>} TRTestResult
 */

/**
 * Test cases data
 * @typedef {Array<null|*[],*,*,boolean>} TRTestCaseResults
 */

/**
 * Test case result [returnValue,boolean]
 * @typedef {(*|boolean)[]} TRIOTestResult
 */

/**
 * TestRunner
 * @class
 */
export class TestRunner {

    /**
     * Renderer
     * @public
     * @property
     * @type {null|Console|Object}
     */
    render = null;

    /**
     * Constructor
     * @constructor
     * @param {undefined|null|Console|Object} render - Renderer
     */
    constructor( render ) {
        this.render = render || window.console;
    }

    /**
     * Display results
     * @public
     * @param {TRTestResult[]} results - Test results
     * @return {void}
     */
    display( results ) {
        if ( !( results instanceof Array ) ) throw new Error( 'Argument results must be an Array of TestRunner results' );
        const style = 'background:black;color:lightblue';
        this.render.log( `%c --- TestRunner with ${results.length} test${results.length === 1 ? '' : 's'} --- `, style );
        let total = 0,
            total_fails = 0;
        for ( let i = 0; i < results.length; i++ ) {
            const [ name, type, tests ] = results[ i ];
            total += tests.length;
            let fails = 0;
            for ( let j = 0; j < tests.length; j++ ) {
                if ( !tests[ j ][ 3 ] ) fails++;
            }
            if ( fails ) {
                total_fails += fails;
                this.render.group( `${i + 1}# ${name}[${type}] with ${fails} of ${tests.length} case${tests.length === 1 ? '' : 's'} failed ❌` );
            } else {
                this.render.groupCollapsed( `${i + 1}# ${name}[${type}] with ${tests.length} case${tests.length === 1 ? '' : 's'} ✅` );
            }
            for ( let j = 0; j < tests.length; j++ ) {
                const [ args, expected, ret, result ] = tests[ j ];
                if ( result === true ) {
                    this.render.groupCollapsed( `Case: ${j + 1} ✅` );
                } else {
                    this.render.group( `Case: ${j + 1} ❌` );
                }
                this.render.log( 'Arguments =', args );
                this.render.log( 'Expected =', expected );
                this.render.log( 'Return =', ret );
                this.render.groupEnd();
            }
            this.render.groupEnd();
        }
        this.render.log( `%c --- Overview: ${results.length} test${results.length === 1 ? '' : 's'} with ${total} case${total === 1 ? '' : 's'}${total_fails > 0 ? ' ' + ( total - total_fails ) : ''} ✅ ${total_fails > 0 ? total_fails + ' ❌ ' : ''}--- `, style );
    }

    /**
     * Run tests
     * @public
     * @param {Array<TestData>} tests - Test data list
     * @throws {Error}
     * @return {TRTestResult[]} - Test results
     */
    run( tests ) {
        if ( !( tests instanceof Array ) ) throw new Error( 'Argument tests must be of type Array<TestData>' );
        const results = [];
        for ( let i = 0; i < tests.length; i++ ) {
            const { name, io, type, subject } = tests[ i ];
            try {
                results.push( [ name, type, this.#run( type, name, subject, io ) ] );
            } catch ( e ) {
                results.push( [ name, type, e ] );
            }
        }
        return results;
    }

    /**
     * Run test
     * @private
     * @param {TRTestType} type - Test type string
     * @param {string} name - Subject name
     * @param {Function} subject - Function or class for testing
     * @param {TRIOTestCase[]} io - Input output definitions
     * @throws {Error}
     * @return {TRTestCaseResults[]} - Test results
     */
    #run( type, name, subject, io ) {
        if ( typeof name !== 'string' || !name.length ) throw new Error( 'Test must have a valid name' );
        switch ( type ) {
        case 'function' :
            return this.#run_function( subject, io );
        case 'class' :
            return this.#run_class( subject, io );
        default :
            throw new Error( `Unknown test type: ${type}` );
        }
    }

    /**
     * Run function test
     * @private
     * @param {Function} subject - Function to test
     * @param {TRIOTestCase[]} io - Input output definitions
     * @throws Error
     * @return {TRTestCaseResults[]} - Test results
     */
    #run_function( subject, io ) {
        if ( typeof subject !== 'function' ) throw new Error( 'Argument subject must be a function' );
        const results = [];
        for ( let i = 0; i < io.length; i++ ) {
            const [ args, expected ] = io[ i ];
            try {
                results.push( [ args, expected, ...this.#io_function( subject, args, expected ) ] );
            } catch ( e ) {
                results.push( [ args, expected, e, false ] );
            }
        }
        return results;
    }

    /**
     * Run function io
     * @private
     * @param {Function} subject - Function to test
     * @param {null|Array<*>} args - Arguments
     * @param {*} expected - Expected return value
     * @throws Error
     * @return {TRIOTestResult} - True on success
     */
    #io_function( subject, args, expected ) {
        let result;
        if ( args === null ) args = [];
        if ( args instanceof Array ) {
            try {
                result = subject( ...args );
            } catch ( e ) {
                result = e;
            }
        } else {
            throw new Error( 'Argument args must be null or an Array' );
        }
        const returnType = typeof result;
        const expectedType = typeof expected;
        if ( returnType === expectedType ) {
            if ( isPojo( result ) && isPojo( expected ) ) {
                if ( JSON.stringify( result ) === JSON.stringify( expected ) ) {
                    return [ result, true ];
                }
            } else if ( result === expected ) {
                return [ result, true ];
            }
        } else if ( returnType === 'object' && expectedType === 'function' && result instanceof expected ) {
            return [ result, true ];
        }
        return [ result, false ];
    }

    /**
     * Run class test
     * @private
     * @param {Function} subject - Class constructor to test
     * @param {TRIOTestCase[]} io - Input output definitions
     * @throws Error
     * @return {TRTestCaseResults[]} - Test results
     */
    #run_class( subject, io ) {
        window.console.error( subject, io );
        throw new Error( 'Test type class not implemented' );
    }
}
