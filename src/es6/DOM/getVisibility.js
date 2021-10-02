'use strict';

/**
 * @typedef {Object} ElementVisibilityObject
 *
 * @property {number} elem - Percentage of element visible
 * @property {number} height - Vertical pixels visible
 * @property {number} view - Percentage of element visible related to view
 */

/**
 * Get element vertical visibility
 *
 * @param {HTMLElement} elem - Element to check
 * @param {null|HTMLElement} container - Scrolling container
 *
 * @return {ElementVisibilityObject} - Element visibility object
 */
export function getVisibility( elem, container = null ) {

    const pos = elem.getBoundingClientRect();
    const scrollTop = container ? container.scrollTop : document.documentElement.scrollTop;

    const top = scrollTop + pos.y;
    const height = pos.height;

    const wh = container ? container.getBoundingClientRect().height : window.innerHeight;
    const hiddenBefore = scrollTop - top;
    const hiddenAfter = top + height - ( scrollTop + wh );
    let visibleHeight = 0,
        viewVisible = 0,
        elementVisible;

    if (  scrollTop > top + height  || top > scrollTop + wh ) {
        elementVisible = 0;
    } else {
        elementVisible = 100;

        if ( hiddenBefore > 0 ) {
            elementVisible -= hiddenBefore * 100 / height;
        }

        if ( hiddenAfter > 0 ) {
            elementVisible -= hiddenAfter * 100 / height;
        }
    }

    if ( elementVisible ) {
        visibleHeight = height - ( hiddenBefore < 0 ? 0 : hiddenBefore ) - ( hiddenAfter < 0 ? 0 : hiddenAfter );
        viewVisible = visibleHeight * 100 / wh;
    }

    return {

        // Element visibility in %
        elem : elementVisible,

        // Element visible pixels
        height : visibleHeight,

        // % of view filled by element
        view : viewVisible
    };
}
