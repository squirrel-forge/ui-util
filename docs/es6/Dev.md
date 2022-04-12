### @squirrel-forge/ui-util
> [Back to table of contents](../README.md)

# Documentation
### Javascript / Dev

## Table of contents
 - [ConsoleInterceptor](#ConsoleInterceptor)
 - [tabFocus()](#tabFocus)

---

### ConsoleInterceptor
ConsoleInterceptor class - Drop-in replacement for window.console making output controllable.

#### Class overview
```javascript
class ConsoleInterceptor {
  constructor( options, debug ) {}
  console : console // Native console
  native : boolean // Log to native status
  events : boolean // Log to events status
}
```
For more details check the [ConsoleInterceptor source file](../../src/es6/Dev/ConsoleInterceptor.js).

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
