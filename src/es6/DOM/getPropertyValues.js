/**
 * Get property value/s from context
 * @param {string|Array} values - Value name/s to get
 * @param {Body|HTMLElement} context - Property context
 * @param {boolean} assoc - Set false to return values array
 * @return {string|Object|Array<string>} - Property value/s as string, object or array
 */
export function getPropertyValues( values, context = null, assoc = true ) {
    if ( !context ) context = document.documentElement;
    const styles = window.getComputedStyle( context );
    let single = false;
    if ( !( values instanceof Array ) ) {
        values = [ values ];
        single = true;
    }
    const result = assoc ? {} : [];
    for ( let i = 0; i < values.length; i++ ) {
        const value = styles.getPropertyValue( '--' + values[ i ] );
        if ( single ) return value;
        if ( assoc ) {
            result[ values[ i ] ] = value;
        } else {
            result.push( value );
        }
    }
    return result;
}
