/* !
 * @module      : @squirrel-forge/ui-util
 * @version     : 0.9.7
 * @license     : MIT
 * @copyright   : 2022 squirrel-forge
 * @author      : Daniel Hartwell aka. siux <me@siux.info>
 * @description : A collection of utilities, classes, functions and abstracts made for the browser and babel compatible.
 */

/**
 * Animation
 */
export { holdElementViewportPosition } from './Animation/holdElementViewportPosition.js';
export { scrollComplete } from './Animation/scrollComplete.js';
export { Scroller } from './Animation/Scroller.js';
export { scrollTo } from './Animation/scrollTo.js';
export { slideToggle, slideHide, slideShow } from './Animation/slide.js';

/**
 * Array
 */
export { mergeArray } from './Array/mergeArray.js';

/**
 * Dev
 */
export { ConsoleInterceptor } from './Dev/ConsoleInterceptor.js';
export { tabFocus } from './Dev/tabFocus.js';

/**
 * Error
 */
export { Exception } from './Error/Exception.js';

/**
 * Events
 */
export { bindNodeList } from './Events/bindNodeList.js';
export { debounce } from './Events/debounce.js';
export { docReady } from './Events/docReady.js';
export { EventDispatcher } from './Events/EventDispatcher.js';
export { tabFocusLock, getFocusable } from './Events/tabFocusLock.js';

/**
 * HTML
 */
export { appendAfter } from './DOM/appendAfter.js';
export { appendHTML } from './DOM/appendHTML.js';
export { attributeJSON } from './DOM/attributeJSON.js';
export { getElementTagType } from './DOM/getElementTagType.js';
export { getScrollbarWidth } from './DOM/getScrollbarWidth.js';
export { getVisibility } from './DOM/getVisibility.js';
export { prependChild } from './DOM/prependChild.js';
export { uniqid, requireUniqid } from './DOM/uniqid.js';
export { unwrap } from './DOM/unwrap.js';
export { wrap } from './DOM/wrap.js';

/**
 * HTTP
 */
export { AsyncRequest } from './HTTP/AsyncRequest.js';
export { JsonP } from './HTTP/JsonP.js';

/**
 * Logic
 */
export { Config } from './Logic/Config.js';
export { Plugin } from './Logic/Plugin.js';
export { Plugins } from './Logic/Plugins.js';

/**
 * Number
 */
export { convertBytes } from './Number/convertBytes.js';
export { gcd } from './Number/gcd.js';
export { isEven } from './Number/isEven.js';
export { isFloat } from './Number/isFloat.js';
export { leadingZeros } from './Number/leadingZeros.js';
export { rand } from './Number/rand.js';
export { Ratio } from './Number/Ratio.js';
export { round } from './Number/round.js';

/**
 * Object
 */
export { cloneObject } from './Object/cloneObject.js';
export { isPojo } from './Object/isPojo.js';
export { mergeObject } from './Object/mergeObject.js';
export { strAccess } from './Object/strAccess.js';
export { strCreate } from './Object/strCreate.js';

/**
 * String
 */
export { escapeHTML } from './String/escapeHTML.js';
export { simpleReplace } from './String/simpleReplace.js';
export { str2node } from './String/str2node.js';
export { str2time } from './String/str2time.js';
export { strand } from './String/strand.js';
export { strSlug } from './String/strSlug.js';
export { trimChar } from './String/trimChar.js';
export { ucfirst } from './String/ucfirst.js';

/**
 * Var
 */
export { cast2type } from './Var/cast2type.js';
export { isEmpty } from './Var/isEmpty.js';
