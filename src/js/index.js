/* !
 * @module      : @squirrel-forge/ui-util
 * @version     : 0.10.0
 * @license     : MIT
 * @copyright   : 2024 squirrel-forge
 * @author      : Daniel Hartwell aka. siux <me@siux.info>
 * @description : A collection of utilities, classes, functions and abstracts made for the browser and babel compatible.
 */

/**
 * Animation
 */
export { afterPaint } from './Animation/afterPaint.js';
export { cssTransition } from './Animation/cssTransition.js';
export { Easing } from './Animation/Easing.js';
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
 * Data
 */
export { LStorage } from './Data/LStorage.js';
export { saveBlobAs } from './Data/saveBlobAs.js';

/**
 * Dev
 */
export { ConsoleInterceptor } from './Dev/ConsoleInterceptor.js';
export { tabFocus } from './Dev/tabFocus.js';
export { TestRunner } from './Dev/TestRunner.js';

/**
 * DOM
 */
export { appendAfter } from './DOM/appendAfter.js';
export { appendHTML } from './DOM/appendHTML.js';
export { attributeJSON } from './DOM/attributeJSON.js';
export { getElementTagType } from './DOM/getElementTagType.js';
export { getPropertyValues } from './DOM/getPropertyValues.js';
export { prependChild } from './DOM/prependChild.js';
export { uniqid, requireUniqid } from './DOM/uniqid.js';
export { unwrap } from './DOM/unwrap.js';
export { wrap } from './DOM/wrap.js';

/**
 * Error
 */
export { Exception } from './Error/Exception.js';

/**
 * Events
 */
export { bindMultiClick } from './Events/bindMultiClick.js';
export { bindNodeList } from './Events/bindNodeList.js';
export { CallbackEvents } from './Events/CallbackEvents.js';
export { copyToClipboard, copyToClipboardFallback } from './Events/copyToClipboard.js';
export { debounce } from './Events/debounce.js';
export { docReady } from './Events/docReady.js';
export { Draggables } from './Events/Draggables.js';
export { EventDispatcher } from './Events/EventDispatcher.js';
export { hasTouch } from './Events/hasTouch.js';
export { poll } from './Events/poll.js';
export { tabFocusLock, getFocusable } from './Events/tabFocusLock.js';

/**
 * HTTP
 */
export { AsyncRequest } from './HTTP/AsyncRequest.js';
export { JsonP } from './HTTP/JsonP.js';
export { LocationManager } from './HTTP/LocationManager.js';

/**
 * Layout
 */
export { getScrollbarWidth } from './Layout/getScrollbarWidth.js';
export { getVisibility } from './Layout/getVisibility.js';

/**
 * Logic
 */
export { Config } from './Logic/Config.js';
export { Plugin } from './Logic/Plugin.js';
export { Plugins } from './Logic/Plugins.js';
export { Tracker } from './Logic/Tracker.js';

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
export { objectEmpty } from './Object/objectEmpty.js';
export { strAccess } from './Object/strAccess.js';
export { strCreate } from './Object/strCreate.js';

/**
 * String
 */
export { colorand } from './String/colorand.js';
export { escapeHTML } from './String/escapeHTML.js';
export { hex2rgb } from './String/hex2rgb.js';
export { isValidFunctionName } from './String/isValidFunctionName.js';
export { normalizePath } from './String/normalizePath.js';
export { strCamel2dash } from './String/strCamel2dash.js';
export { simpleReplace } from './String/simpleReplace.js';
export { str2node } from './String/str2node.js';
export { str2time } from './String/str2time.js';
export { strand } from './String/strand.js';
export { strSlug } from './String/strSlug.js';
export { strStyle } from './String/strStyle.js';
export { trimChar } from './String/trimChar.js';
export { ucfirst } from './String/ucfirst.js';

/**
 * Var
 */
export { cast2type } from './Var/cast2type.js';
export { isEmpty } from './Var/isEmpty.js';
