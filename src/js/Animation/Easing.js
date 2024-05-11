/**
 * Easing
 * @class
 */
export class Easing {

    /**
     * No easing, no acceleration
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static linear( t ) {
        return t;
    }

    /**
     * Slight acceleration from zero to full speed
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inSine( t ) {
        return -1 * Math.cos( t * ( Math.PI / 2 ) ) + 1;
    }

    /**
     * Slight deceleration at the end
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static outSine( t ) {
        return Math.sin( t * ( Math.PI / 2 ) );
    }

    /**
     * Slight acceleration at beginning and slight deceleration at end
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inOutSine( t ) {
        return -0.5 * ( Math.cos( Math.PI * t ) - 1 );
    }

    /**
     * Accelerating from zero velocity
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inQuad( t ) {
        return t * t;
    }

    /**
     * Decelerating to zero velocity
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static outQuad( t ) {
        return t * ( 2 - t );
    }

    /**
     * Acceleration until halfway, then deceleration
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inOutQuad( t ) {
        return t < 0.5 ? 2 * t * t : -1 + ( 4 - 2 * t ) * t;
    }

    /**
     * Accelerating from zero velocity
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inCubic( t ) {
        return t * t * t;
    }

    /**
     * Decelerating to zero velocity
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static outCubic( t ) {
        const t1 = t - 1;
        return t1 * t1 * t1 + 1;
    }

    /**
     * Acceleration until halfway, then deceleration
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inOutCubic( t ) {
        return t < 0.5 ? 4 * t * t * t : ( t - 1 ) * ( 2 * t - 2 ) * ( 2 * t - 2 ) + 1;
    }

    /**
     * Accelerating from zero velocity
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inQuart( t ) {
        return t * t * t * t;
    }

    /**
     * Decelerating to zero velocity
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static outQuart( t ) {
        const t1 = t - 1;
        return 1 - t1 * t1 * t1 * t1;
    }

    /**
     * Acceleration until halfway, then deceleration
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inOutQuart( t ) {
        const t1 = t - 1;
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * t1 * t1 * t1 * t1;
    }

    /**
     * Accelerating from zero velocity
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inQuint( t ) {
        return t * t * t * t * t;
    }

    /**
     * Decelerating to zero velocity
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static outQuint( t ) {
        const t1 = t - 1;
        return 1 + t1 * t1 * t1 * t1 * t1;
    }

    /**
     * Acceleration until halfway, then deceleration
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inOutQuint( t ) {
        const t1 = t - 1;
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * t1 * t1 * t1 * t1 * t1;
    }

    /**
     * Accelerate exponentially until finish
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inExpo( t ) {
        if ( t === 0 ) return 0;
        return Math.pow( 2, 10 * ( t - 1 ) );
    }

    /**
     * Initial exponential acceleration slowing to stop
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static outExpo( t ) {
        if ( t === 1 ) return 1;
        return -Math.pow( 2, -10 * t ) + 1;
    }

    /**
     * Exponential acceleration and deceleration
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inOutExpo( t ) {
        if ( t === 0 || t === 1 ) return t;
        const scaledTime = t * 2;
        const scaledTime1 = scaledTime - 1;
        if ( scaledTime < 1 ) {
            return 0.5 * Math.pow( 2, 10 * scaledTime1 );
        }
        return 0.5 * ( -Math.pow( 2, -10 * scaledTime1 ) + 2 );
    }

    /**
     * Increasing velocity until stop
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inCirc( t ) {
        return -1 * ( Math.sqrt( 1 - t * t ) - 1 );
    }

    /**
     * Start fast, decreasing velocity until stop
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static outCirc( t ) {
        const t1 = t - 1;
        return Math.sqrt( 1 - t1 * t1 );
    }

    /**
     * Fast increase in velocity, fast decrease in velocity
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inOutCirc( t ) {
        const scaledTime = t * 2;
        const scaledTime1 = scaledTime - 2;
        if ( scaledTime < 1 ) {
            return -0.5 * ( Math.sqrt( 1 - scaledTime * scaledTime ) - 1 );
        }
        return 0.5 * ( Math.sqrt( 1 - scaledTime1 * scaledTime1 ) + 1 );
    }

    /**
     * Slow movement backwards then fast snap to finish
     * @public
     * @static
     * @param {Number} t - Input value
     * @param {Number} magnitude - Modifier value
     * @return {Number} - Eased value
     */
    static inBack( t, magnitude = 1.70158 ) {
        return t * t * ( ( magnitude + 1 ) * t - magnitude );
    }

