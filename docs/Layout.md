### @squirrel-forge/ui-util
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / Layout
> [HTTP](HTTP.md) <[ Layout ]> [Logic](Logic.md)

## Table of contents
 - [getScrollbarWidth()](#getscrollbarwidth)
 - [getVisibility()](#getvisibility)

---

### getScrollbarWidth
getScrollbarWidth - Get current scrollbar width

#### Description
```javascript
getScrollbarWidth() // Number
```
Get the current device scrollbar width, creating some hidden elements and measuring the difference.

#### Parameters
The function has no parameters.

#### Return Values
| Type/Value | Description               |
|------------|---------------------------|
| **Number** | Scrollbar width in pixels |

#### Examples
```javascript
getScrollbarWidth(); // 16
```

---

### getVisibility
getVisibility - Get element vertical visibility

#### Description
```javascript
getVisibility( elem, container = null ) // Object
```
Get element vertical visibility, considering scroll position, supplies relative and absolute values.

#### Parameters
| Parameter     | Type        |     Default     | Description                        |
|---------------|-------------|:---------------:|------------------------------------|
| **elem**      | HTMLElement |        -        | Element to get visibility data for |
| **container** | HTMLElement | documentElement | Relative container                 |

#### Return Values
| Type/Value | Description                                                                    |
|------------|--------------------------------------------------------------------------------|
| **Object** | Visibility object { elem : Number %, view : Number %, height : Number pixels } |

#### Examples
```javascript
getVisibility( document.getElementById( 'section' ) ); // { elem : 27.4578567, view : 42.5678, height : 347 }
```

---

> [HTTP](HTTP.md) <[ Layout ]> [Logic](Logic.md)
