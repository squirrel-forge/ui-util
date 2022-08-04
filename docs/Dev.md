### @squirrel-forge/ui-util
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / Dev
> [Array](Array.md) <[ Dev ]> [DOM](DOM.md)

## Table of contents
 - [ConsoleInterceptor](#consoleinterceptor)
 - [tabFocus()](#tabfocus)

---

### ConsoleInterceptor
ConsoleInterceptor class - Drop-in replacement for window.console making output controllable.

#### Class overview
```javascript
class ConsoleInterceptor extends EventDispatcher {
  constructor( options, debug ) {}
  console : Console // Native console
  native : Boolean // Log to native status
  events : Boolean // Log to events status
  detach() {} // Boolean
}
```
For more details check the [ConsoleInterceptor source file](../src/es6/Dev/ConsoleInterceptor.js).

#### Events
 - **debug.{console.method}** - Fired when a given {console.method} is called, as in "debug.log" or "debug.error".

---

### tabFocus
tabFocus - Display outline on focused elements

#### Description
```javascript
tabFocus( style = '2px dashed deeppink', offset = '4px', log = true ) // Function
```
Binds a global event to highlight elements focused by keyboard control and returns a callback to unbind.

#### Parameters
| Parameter    | Type    |        Default        | Description                    |
|--------------|---------|:---------------------:|--------------------------------|
| **style**    | String  | '2px dashed deeppink' | CSS outline style              |
| **offset**   | String  |         '4px'         | CSS outline offset             |
| **log**      | Boolean |         true          | Log focused element to console |

#### Return Values
| Type/Value   | Description                 |
|--------------|-----------------------------|
| **Function** | Callback to remove tabFocus |

#### Examples
```javascript
const disableTabFocus = tabFocus(); // Enable tab focus debug
disableTabFocus(); // Disable tab focus debug
```

---

> [Array](Array.md) <[ Dev ]> [DOM](DOM.md)
