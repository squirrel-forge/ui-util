### @squirrel-forge/ui-util
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / Events
> [Error](Error.md) <[ Events ]> [HTTP](HTTP.md)

## Table of contents
 - [bindNodeList()](#bindNodeList)
 - [debounce()](#debounce)
 - [docReady()](#docReady)
 - [EventDispatcher](#EventDispatcher)

---

### bindNodeList
bindNodeList - Bind multiple events to each node

#### Description
```javascript
bindNodeList( elements, events ) // void
```
Bind multiple event listeners on each element in a NodeList or Array.

#### Parameters
| Parameter    | Type           | Default | Description                           |
|--------------|----------------|:-------:|---------------------------------------|
| **elements** | Array/NodeList |    -    | Array or NodeList of elements to bind |
| **events**   | Array          |    -    | Array of listener argument arrays     |

#### Return Values
| Type/Value | Description  |
|------------|--------------|
| **void**   | None.        |

#### Examples
```javascript
bindNodeList( document.querySelectorAll( 'a' ), [
    [ 'click', ( event ) => console.log( 'click' ) ],
    [ 'focus', ( event ) => console.log( 'focus' ) ],
    [ 'blur', ( event ) => console.log( 'blur' ) ],
] );
```

---

### debounce
debounce - Debounce event

#### Description
```javascript
debounce( func, delay = null ) // Function
```
Function wrapper to debounce event listeners on events like *window.resize*, *window.scroll* or *mouse.move* and cause them to cancel until below a given frequency.

#### Parameters
| Parameter | Type     | Default | Description           |
|-----------|----------|:-------:|-----------------------|
| **func**  | Function |    -    | Function to debounce  |
| **delay** | Number   |   350   | Frequency delay in ms |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples
```javascript
window.addEventListener( 'resize', debounce( () => console.log( 'resize::complete' ) ) );
```

---

### docReady
docReady - Document ready callback

#### Description
```javascript
docReady( callback ) // void
```
Run a given callback when the document is ready, checks *document.readyState* complete or binds a *DOMContentLoaded* listener to run the callback.

#### Parameters
| Parameter    | Type     | Default | Description                |
|--------------|----------|:-------:|----------------------------|
| **callback** | Function |    -    | Callback to run when ready |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples
```javascript
docReady( () => console.log( 'ready steady go!' ) );
```

---

### EventDispatcher
EventDispatcher class - Abstract class used for creating dom event connected or EventTarget alike objects.

#### Class overview
```javascript
class EventDispatcher {
  static isCompat( obj ) {} // Boolean
  constructor( element = null, parent = null, debug = null ) {}
  debug : null|Console
  target : null|window|document|HTMLElement|EventTarget
  parent : null|EventDispatcher
  isSimulated : Boolean
  hasSimulated( name ) {} // Boolean
  dispatchEvent( name, detail = null, bubbles = true, cancelable = false ) {} // Boolean
  addEventListener( name, callback, useCaptureOptions = false ) {} // void
  removeEventListener( name, callback, useCaptureOptions = false ) {} // void
  addEventList( events ) {} // void
}
```
For more details check the [EventDispatcher source file](../src/es6/Events/EventDispatcher.js).

#### Notes
When using the simulated mode (with *null* as target), the events are bubbled to the parent element manually unless event.stopPropagation() was called in a listener. When bubbling manually, you can use *event.detail.target* and *event.detail.current* just as *target* and *currentTarget* with normal dom events, when a valid object is bound as target then the detail properties will always be the object that triggered the event.

---

> [Error](Error.md) <[ Events ]> [HTTP](HTTP.md)
