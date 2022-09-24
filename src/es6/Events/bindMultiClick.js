/**
 * @callback singleMultiClick
 * @param {Event} event - Click event
 * @return {void}
 */

/**
 * @callback doubleMultiClick
 * @param {Event} event - Click event
 * @return {void}
 */

/**
 * @callback multiClickBeforeDelayed
 * @param {Event} event - Click event
 * @return {void}
 */

/**
 * Bind single and double click on one element
 * @param {HTMLElement} element - Element to bind
 * @param {singleMultiClick|Function} single - Single click handler
 * @param {doubleMultiClick|Function} double - double click handler
 * @param {number} timeout - Click timeout frequency
 * @param {null|multiClickBeforeDelayed|Function} beforeDelayed - Run on every single click
 * @return {void}
 */
export function bindMultiClick( element, single, double, timeout = 350, beforeDelayed = null ) {

    // Share the timeout index
    let single_click = 0;

    // Bind the double click event
    element.addEventListener( 'dblclick', ( event ) => {

        // Clear any previous single click
        window.clearTimeout( single_click );

        // Prevent any other click handlers from running
        event.stopImmediatePropagation();
        double( event );
    } );

    // Bind the single click event
    element.addEventListener( 'click', ( event ) => {

        // Clear any previous single click
        window.clearTimeout( single_click );

        // Run the beforeDelayed event actions
        if ( beforeDelayed ) beforeDelayed( event );

        // Run the actual single click timer only if not interrupted by double click
        single_click = window.setTimeout( () => { single( event ); }, timeout );
    } );
}