    /**
     * Fast snap to backwards point then slow resolve to finish
     * @public
     * @static
     * @param {Number} t - Input value
     * @param {Number} magnitude - Modifier value
     * @return {Number} - Eased value
     */
    static outBack( t, magnitude = 1.70158 ) {
        const scaledTime = t - 1;
        return scaledTime * scaledTime * ( ( magnitude + 1 ) * scaledTime + magnitude ) + 1;
    }

    /**
     * Slow movement backwards, fast snap to past finish, slow resolve to finish
     * @public
     * @static
     * @param {Number} t - Input value
     * @param {Number} magnitude - Modifier value
     * @return {Number} - Eased value
     */
    static inOutBack( t, magnitude = 1.70158 ) {
        const scaledTime = t * 2;
        const scaledTime2 = scaledTime - 2;
        const s = magnitude * 1.525;
        if ( scaledTime < 1 ) {
            return 0.5 * scaledTime * scaledTime * (
                ( s + 1 ) * scaledTime - s
            );
        }
        return 0.5 * (
            scaledTime2 * scaledTime2 * ( ( s + 1 ) * scaledTime2 + s ) + 2
        );
    }

    /**
     * Bounces slowly then quickly to finish
     * @public
     * @static
     * @param {Number} t - Input value
     * @param {Number} magnitude - Modifier value
     * @return {Number} - Eased value
     */
    static inElastic( t, magnitude = 0.7 ) {
        if ( t === 0 || t === 1 ) return t;
        const scaledTime1 = t - 1;
        const p = 1 - magnitude;
        const s = p / ( 2 * Math.PI ) * Math.asin( 1 );
        return -(
            Math.pow( 2, 10 * scaledTime1 ) *
            Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
        );
    }

    /**
     * Fast acceleration, bounces to zero
     * @public
     * @static
     * @param {Number} t - Input value
     * @param {Number} magnitude - Modifier value
     * @return {Number} - Eased value
     */
    static outElastic( t, magnitude = 0.7 ) {
        const p = 1 - magnitude;
        const scaledTime = t * 2;
        if ( t === 0 || t === 1 ) return t;
        const s = p / ( 2 * Math.PI ) * Math.asin( 1 );
        return Math.pow( 2, -10 * scaledTime ) *
            Math.sin( ( scaledTime - s ) * ( 2 * Math.PI ) / p ) + 1;
    }

    /**
     * Slow start and end, two bounces sandwich a fast motion
     * @public
     * @static
     * @param {Number} t - Input value
     * @param {Number} magnitude - Modifier value
     * @return {Number} - Eased value
     */
    static inOutElastic( t, magnitude = 0.65 ) {
        const p = 1 - magnitude;
        if ( t === 0 || t === 1 ) return t;
        const scaledTime = t * 2;
        const scaledTime1 = scaledTime - 1;
        const s = p / ( 2 * Math.PI ) * Math.asin( 1 );
        if ( scaledTime < 1 ) {
            return -0.5 * (
                Math.pow( 2, 10 * scaledTime1 ) *
                Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
            );
        }
        return Math.pow( 2, -10 * scaledTime1 ) *
            Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;
    }

    /**
     * Bounce to completion
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static outBounce( t ) {
        if ( t < 1 / 2.75 ) {
            return 7.5625 * t * t;
        } else if ( t < 2 / 2.75 ) {
            const scaledTime2 = t - 1.5 / 2.75;
            return 7.5625 * scaledTime2 * scaledTime2 + 0.75;
        } else if ( t < 2.5 / 2.75 ) {
            const scaledTime2 = t - 2.25 / 2.75;
            return 7.5625 * scaledTime2 * scaledTime2 + 0.9375;
        } else {
            const scaledTime2 = t - 2.625 / 2.75;
            return 7.5625 * scaledTime2 * scaledTime2 + 0.984375;
        }
    }

    /**
     * Bounce increasing in velocity until completion
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inBounce( t ) {
        return 1 - this.easeOutBounce( 1 - t );
    }

    /**
     * Bounce in and bounce out
     * @public
     * @static
     * @param {Number} t - Input value
     * @return {Number} - Eased value
     */
    static inOutBounce( t ) {
        if ( t < 0.5 ) return this.easeInBounce( t * 2 ) * 0.5;
        return this.easeOutBounce( t * 2 - 1 ) * 0.5 + 0.5;
    }
}
