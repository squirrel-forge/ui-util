### @squirrel-forge/ui-util
> [Back to table of contents](../README.md)

# Documentation
### Javascript / DOM
> [Dev](Dev.md) <[ DOM ]> [Error](Error.md)

## Table of contents
 - [appendAfter()](#appendAfter)
 - [appendHTML()](#appendHTML)
 - [attributeJSON()](#attributeJSON)
 - [getElementTagType()](#getElementTagType)
 - [getScrollbarWidth()](#getScrollbarWidth)
 - [getVisibility()](#getVisibility)
 - [prependChild()](#prependChild)
 - [uniqid()](#uniqid)
 - [requireUniqid()](#requireUniqid)
 - [unwrap()](#unwrap)
 - [wrap()](#wrap)

---

### appendAfter
appendAfter - Append node after a specific node

#### Description
```javascript
appendAfter( newNode, referenceNode ) // void
```
Appends a node after a specified node.

#### Parameters
| Parameter         | Type | Default | Description                            |
|-------------------|------|:-------:|----------------------------------------|
| **newNode**       | Node |    -    | The node to append                     |
| **referenceNode** | Node |    -    | The node after which we want to append |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples
```javascript
appendAfter( document.getElementById( 'move-me' ), document.getElementById( 'after-this' ) );
```

---

### appendHTML
appendHTML - Append HTML string as one or multiple elements

#### Description
```javascript
appendHTML( element, str ) // void
```
Append HTML string as one or multiple elements, uses [str2node()](String.md#str2node) to convert the string.

#### Parameters
| Parameter   | Type        | Default | Description          |
|-------------|-------------|:-------:|----------------------|
| **element** | HTMLElement |    -    | Element to append to |
| **str**     | String      |    -    | The html string      |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | Node.       |

#### Examples
```javascript
appendHTML( document.getElementById( 'target' ), '<section>...</section>' );
```

---

### attributeJSON
attributeJSON - Get json object from element data attribute

#### Description
```javascript
attributeJSON( name, element, silent = true ) // Object
```
Get json object from element data attribute, can optionally throw exceptions on error.

#### Parameters
| Parameter   | Type        | Default | Description                         |
|-------------|-------------|:-------:|-------------------------------------|
| **name**    | String      |    -    | Attribute name                      |
| **element** | HTMLElement |    -    | Element to read                     |
| **silent**  | Boolean     |   true  | False to throw error on parse Error |

#### Return Values
| Type/Value | Description                |
|------------|----------------------------|
| **null**   | Invalid or empty attribute |
| **Object** | Parsed json object data    |

#### Examples
```html
<div id="json-data" data-config='{"foo":1}'></div>
```
```javascript
attributeJSON( 'data-config', document.getElementById( 'json-data' ) ); // { foo : 1 }
```

---

### getElementTagType
getElementTagType - Get element tag type string

#### Description
```javascript
getElementTagType( element ) // string
```
Get element tag type string, compiled from tagName + type.

#### Parameters
| Parameter     | Type        | Default | Description                     |
|---------------|-------------|:-------:|---------------------------------|
| **element**   | HTMLElement |    -    | Element to get type string from |

#### Return Values
| Type/Value | Description     |
|------------|-----------------|
| **String** | Tag type string |

#### Examples
```javascript
getElementTagType( document.getElementById( 'input[type="hidden"]' ) ); // input-hidden
```

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

### prependChild
prependChild - Prepend node to node

#### Description
```javascript
prepend( newNode, referenceNode ) // void
```
Prepend node as child of node, newNode is inserted before the firstChild of referenceNode.

#### Parameters
| Parameter         | Type        | Default | Description           |
|-------------------|-------------|:-------:|-----------------------|
| **newNode**       | HTMLElement |    -    | Element to prepend    |
| **referenceNode** | HTMLElement |    -    | Element to prepend to |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples
```javascript
prepend( document.getElementById( 'node-to-insert' ), document.getElementById( 'node-to-prepend-to' ) );
```

---

### uniqid
uniqid - Unique html attribute id

#### Description
```javascript
uniqid( prefix = '', entropy = false ) // string
```
Get a unique html attribute id that is unused.

#### Parameters
| Parameter   | Type    | Default | Description                     |
|-------------|---------|:-------:|---------------------------------|
| **prefix**  | String  |   ''    | Prefix the id with given string |
| **entropy** | Boolean |  false  | Increase the id entropy         |

#### Return Values
| Type/Value | Description             |
|------------|-------------------------|
| **String** | Unique unused string id |

#### Examples
```javascript
uniqid( 'prefix-' ); // 'prefix-npnm623gm2'
```

---

### requireUniqid
requireUniqid - Require unique html attribute id

#### Description
```javascript
requireUniqid( element, prefix = '', entropy = false ) // string
```
Get a unique html attribute id that is unused.

#### Parameters
| Parameter   | Type        | Default | Description                       |
|-------------|-------------|:-------:|-----------------------------------|
| **element** | HTMLElement |    -    | Element that requires a unique id |
| **prefix**  | String      |   ''    | Prefix the id with given string   |
| **entropy** | Boolean     |  false  | Increase the id entropy           |

#### Return Values
| Type/Value | Description                          |
|------------|--------------------------------------|
| **String** | Unique string id set for the element |

#### Examples
```javascript
requireUniqid( document.querySelector( '.requires-id' ), 'prefix-' ); // 'prefix-npnm623gm2'
```

---

### unwrap
unwrap - Unwrap element

#### Description
```javascript
unwrap( element ) // void
```
Removes the given element and preserves any children.

#### Parameters
| Parameter   | Type        | Default | Description               |
|-------------|-------------|:-------:|---------------------------|
| **element** | HTMLElement |    -    | Element wrapper to remove |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples
```javascript
unwrap( document.getElementById( 'element-to-unwrap' ) ); // void
```

---

### wrap
wrap - Wrap element/s

#### Description
```javascript
unwrap( elements, wrapper = 'div', strict = true ) // HTMLElement
```
Wraps given element or elements with a given element

#### Parameters
| Parameter    | Type                 | Default | Description                                 |
|--------------|----------------------|:-------:|---------------------------------------------|
| **elements** | HTMLElement/NodeList |    -    | Element/s to wrap                           |
| **wrapper**  | HTMLElement/String   |  'div'  | Element to wrap around elements             |
| **strict**   | Boolean              |  true   | Throw error if wrapper is already connected |

#### Return Values
| Type/Value      | Description                   |
|-----------------|-------------------------------|
| **HTMLElement** | The wrapper element reference |

#### Examples
```javascript
wrap( document.querySelectorAll( '.selector' ) ); // HTMLDivElement
```

---

> [Dev](Dev.md) <[ DOM ]> [Error](Error.md)
